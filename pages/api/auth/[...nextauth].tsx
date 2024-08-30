import NextAuth, {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import {userRepository} from "@/src/repositories/accountRepository";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth/next";

export const authOptions: AuthOptions = {
    // @ts-ignore
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/error",
        newUser: "/auth/newuser"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        }),
        CredentialProvider({
            name: "Email",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const user = await userRepository.getAccountByEmail(credentials?.email ?? "--");
                if (user && await userRepository.checkPassword(user.email, credentials?.password ?? "")) {
                    return user as any;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            try {
                console.log("getting user by email", user.email);
                let existingUser = await userRepository.getAccountIdByEmail(user.email as string);
                console.log("existing user", existingUser)
                if (!existingUser) {
                    const newUserId = await userRepository.createAccount(
                        user.name!,
                        user.email!,
                        user.image as string | undefined
                    );
                    if (!newUserId) return false;
                    console.log("new user id", newUserId)
                    existingUser = await userRepository.getAccount(newUserId);
                    console.log("new user", existingUser)
                }

                return true;
            } catch (error) {
                console.error("Error during sign in:", error);
                return false;
            }
        },
        async session({session, token, user}) {
            // Add user id or other custom attributes to session object
            if (session.user) {
                const dbUser = await userRepository.getAccountByEmail(session.user.email!);
                if (dbUser) session.user.id = dbUser?.id;
            }
            console.log("session", session);
            return session;
        }
    }
}

export default NextAuth(authOptions);

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}

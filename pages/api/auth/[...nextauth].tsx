import NextAuth, {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {userRepository} from "@/src/repositories/userRepository";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth/next";

export const authOptions: AuthOptions = {
    // @ts-ignore
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            try {
                console.log("getting user by email", user.email);
                let existingUser = await userRepository.getUserByEmail(user.email as string);
                console.log("existing user", existingUser)
                if (!existingUser) {
                    const newUserId = await userRepository.createUser(
                        user.name!,
                        user.email!,
                        false,
                        user.image as string | undefined,
                        ""
                    );
                    console.log("new user id", newUserId)
                    existingUser = await userRepository.getUser(newUserId);
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
                const dbUser = await userRepository.getUserByEmail(session.user.email!);
                if (dbUser) session.user.id = dbUser?.id;
            }
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

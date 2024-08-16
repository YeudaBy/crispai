import {Inter} from "next/font/google";
import {signIn, signOut, useSession} from "next-auth/react"


const inter = Inter({subsets: ["latin"]});

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <h1 className="text-4xl font-bold">Welcome to CrispAI</h1>
            <p className="text-lg">The future of AI is here</p>
            <LoginButton/>

        </main>
    );
}

export function LoginButton() {
    const {data: session} = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br/>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

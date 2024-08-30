import Link from "next/link";
import {useRouter} from "next/router";

export function GoToLogin() {
    const router = useRouter()
    const ref = encodeURI(router.asPath)

    return (
        <div className={"flex flex-col gap-2 justify-center items-center"}>
            <h1 className={"text-3xl font-bold tracking-wider"}>Please Login</h1>
            <Link href={`/auth/signin?ref=${ref}`}>
                <button className={"bg-blue-mint-lighter text-blue-mint-text border-2 rounded-full p-2"}>
                    Login
                </button>
            </Link>
        </div>
    )
}

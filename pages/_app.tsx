import "@/styles/globals.css";
import "@/styles/styles.scss";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import {Layout} from "@/src/components/Layout";

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppProps) {
    return <SessionProvider session={session}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </SessionProvider>
}

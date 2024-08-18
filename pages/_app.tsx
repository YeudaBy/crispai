import "@/styles/globals.css";
import "@/styles/styles.scss";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import {Layout} from "@/src/components/layout";
import {Inter} from "next/font/google";

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin-ext"],
});

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppProps) {
    const isHome = Component.name === "Home";
    return <SessionProvider session={session}>
        <Layout font={inter} isHome={isHome}>
            <Component {...pageProps} />
        </Layout>
    </SessionProvider>
}

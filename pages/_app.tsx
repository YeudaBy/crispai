import "@/styles/globals.css";
import "@/styles/styles.scss";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import {Layout} from "@/src/components/layout";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppPropsWithLayout) {
    const isHome = Component.name === "Home";
    return <SessionProvider session={session}>
        {
            Component.getLayout ? Component.getLayout(<Component {...pageProps} />) :
                <Layout isHome={isHome}>
                    <Component {...pageProps} />
                </Layout>

        }
    </SessionProvider>
}

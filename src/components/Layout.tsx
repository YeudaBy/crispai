import React from "react";
import {Inter} from "next/font/google";
import Link from "next/link";
import {Icon} from "@/src/components/recipe";

const inter = Inter({subsets: ["latin"]});

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <main className={`min-h-screen flex flex-col justify-between ${inter.className}`}>
            <section className={'grow'}>
                {children}
            </section>
            <div className={'shadow-button m-16 p-2 text-center rounded-3xl'}>
                test
            </div>
            <BottomNavBar/>
        </main>
    );
}


export function BottomNavBar() {
    return (
        <div
            className={`sticky bottom-2 align-bottom h-fit rounded-full m-3 max-w-4xl shadow-sm mb-4 bg-wood-200 flex justify-around items-center`}>
            <Link href={"/author/me"}>
                <div
                    role={"button"}
                    className={`text-wood-400 shadow-test flex rounded-full border-wood-100 font-bold
                     px-6 border-2 items-center justify-center text-sm gap-2 p-2 m-2 bg-white`}>
                    Me
                    <Icon/>
                </div>
            </Link>

            <Link href={"/explore"}>
                <div
                    role={"button"}
                    className={`text-wood-400 shadow-test flex rounded-full border-wood-100 font-bold
                     px-6 border-2 items-center justify-center text-sm gap-2 p-2 m-2 bg-white`}>
                    Explore
                    <Icon/>
                </div>
            </Link>

            <Link href={"/"}>
                <div
                    role={"button"}
                    className={`text-wood-400 shadow-test flex rounded-full border-wood-100 font-bold
                    px-6 border-2 items-center justify-center text-sm gap-2 p-2 m-2 bg-white`}>
                    Home
                    <Icon/>
                </div>
            </Link>

        </div>
    )
}


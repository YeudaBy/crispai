import React from "react";
import {NextFont} from "next/dist/compiled/@next/font";
import Image from "next/image";
import Link from "next/link";
import {Inter} from "next/font/google";

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin-ext"],
});


export function Layout({children, isHome, bnb = <BottomNavBar/>}: {
    children: React.ReactNode,
    isHome: boolean,
    bnb?: React.ReactNode
}) {
    return (
        <main className={`min-h-screen flex flex-col justify-between ${inter.className}`}>
            <section className={'grow'}>
                {isHome ? <div className={"bg-brown-lighter/50"}>
                        <div className={"flex justify-between px-3 w-full"}>
                            <Image src={"/settings-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                                   className={"hover:rotate-180 filter-brown-dark cursor-pointer transform transition-all duration-300"}/>
                            <Link href={"/"}>
                                <Image src={"/crispai.svg"} width={200} height={200} alt={"Crispai Logo"}
                                       className={"mx-auto"}/>
                            </Link>
                            <Image src={"/hamburger-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                                   className={"cursor-pointer filter-brown-dark hover:scale-110 transform transition-all duration-300"}/>
                        </div>
                        <div className={"bg-white w-full h-4 rounded-t-3xl"}></div>
                    </div>
                    : <div className={"flex justify-between px-3 sticky top-0 z-30 bg-white"}>
                        <Image src={"/settings-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                               className={"hover:rotate-180 filter-brown-dark cursor-pointer transform transition-all duration-300"}/>
                        <Link href={"/"}>
                            <Image src={"/crispai.svg"} width={100} height={100} alt={"Crispai Logo"}
                                   className={"mx-auto"}/>
                        </Link>
                        <Image src={"/hamburger-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                               className={"cursor-pointer filter-brown-dark hover:scale-110 transform transition-all duration-300"}/>
                    </div>
                }
                {children}
            </section>
            {bnb}
        </main>
    );
}


export function BottomNavBar() {
    return (
        <div className={"fixed w-screen bottom-4 align-bottom h-fit max-w-4xl mb-4 px-2"}>
            <div
                className={`rounded-full gap-16 text-brown-text shadow-sm shadow-brown-text flex justify-between items-center bg-brown-lighter p-2`}>

                <div
                    className={'flex p-2 shadow-sm text-sm tracking-wide font-light shadow-brown-text bg-white rounded-full w-full flex-col items-center'}>
                    profile
                </div>

                <div
                    className={"absolute right-0 left-0 mx-auto -top-2/4 bg-brown-lighter rounded-full h-16 w-16 flex justify-center items-center"}>
                    <Link href={"/recipe/add"}>
                        <div
                            className={"bg-white shadow-sm shadow-brown-text rounded-full h-12 w-12 flex justify-center items-center"}>
                            +
                        </div>
                    </Link>
                </div>

                <Link href={"/author/me"} className={"w-full"}>
                    <div
                        className={'flex p-2 shadow-sm text-sm tracking-wide font-light shadow-brown-text bg-white rounded-full w-full flex-col items-center'}>
                        profile
                    </div>
                </Link>
            </div>
        </div>
    )
}


import React from "react";
import {NextFont} from "next/dist/compiled/@next/font";
import Image from "next/image";
import Link from "next/link";


export function Layout({children, font, isHome}: {
    children: React.ReactNode,
    font: NextFont,
    isHome: boolean
}) {
    return (
        <main className={`min-h-screen flex flex-col justify-between ${font.className}`}>
            <section className={'grow'}>
                {isHome ? <div className={"flex justify-between px-3"}>
                        <Image src={"/settings-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                               className={"hover:rotate-180 cursor-pointer transform transition-all duration-300"}/>
                        <Link href={"/"}>
                            <Image src={"/crispai.svg"} width={200} height={200} alt={"Crispai Logo"}
                                   className={"mx-auto"}/>
                        </Link>
                        <Image src={"/hamburger-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                               className={"cursor-pointer hover:scale-110 transform transition-all duration-300"}/>
                    </div>
                    : <div className={"flex justify-between px-3 sticky top-0 z-30 bg-white"}>
                        <Image src={"/settings-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                               className={"hover:rotate-180 cursor-pointer transform transition-all duration-300"}/>
                        <Link href={"/"}>
                            <Image src={"/crispai.svg"} width={100} height={100} alt={"Crispai Logo"}
                                   className={"mx-auto"}/>
                        </Link>
                        <Image src={"/hamburger-icon.svg"} width={40} height={40} alt={"Settings Icon"}
                               className={"cursor-pointer hover:scale-110 transform transition-all duration-300"}/>
                    </div>
                }
                {children}
            </section>
            <BottomNavBar/>
        </main>
    );
}


export function BottomNavBar() {
    return (
        <div
            className={`sticky bottom-4 align-bottom h-fit rounded-full m-3 max-w-4xl gap-16 text-neutral-500
            shadow-lg shadow-neutral-500 mb-4 flex justify-between items-center bg-neutral-200 p-2`}>

            <div
                className={'flex p-1 shadow-sm text-sm tracking-wide font-light shadow-neutral-500 bg-white rounded-full w-full flex-col items-center'}>
                profile
            </div>

            <div
                className={"absolute right-0 left-0 mx-auto -top-2/4 bg-neutral-200 rounded-full h-14 w-14 flex justify-center items-center"}>
                <Link href={"/recipe/add"}>
                    <div
                        className={"bg-white shadow-sm shadow-neutral-500 rounded-full h-10 w-10 flex justify-center items-center"}>
                        +
                    </div>
                </Link>
            </div>

            <Link href={"/author/me"} className={"w-full"}>
                <div
                    className={'flex p-1 bg-white shadow-sm text-sm tracking-wide font-light shadow-neutral-500 rounded-full w-full flex-col items-center'}>
                    profile
                </div>
            </Link>
        </div>
    )
}


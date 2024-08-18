import React from "react";
import {NextFont} from "next/dist/compiled/@next/font";


export function Layout({children, font}: {
    children: React.ReactNode,
    font: NextFont;
}) {
    return (
        <main className={`min-h-screen flex flex-col justify-between ${font.className}`}>
            <section className={'grow'}>
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
                <div
                    className={"bg-white shadow-sm shadow-neutral-500 rounded-full h-10 w-10 flex justify-center items-center"}>
                    +
                </div>
            </div>

            <div
                className={'flex p-1 bg-white shadow-sm text-sm tracking-wide font-light shadow-neutral-500 rounded-full w-full flex-col items-center'}>
                profile
            </div>
        </div>
    )
}


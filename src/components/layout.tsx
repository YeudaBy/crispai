import React, {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {Inter} from "next/font/google";
import {useRouter} from "next/router";

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

const items = [
    {
        icon: "/home-icon.svg",
        link: "/"
    },
    {
        icon: "/search-icon.svg",
        link: "/search"
    },
    {
        icon: "/add-icon.svg",
        link: "/recipe/add"
    },
    {
        icon: "/profile-icon.svg",
        link: "/author/me"
    },
    {
        icon: "/settings-icon.svg",
        link: "/settings"
    }
]

export function BottomNavBar() {

    const [active, setActive] = React.useState(0)
    const router = useRouter()

    useEffect(() => {
        const path = router.pathname
        const index = items.findIndex((item) => item.link === path)
        setActive(index)
    }, [router.pathname]);

    function Icon() {
        return (
            <div
                className={"w-6 h-6 rounded-full border-2 border-blue-mint-dark p-2 m-2"}></div>
        )
    }

    return (
        <div className={"fixed w-screen bottom-0 align-bottom h-fit max-w-4xl"}>
            <div
                className={"flex justify-between bg-gradient-to-r from-blue-mint-lighter to-blue-mint-light hover:bg-gradient-to-tr"}>
                {items.map((item, index) => (
                    <Link key={index} href={item.link}>
                        <div
                            className={`relative flex items-center justify-center p-2 ${active === index ? "text-blue-400 bnb-active-item" : "text-blue-200"}`}>
                            <Icon/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}


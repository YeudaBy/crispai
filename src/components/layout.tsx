import React, {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {Inter} from "next/font/google";
import {useRouter} from "next/router";
import {
    RemixiconComponentType,
    RiHomeFill,
    RiHomeLine,
    RiSearchFill,
    RiSearchLine,
    RiSettingsFill,
    RiSettingsLine,
    RiStickyNoteAddFill,
    RiStickyNoteAddLine,
    RiUserFill,
    RiUserLine
} from "@remixicon/react";

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
            <div className={"h-16"}/>
            {bnb}
        </main>
    );
}

const items: {
    Icon: RemixiconComponentType,
    ActiveIcon: RemixiconComponentType,
    link: string
}[] = [
    {
        Icon: RiHomeLine,
        ActiveIcon: RiHomeFill,
        link: "/"
    },
    {
        Icon: RiSearchLine,
        ActiveIcon: RiSearchFill,
        link: "/search"
    },
    {
        Icon: RiStickyNoteAddLine,
        ActiveIcon: RiStickyNoteAddFill,
        link: "/recipe/add"
    },
    {
        Icon: RiUserLine,
        ActiveIcon: RiUserFill,
        link: "/author/me"
    },
    {
        Icon: RiSettingsLine,
        ActiveIcon: RiSettingsFill,
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

    return (
        <div className={"fixed w-screen bottom-0 align-bottom h-15 max-w-4xl"}>
            <div
                className={"flex justify-around bg-brown-lighter"}>
                {items.map((item, index) => (
                    <Link key={index} href={item.link}>
                        <div className={`relative flex items-center justify-center p-4`}>
                            {
                                active === index ? <item.ActiveIcon size={24} color={"brown"}/>
                                    : <item.Icon size={24} color={"brown"}/>
                            }
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}


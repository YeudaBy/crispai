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
import { cn } from "@/src/utils/cn";

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
        <main className={cn("min-h-screen flex flex-col justify-between bg-neutral-50", inter.className)}>
            <section className={'grow'}>
                {isHome ? (
                    <div className="bg-gradient-to-b from-brown-100/60 to-blue-mint-100/40 pb-4">
                        <div className="flex justify-between items-center px-4 py-3 w-full">
                            <button className="p-2 rounded-xl hover:bg-white/50 transition-all duration-300 ease-smooth group">
                                <Image 
                                    src={"/settings-icon.svg"} 
                                    width={24} 
                                    height={24} 
                                    alt={"Settings Icon"}
                                    className="group-hover:rotate-180 transition-transform duration-300 ease-smooth"
                                />
                            </button>
                            
                            <Link href={"/"} className="transition-transform hover:scale-105 duration-200">
                                <Image 
                                    src={"/crispai.svg"} 
                                    width={160} 
                                    height={160} 
                                    alt={"Crispai Logo"}
                                    className="mx-auto"
                                />
                            </Link>
                            
                            <button className="p-2 rounded-xl hover:bg-white/50 transition-all duration-300 ease-smooth group">
                                <Image 
                                    src={"/hamburger-icon.svg"} 
                                    width={24} 
                                    height={24} 
                                    alt={"Menu Icon"}
                                    className="group-hover:scale-110 transition-transform duration-200"
                                />
                            </button>
                        </div>
                        <div className="bg-white w-full h-6 rounded-t-3xl shadow-soft"></div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center px-4 py-3 sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200/50 shadow-soft">
                        <button className="p-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 group">
                            <Image 
                                src={"/settings-icon.svg"} 
                                width={20} 
                                height={20} 
                                alt={"Settings Icon"}
                                className="group-hover:rotate-180 transition-transform duration-300"
                            />
                        </button>
                        
                        <Link href={"/"} className="transition-transform hover:scale-105 duration-200">
                            <Image 
                                src={"/crispai.svg"} 
                                width={80} 
                                height={80} 
                                alt={"Crispai Logo"}
                                className="mx-auto"
                            />
                        </Link>
                        
                        <button className="p-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 group">
                            <Image 
                                src={"/hamburger-icon.svg"} 
                                width={20} 
                                height={20} 
                                alt={"Menu Icon"}
                                className="group-hover:scale-110 transition-transform duration-200"
                            />
                        </button>
                    </div>
                )}
                
                <div className={cn(
                    "flex-1",
                    isHome ? "bg-white" : "bg-neutral-50 min-h-[calc(100vh-140px)]"
                )}>
                    {children}
                </div>
            </section>
            
            <div className="h-16"/>
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
        <div className="fixed bottom-0 left-0 right-0 z-40 max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-lg border-t border-neutral-200/50 shadow-elevation-3 rounded-t-2xl mx-4 mb-2">
                <div className="flex justify-around items-center py-2">
                    {items.map((item, index) => {
                        const isActive = active === index;
                        const IconComponent = isActive ? item.ActiveIcon : item.Icon;
                        
                        return (
                            <Link key={index} href={item.link}>
                                <div className={cn(
                                    "relative flex items-center justify-center p-3 rounded-xl transition-all duration-200 ease-smooth",
                                    isActive 
                                        ? "bg-brown-100 scale-110" 
                                        : "hover:bg-neutral-100 hover:scale-105 active:scale-95"
                                )}>
                                    <IconComponent 
                                        size={24} 
                                        className={cn(
                                            "transition-colors duration-200",
                                            isActive 
                                                ? "text-brown-600" 
                                                : "text-neutral-600 hover:text-brown-500"
                                        )}
                                    />
                                    
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brown-500 rounded-full animate-scale-in" />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}


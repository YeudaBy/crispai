import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
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
    RiUserLine,
    RiMenuLine,
    RiNotificationLine,
    RiNotificationFill,
    RiHeartLine,
    RiHeartFill
} from "@remixicon/react";
import { cn } from "@/src/lib/utils";
import { Button } from "./ui/Button";

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin-ext"],
});

interface LayoutProps {
    children: React.ReactNode;
    isHome: boolean;
    bnb?: React.ReactNode;
    showSearch?: boolean;
}

export function Layout({ 
    children, 
    isHome, 
    bnb = <BottomNavBar />, 
    showSearch = false 
}: LayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className={cn("min-h-screen flex flex-col justify-between bg-neutral-50", inter.className)}>
            <section className="grow">
                {isHome ? (
                    <HomeHeader showNotifications={showNotifications} setShowNotifications={setShowNotifications} />
                ) : (
                    <PageHeader 
                        isScrolled={isScrolled} 
                        showNotifications={showNotifications} 
                        setShowNotifications={setShowNotifications} 
                    />
                )}
                
                <div className={cn(
                    "flex-1 transition-all duration-300",
                    isHome ? "bg-white" : "bg-neutral-50 min-h-[calc(100vh-140px)]"
                )}>
                    {children}
                </div>
            </section>
            
            <div className="h-20" />
            {bnb}
        </main>
    );
}

// Home Header Component
function HomeHeader({ showNotifications, setShowNotifications }: {
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
}) {
    return (
        <div className="bg-gradient-to-br from-brown-100/60 via-blue-mint-100/40 to-accent-cream/30 pb-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 bg-brown-400 rounded-full blur-xl" />
                <div className="absolute top-32 right-20 w-16 h-16 bg-blue-mint-400 rounded-full blur-lg" />
                <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-accent-orange rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-center px-6 py-4 w-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-brown-700 border border-white/30"
                    >
                        <RiSettingsLine size={20} />
                    </Button>
                    
                    <Link href="/" className="transition-transform hover:scale-105 duration-300 group">
                        <div className="relative">
                            <Image 
                                src="/crispai.svg" 
                                width={180} 
                                height={180} 
                                alt="Crispai Logo"
                                className="mx-auto group-hover:drop-shadow-lg transition-all duration-300"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                        </div>
                    </Link>
                    
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "backdrop-blur-sm border border-white/30 transition-all duration-300",
                                showNotifications 
                                    ? "bg-brown-500 text-white" 
                                    : "bg-white/20 hover:bg-white/30 text-brown-700"
                            )}
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            {showNotifications ? <RiNotificationFill size={20} /> : <RiNotificationLine size={20} />}
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-brown-700 border border-white/30"
                        >
                            <RiMenuLine size={20} />
                        </Button>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="px-6 py-2 text-center">
                    <h1 className="text-h2 font-bold text-brown-900 mb-1">
                        ברוכים הבאים לעולם הטעמים
                    </h1>
                    <p className="text-body text-brown-700/80">
                        גלו מתכונים חדשים ושתפו את הקסם שלכם
                    </p>
                </div>

                {/* Curved Bottom */}
                <div className="bg-white w-full h-8 rounded-t-[2rem] shadow-elevation-2 mt-6" />
            </div>
        </div>
    );
}

// Page Header Component  
function PageHeader({ isScrolled, showNotifications, setShowNotifications }: {
    isScrolled: boolean;
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
}) {
    return (
        <div className={cn(
            "sticky top-0 z-40 transition-all duration-300",
            isScrolled 
                ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-elevation-2" 
                : "bg-white/80 backdrop-blur-sm"
        )}>
            <div className="flex justify-between items-center px-6 py-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-neutral-100 text-neutral-700"
                >
                    <RiSettingsLine size={20} />
                </Button>
                
                <Link href="/" className="transition-transform hover:scale-105 duration-200">
                    <Image 
                        src="/crispai.svg" 
                        width={90} 
                        height={90} 
                        alt="Crispai Logo"
                        className="mx-auto"
                    />
                </Link>
                
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "transition-all duration-200",
                            showNotifications 
                                ? "bg-brown-100 text-brown-600" 
                                : "hover:bg-neutral-100 text-neutral-700"
                        )}
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        {showNotifications ? <RiNotificationFill size={20} /> : <RiNotificationLine size={20} />}
                    </Button>
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-neutral-100 text-neutral-700"
                    >
                        <RiMenuLine size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Enhanced Navigation Items
const navigationItems: {
    Icon: RemixiconComponentType;
    ActiveIcon: RemixiconComponentType;
    link: string;
    label: string;
    badge?: number;
}[] = [
    {
        Icon: RiHomeLine,
        ActiveIcon: RiHomeFill,
        link: "/",
        label: "בית"
    },
    {
        Icon: RiSearchLine,
        ActiveIcon: RiSearchFill,
        link: "/search",
        label: "חיפוש"
    },
    {
        Icon: RiStickyNoteAddLine,
        ActiveIcon: RiStickyNoteAddFill,
        link: "/recipe/add",
        label: "הוסף מתכון"
    },
    {
        Icon: RiHeartLine,
        ActiveIcon: RiHeartFill,
        link: "/favorites",
        label: "מועדפים",
        badge: 3
    },
    {
        Icon: RiUserLine,
        ActiveIcon: RiUserFill,
        link: "/author/me",
        label: "פרופיל"
    }
];

export function BottomNavBar() {
    const [active, setActive] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const path = router.pathname;
        const index = navigationItems.findIndex((item) => item.link === path);
        setActive(index !== -1 ? index : 0);
    }, [router.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 max-w-4xl mx-auto transition-transform duration-300",
            isVisible ? "translate-y-0" : "translate-y-full"
        )}>
            <div className="bg-white/95 backdrop-blur-xl border-t border-neutral-200/50 shadow-elevation-4 rounded-t-3xl mx-4 mb-safe">
                {/* Active Tab Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brown-400 to-blue-mint-300 rounded-t-3xl" />
                
                <div className="flex justify-around items-center py-3 px-2">
                    {navigationItems.map((item, index) => {
                        const isActive = active === index;
                        const IconComponent = isActive ? item.ActiveIcon : item.Icon;
                        
                        return (
                            <Link key={index} href={item.link} className="flex-1">
                                <div className={cn(
                                    "relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group",
                                    isActive 
                                        ? "bg-gradient-to-br from-brown-100 to-blue-mint-50 scale-105 shadow-elevation-1" 
                                        : "hover:bg-neutral-50 hover:scale-105 active:scale-95"
                                )}>
                                    {/* Icon Container */}
                                    <div className="relative">
                                        <IconComponent 
                                            size={22} 
                                            className={cn(
                                                "transition-all duration-300",
                                                isActive 
                                                    ? "text-brown-600 drop-shadow-sm" 
                                                    : "text-neutral-600 group-hover:text-brown-500"
                                            )}
                                        />
                                        
                                        {/* Badge */}
                                        {item.badge && item.badge > 0 && (
                                            <div className="absolute -top-1 -right-1 bg-error-500 text-white text-caption font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-elevation-2 animate-pulse">
                                                {item.badge > 9 ? '9+' : item.badge}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Label */}
                                    <span className={cn(
                                        "text-caption font-medium mt-1 transition-all duration-300",
                                        isActive 
                                            ? "text-brown-700 opacity-100" 
                                            : "text-neutral-500 opacity-0 group-hover:opacity-100"
                                    )}>
                                        {item.label}
                                    </span>
                                    
                                    {/* Active Dot */}
                                    {isActive && (
                                        <div className="absolute -bottom-1 w-1 h-1 bg-brown-500 rounded-full animate-scale-in" />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


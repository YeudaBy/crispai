import React from "react";
import {Icon} from "@/src/components/recipe";

export function Dialog({children, open, onClose, title, className, ...props}: {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    [key: string]: any
}) {
    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ${open ? "" : "hidden"}`}
            onClick={onClose}>
            <div className={`bg-white p-4 ${className}`} onClick={(e) => e.stopPropagation()} {...props}>
                <div className={"flex justify-between items-center gap-6"}>
                    <h1 className={"font-bold"}>{title}</h1>
                    <Icon/>
                </div>
                {children}
            </div>
        </div>
    )
}

import React from "react";
import {RemixiconComponentType} from "@remixicon/react";

export function ImageWithFallback({src, alt, className, Fallback}: {
    src?: string;
    alt?: string;
    className?: string;
    Fallback: RemixiconComponentType;
}) {
    const [showFallback, setShowFallback] = React.useState(true);
    return (
        <div>
            {showFallback && <Fallback className={`scale-50 opacity-35 ${className}`}/>}
            <img
                src={src}
                alt={alt}
                className={`${className} ${showFallback ? 'hidden' : ''}`}
                onLoad={() => {
                    setShowFallback(false)
                }}
                onError={(e) => {
                    setShowFallback(true)
                }}
            />
        </div>
    )
}

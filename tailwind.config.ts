import type {Config} from "tailwindcss";
import {withUt} from "uploadthing/tw";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "brown-lighter": "#F3E6D5",
                "brown-light": "#E5C5AF",
                "brown": "#F5AE84",
                "brown-dark": "#C18564",
                "brown-text": "#3D291E",

                "blue-mint-lighter": "#DEE5E1",
                "blue-mint-light": "#BADDD0",
                "blue-mint": "#8DB8AE",
                "blue-mint-dark": "#80998A",
                "blue-mint-text": "#28302B",
            },
            boxShadow: {
                'inner-xs-wood': 'inset 1px 1px 2px 1px var(--color-wood-50)',
                test: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
                button: 'rgba(0, 0, 0, 0.17) 0px -2px 6px 0px inset, rgba(0, 0, 0, 0.15) 0px -12px 20px 0px inset, rgba(0, 0, 0, 0.1) 0px -22px 23px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 1px 3px, rgba(0, 0, 0, 0.09) 0px 3px 4px'
            },
            borderRadius: {
                /* top-left | top-right | bottom-right | bottom-left */
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
                '7xl': '3.5rem',
                '8xl': '4rem',
                '9xl': '4.5rem',
                '10xl': '5rem',
                'tr-bl-xl': '0 .5rem 0 .5rem',
                'tr-bl-2xl': '0 1rem 0 1rem',
                'tr-bl-3xl': '0 1.5rem 0 1.5rem',
                'tr-bl-4xl': '0 2rem 0 2rem',
                'tr-bl-5xl': '0 2.5rem 0 2.5rem',
                'tr-bl-6xl': '0 3rem 0 3rem',
                'tr-bl-7xl': '0 3.5rem 0 3.5rem',
                'tr-bl-8xl': '0 4rem 0 4rem',
                'tr-bl-9xl': '0 4.5rem 0 4.5rem',
                'tr-bl-10xl': '0 5rem 0 5rem',

                'tl-br-xl': '.5rem 0 0 .5rem',
                'tl-br-2xl': '1rem 0 1rem 0',
                'tl-br-3xl': '1.5rem 0 1.5rem 0',
                'tl-br-4xl': '2rem 0 2rem 0',
                'tl-br-5xl': '2.5rem 0 2.5rem 0',
                'tl-br-6xl': '3rem 0 3rem 0',
                'tl-br-7xl': '3.5rem 0 3.5rem 0',
                'tl-br-8xl': '4rem 0 4rem 0',
                'tl-br-9xl': '4.5rem 0 4.5rem 0',
                'tl-br-10xl': '5rem 0 5rem 0',
            },
        },
    },
    plugins: [],
};
export default withUt(config);

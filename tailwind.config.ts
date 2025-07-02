import type {Config} from "tailwindcss";
import {withUt} from "uploadthing/tw";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Primary Brand Colors (Enhanced)
                "brown": {
                    50: "#FDF7F0",
                    100: "#F3E6D5",
                    200: "#E5C5AF", 
                    300: "#D4A574",
                    400: "#F5AE84", // Main brand color
                    500: "#C18564",
                    600: "#A06B47",
                    700: "#7D5235",
                    800: "#5A3A26",
                    900: "#3D291E", // Text color
                    950: "#2A1C14"
                },

                "blue-mint": {
                    50: "#F0F7F4",
                    100: "#DEE5E1",
                    200: "#BADDD0",
                    300: "#8DB8AE", // Main brand color
                    400: "#6BA394",
                    500: "#80998A",
                    600: "#5D7A6A",
                    700: "#4A6154",
                    800: "#384B41",
                    900: "#28302B", // Text color
                    950: "#1A201D"
                },

                // Semantic Colors
                "success": {
                    50: "#F0FDF4",
                    100: "#DCFCE7",
                    500: "#22C55E",
                    600: "#16A34A",
                    700: "#15803D"
                },

                "warning": {
                    50: "#FFFBEB",
                    100: "#FEF3C7",
                    500: "#F59E0B",
                    600: "#D97706",
                    700: "#B45309"
                },

                "error": {
                    50: "#FEF2F2",
                    100: "#FEE2E2",
                    500: "#EF4444",
                    600: "#DC2626",
                    700: "#B91C1C"
                },

                "info": {
                    50: "#EFF6FF",
                    100: "#DBEAFE",
                    500: "#3B82F6",
                    600: "#2563EB",
                    700: "#1D4ED8"
                },

                // Accent Colors
                "accent": {
                    "orange": "#FF6B35",
                    "coral": "#FF8B94",
                    "sage": "#9CAF88",
                    "cream": "#FFF8E7",
                    "terracotta": "#E07A5F"
                },

                // Neutral Colors
                "neutral": {
                    0: "#FFFFFF",
                    50: "#FAFAFA",
                    100: "#F5F5F5",
                    200: "#E5E5E5",
                    300: "#D4D4D4",
                    400: "#A3A3A3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                    950: "#0A0A0A"
                },

                // Legacy colors for backward compatibility
                "brown-lighter": "#F3E6D5",
                "brown-light": "#E5C5AF",
                "brown-dark": "#C18564",
                "brown-text": "#3D291E",
                "blue-mint-lighter": "#DEE5E1",
                "blue-mint-light": "#BADDD0",
                "blue-mint-dark": "#80998A",
                "blue-mint-text": "#28302B",
            },

            fontSize: {
                // Display Text
                'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 72px
                'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 60px
                'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 48px
                'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // 36px
                'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }], // 30px

                // Headings
                'h1': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }], // 32px
                'h2': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }], // 24px
                'h3': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }], // 20px
                'h4': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0' }], // 18px
                'h5': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }], // 16px
                'h6': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }], // 14px

                // Body Text
                'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0' }], // 20px
                'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }], // 18px
                'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }], // 16px
                'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }], // 14px
                'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }], // 12px

                // Labels & UI
                'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
                'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
                'label-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }], // 11px

                // Caption
                'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
                'caption-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
            },

            fontWeight: {
                'thin': '100',
                'extralight': '200',
                'light': '300',
                'normal': '400',
                'medium': '500',
                'semibold': '600',
                'bold': '700',
                'extrabold': '800',
                'black': '900',
            },

            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
                '144': '36rem',
            },

            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                'DEFAULT': '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
                '7xl': '3.5rem',
                '8xl': '4rem',
                '9xl': '4.5rem',
                '10xl': '5rem',
                'full': '9999px',
                
                // Custom corner combinations
                'tr-bl-xl': '0 .75rem 0 .75rem',
                'tr-bl-2xl': '0 1rem 0 1rem',
                'tr-bl-3xl': '0 1.5rem 0 1.5rem',
                'tr-bl-4xl': '0 2rem 0 2rem',
                'tr-bl-5xl': '0 2.5rem 0 2.5rem',
                'tr-bl-6xl': '0 3rem 0 3rem',
                'tr-bl-7xl': '0 3.5rem 0 3.5rem',
                'tr-bl-8xl': '0 4rem 0 4rem',
                'tr-bl-9xl': '0 4.5rem 0 4.5rem',
                'tr-bl-10xl': '0 5rem 0 5rem',

                'tl-br-xl': '.75rem 0 .75rem 0',
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

            boxShadow: {
                // Existing shadows
                'inner-xs-wood': 'inset 1px 1px 2px 1px var(--color-wood-50)',
                'test': 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
                'button': 'rgba(0, 0, 0, 0.17) 0px -2px 6px 0px inset, rgba(0, 0, 0, 0.15) 0px -12px 20px 0px inset, rgba(0, 0, 0, 0.1) 0px -22px 23px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 1px 3px, rgba(0, 0, 0, 0.09) 0px 3px 4px',
                
                // New elevation system
                'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
                'elevation-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
                'elevation-5': '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
                
                // Colored shadows
                'glow-brown': '0 0 20px rgba(245, 174, 132, 0.3)',
                'glow-mint': '0 0 20px rgba(141, 184, 174, 0.3)',
                'glow-accent': '0 0 20px rgba(255, 107, 53, 0.3)',
                
                // Soft shadows
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },

            animation: {
                // Existing
                'spin': 'spin 1s linear infinite',
                'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce': 'bounce 1s infinite',
                
                // New smooth animations
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'fade-out': 'fadeOut 0.3s ease-in-out',
                'slide-in-up': 'slideInUp 0.3s ease-out',
                'slide-in-down': 'slideInDown 0.3s ease-out',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'slide-out-right': 'slideOutRight 0.3s ease-in',
                'scale-in': 'scaleIn 0.2s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                
                // Recipe card animations
                'recipe-hover': 'recipeHover 0.3s ease-out',
                'recipe-like': 'recipeLike 0.6s ease-out',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                slideInUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideOutRight: {
                    '0%': { transform: 'translateX(0)', opacity: '1' },
                    '100%': { transform: 'translateX(100%)', opacity: '0' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                recipeHover: {
                    '0%': { transform: 'scale(1) translateY(0)' },
                    '100%': { transform: 'scale(1.02) translateY(-4px)' },
                },
                recipeLike: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.3)' },
                    '100%': { transform: 'scale(1)' },
                },
            },

            backdropBlur: {
                'xs': '2px',
            },

            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
};
export default withUt(config);

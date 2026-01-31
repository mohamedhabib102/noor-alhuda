"use client";

import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    if (!mounted) {
        return null; 
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-main text-white transition-colors duration-200 focus:outline-none  cursor-pointer"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? <IoSunny size={20} /> : <IoMoon size={20} />}
        </button>
    );
};

export default DarkModeToggle;

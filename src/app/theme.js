"use client";
import React, { useEffect, useState } from "react";

function getTheme() {
    let theme = localStorage.getItem("theme");
    if(theme) {
        return theme;
    }
    return "Dark Theme";
}

export default function Theme() {
    const [theme, setTheme] = useState(()=>getTheme());

    useEffect(() => {
        document.querySelector("body").setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, []);

    const toggleTheme = () => {
        let color = "Dark Theme";
        if(theme === "Dark Theme") {
            color = "Light Theme";
        }
        setTheme(color);
        localStorage.setItem("theme", color);
        document.querySelector("body").setAttribute("data-theme", color);
    }

    return(
        <div>
            <button className="themeButton" onClick={()=>toggleTheme()}>{theme}</button>
        </div>
    )
}

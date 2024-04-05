"use client"

import { useContext } from "react";
import { LayoutContext } from "@/app/doc/layout";

import ThemeSwap from "./themeSwap";

export default function Navbar() {
    const { setSearch, pageName, pathname } = useContext(LayoutContext)

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearch(e.target.value)
        }
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-lg w-full flex justify-between items-center">
                <div className="flex-none">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div>

                <div className="flex-1 hidden sm:block">
                    <a href={pathname} className="btn btn-ghost text-xl">{pageName}</a>
                </div>

                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input id="searchbox" type="text" placeholder="Search..." className="input input-bordered w-full md:w-auto" onKeyDown={handleKeyDown} />
                    </div>

                    <div className="flex align-center">
                        <ThemeSwap />
                    </div>

                </div>
            </div>
        </>
    )
}
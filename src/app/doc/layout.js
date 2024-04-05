"use client"

import { createContext, useState } from "react"
import { usePathname } from "next/navigation"

import Navbar from "@/components/navbar"
import Drawer from "@/components/drawer"

export const LayoutContext = createContext()

export default function Layout({ children }) {
    const [search, setSearch] = useState("")
    let pathname = usePathname()

    let pageName = pathname.split("/")[2]
    switch (pageName) {
        case "video_doc":
            pageName = "Video Document Management"
            pathname = "/doc/video_doc"
            break
        case "drug_doc":
            pageName = "Drug Document Management"
            pathname = "/doc/drug_doc"
            break
    }

    return (
        <>
            <LayoutContext.Provider value={{ search, setSearch, pageName, pathname }}>
                <Drawer children={children} />
            </LayoutContext.Provider>
        </>
    )
}
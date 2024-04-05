import Link from "next/link"
import Navbar from "./navbar"
import { FaHouse, FaVideo, FaPills } from "react-icons/fa6";

function handleCloseDrawer() {
    document.getElementById("my-drawer-3").click()
}

export default function Drawer({ children }) {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Navbar />
                <main>{children}</main>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    <img data-placeholder="no" src="https://vet.ku.ac.th/veten/images/logoveten2.png" alt="Faculty of Veterinary Medicine Kasetsart University" />
                    <div className="divider"></div>
                    <li className="font-bold"><Link href="/"><FaHouse/>Home</Link></li>
                    <div className="divider">Management Pages</div>
                    <li onClick={handleCloseDrawer} className="font-bold"><Link href="/doc/video_doc"><FaVideo/> Video Document</Link></li>
                    <li onClick={handleCloseDrawer} className="font-bold"><Link href="/doc/drug_doc"><FaPills/> Drug Document</Link></li>
                </ul>
            </div>
        </div>
    )
}
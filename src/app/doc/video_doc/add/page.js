"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

import DiscardConfirmationModal from "@/components/discardConfirmationModal"
import LoadingModal from "@/components/loadingModal"
import { addNewVideoDocAPI } from "@/api/videoDocAPI"



const LOADING_MODAL_ID = "loading-modal"
const DISCARD_CONFIRMATION_MODAL_ID = "discard-confirmation-modal"

function validateInput() {
    let validate = true
    const titleSection = document.getElementById("title-section")
    const videoURLSection = document.getElementById("video_url-section")
    const descriptionSection = document.getElementById("description-section")
    
    const elements = [titleSection, videoURLSection, descriptionSection]
    for (let e of elements) {
        let input = e.getElementsByTagName("input")[0]
        let textarea = e.getElementsByTagName("textarea")[0]
        let label = e.getElementsByTagName("label")[0]
        let span = e.getElementsByTagName("span")[0]

        if (input !== undefined && input.value.trim() === "") {
            validate = false
            label.classList.add("text-error")
            input.classList.add("input-error")
            span.classList.remove("hidden")
        } else if (textarea !== undefined && textarea.value.trim() === "") {
            validate = false
            label.classList.add("text-error")
            textarea.classList.add("textarea-error")
            span.classList.remove("hidden")
        }
    }

    return validate
}

async function handleAddNewVideoDoc(e, videoDoc, router) {
    try {
        e.preventDefault()
        const isValidate = validateInput()
        if (!isValidate) {
            return
        }
        document.getElementById(LOADING_MODAL_ID).showModal()
        await addNewVideoDocAPI(videoDoc)
        router.push("/doc/video_doc")
    } catch (error) {
        console.error(error)
    }
}

function handleInputChange(e, setVideoDoc) {
    const { id, value } = e.target
    let element = document.getElementById(id)
    if (value !== "") {
        if (element.classList.contains("input-error") || element.classList.contains("textarea-error")) {
            switch (element.tagName) {
                case "INPUT":
                    element.classList.remove("input-error")
                    break
                case "TEXTAREA":
                    element.classList.remove("textarea-error")
                    break
            }
            element = document.getElementById(`${id}-section`)
            element.getElementsByTagName("label")[0].classList.remove("text-error")
            element.getElementsByTagName("span")[0].classList.add("hidden")

        }
    } else {
        if (!element.classList.contains("input-error") && !element.classList.contains("textarea-error")) {
            switch (element.tagName) {
                case "INPUT":
                    element.classList.add("input-error")
                    break
                case "TEXTAREA":
                    element.classList.add("textarea-error")
                    break
            }
            element = document.getElementById(`${id}-section`)
            element.getElementsByTagName("label")[0].classList.add("text-error")
            element.getElementsByTagName("span")[0].classList.remove("hidden")
        }
    }

    setVideoDoc(prev => ({
        ...prev,
        [id]: value
    }))
}

export default function Page() {
    const router = useRouter()
    const [videoDoc, setVideoDoc] = useState({})

    return (
        <>
            <form onSubmit={(e) => handleAddNewVideoDoc(e, videoDoc, router)} noValidate>
                <div className="container mx-auto mt-6 relative">
                    <h1 className="mb-5 text-3xl font-extrabold italic">Add New Video Document</h1>
                    <div id="title-section" className="mb-5">
                        <label className="font-bold">Title</label>
                        <br />
                        <input type="text" placeholder="enter the title here..." id="title" className="input input-bordered w-1/2 bg-base-200" onChange={(e) => handleInputChange(e, setVideoDoc)} required/>
                        <br />
                        <span className="text-error font-bold hidden">* Please enter the title</span>
                    </div>

                    <div id="video_url-section" className="mb-5">
                        <label className="font-bold">Youtube URL</label>
                        <br />
                        <input type="text" placeholder="enter the youtube URL here..." id="video_url" className="input input-bordered w-1/2 bg-base-200" onChange={(e) => handleInputChange(e, setVideoDoc)} required/>
                        <br />
                        <span className="text-error font-bold hidden">* Please enter the Youtube URL</span>
                    </div>

                    <div id="description-section" className="mb-5">
                        <label className="font-bold">Description</label>
                        <br />
                        <textarea id="description" className="textarea textarea-bordered w-full bg-base-200" rows="15" placeholder="enter the description of video document here..." onChange={(e) => handleInputChange(e, setVideoDoc)} required/>
                        <br />
                        <span className="text-error font-bold hidden">* Please enter the description</span>
                    </div>

                    <div className="flex justify-center gap-5 mt-5">
                        <button type="submit" className="btn btn-accent rounded-full">Add New</button>
                        <button className="btn btn-error rounded-full" onClick={() => document.getElementById(DISCARD_CONFIRMATION_MODAL_ID).showModal()}>Discard</button>
                    </div>
                </div>
            </form>

            <DiscardConfirmationModal id={DISCARD_CONFIRMATION_MODAL_ID} goBackPath={"/doc/video_doc"} />
            <LoadingModal id={LOADING_MODAL_ID} />
        </>

    )
}
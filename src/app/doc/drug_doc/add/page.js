"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

import DiscardConfirmationModal from "@/components/discardConfirmationModal"
import LoadingModal from "@/components/loadingModal"
import DragDropFileInput from "@/components/dragDropFileInput"

import { saveImageAPI } from "@/api/imageAPI"
import { addNewDrugDocAPI } from "@/api/drugDocAPI"

function validateInput() {
    let validate = true
    const divTradeName = document.getElementById("div-trade_name")
    const divDrugName = document.getElementById("div-drug_name")
    const divPreparation = document.getElementById("div-preparation")
    const divCaution = document.getElementById("div-caution")
    const divDescription = document.getElementById("div-description")

    const elements = [divTradeName, divDrugName, divPreparation, divCaution, divDescription]
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

function handleInputChange(e, setDrugDoc) {
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
            element = document.getElementById(`div-${id}`)
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
            element = document.getElementById(`div-${id}`)
            element.getElementsByTagName("label")[0].classList.add("text-error")
            element.getElementsByTagName("span")[0].classList.remove("hidden")
        }
    }
    setDrugDoc(prev => ({
        ...prev,
        [id]: value
    }))
}

async function handleAddNewDrugDoc(e, drugDoc, router) {
    try {
        e.preventDefault()
        const isValidate = validateInput()
        if (!isValidate) {
            return
        }
        document.getElementById("loading-modal").showModal()
        const docID = await addNewDrugDocAPI(drugDoc)
        const docImageInput = document.getElementById("doc_image_input")
        if (docImageInput.value === "") {
            router.push("/doc/drug_doc")
            return
        }

        await saveImageAPI(docID, docImageInput.files[0])
        router.push("/doc/drug_doc")
    } catch (error) {
        console.error(error)
    }
}

export default function Page() {
    const router = useRouter()
    const [drugDoc, setDrugDoc] = useState({})


    return (
        <>
            <form onSubmit={(e) => handleAddNewDrugDoc(e, drugDoc, router)} noValidate>
                <div className="container mx-auto mt-5">
                    <h1 className="mb-5 text-3xl font-extrabold italic">Add New Drug Document</h1>
                    <div className="grid grid-rows-4 grid-flow-col gap-4 mb-5">
                        <div id="div-trade_name" className="mb-5">
                            <label className="font-bold">Trade Name</label>
                            <br />
                            <input type="text" placeholder="enter the trade name here..." id="trade_name" className="input input-bordered w-full bg-base-200" onChange={(e) => handleInputChange(e, setDrugDoc)} required />
                            <span className="text-error font-bold hidden">* Please enter the trade name</span>
                        </div>

                        <div id="div-drug_name" className="mb-5">
                            <label className="font-bold">Drug Name</label>
                            <br />
                            <input type="text" placeholder="enter the drug name here..." id="drug_name" className="input input-bordered w-full bg-base-200" onChange={(e) => handleInputChange(e, setDrugDoc)} required />
                            <span className="text-error font-bold hidden">* Please enter the drug name</span>
                        </div>

                        <div id="div-preparation" className="mb-5">
                            <label className="font-bold">preparation</label>
                            <br />
                            <input type="text" placeholder="enter the preparation here..." id="preparation" className="input input-bordered w-full bg-base-200" onChange={(e) => handleInputChange(e, setDrugDoc)} required />
                            <span className="text-error font-bold hidden">* Please enter the preparation</span>
                        </div>

                        <div id="div-caution" className="mb-5">
                            <label className="font-bold">caution</label>
                            <br />
                            <input type="text" placeholder="enter the caution here..." id="caution" className="input input-bordered w-full bg-base-200" onChange={(e) => handleInputChange(e, setDrugDoc)} required />
                            <span className="text-error font-bold hidden">* Please enter the caution</span>
                        </div>

                        <div className="row-span-4">
                            <DragDropFileInput id={"doc_image_input"} imagePreviewID={"image-preview"} />
                        </div>
                    </div>

                    <div id="div-description" className="mb-5">
                        <label className="font-bold">Description</label>
                        <br />
                        <textarea id="description" className="textarea textarea-bordered w-full bg-base-200" rows="15" placeholder="enter the description of video document here..." onChange={(e) => handleInputChange(e, setDrugDoc)} required />
                        <span className="text-error font-bold hidden">* Please enter the description</span>
                    </div>

                    <div className="flex justify-center gap-5 mt-5">
                        <button type="submit" className="btn btn-accent rounded-full">Add New</button>
                        <button type="button" className="btn btn-error rounded-full" onClick={() => document.getElementById("discard-confirmation-modal").showModal()}>Discard</button>
                    </div>
                </div>
            </form>

            <DiscardConfirmationModal id={"discard-confirmation-modal"} goBackPath={"/doc/drug_doc"} />
            <LoadingModal id={"loading-modal"} />
        </>
    )
}
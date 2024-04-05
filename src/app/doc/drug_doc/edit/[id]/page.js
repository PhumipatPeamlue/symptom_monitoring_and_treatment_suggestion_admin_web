"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import LoadingPage from "@/components/loadingPage"
import DragDropFileInput from "@/components/dragDropFileInput"
import DiscardConfirmationModal from "@/components/discardConfirmationModal"
import LoadingModal from "@/components/loadingModal"

import { changeDrugDocInfoAPI, getDrugDocAPI } from "@/api/drugDocAPI"
import changeImageAPI, { deleteImageAPI, getImageAPI, saveImageAPI } from "@/api/imageAPI"
import SaveChangeConfirmationModal from "@/components/saveChangeConfirmationModal"

const DISCARD_CONFIRMATION_MODAL_ID = "discard-confirmation-modal"
const LOADING_MODAL_ID = "loading-modal"
const IMAGE_INPUT_ID = "doc-image-input"
const IMAGE_PREVIEW_ID = "image-preview"
const SAVE_CHANGE_CONFIRMATION_MODAL_ID = "save-change-confirmation-modal"

async function fetchData(id, setDrugDoc, setIsLoading) {
    try {
        const drugDocData = await getDrugDocAPI(id)
        setDrugDoc(drugDocData)
        const drugDocImage = await getImageAPI(id)
        setDrugDoc(prev => ({
            ...prev,
            image: drugDocImage
        }))
        setIsLoading(false)
    } catch (error) {
        console.error(error)
    }
}

function handleChangeInput(e, setDrugDoc) {
    setDrugDoc(prev => ({
        ...prev,
        [e.target.id]: e.target.value
    }))
}

async function handleSubmit(e, drugDoc, router) {
    try {
        e.preventDefault()
        document.getElementById(LOADING_MODAL_ID).showModal()
    
        await changeDrugDocInfoAPI(drugDoc)
    
        const docImageInput = document.getElementById(IMAGE_INPUT_ID)
        const imagePreview = document.getElementById(IMAGE_PREVIEW_ID)
        const docID = drugDoc.id
        const file = docImageInput.files[0]
        if (drugDoc.image === null) {
            if (docImageInput.value !== "") {
                await saveImageAPI(docID, file)
            }
        } else {
            if (docImageInput.value !== "") {
                await changeImageAPI(docID, file)
            } else if (imagePreview.src === "") {
                await deleteImageAPI(docID)
            }
        }

        router.push(`/doc/drug_doc/${docID}`)
    } catch (error) {
        console.error(error)
    }
}



export default function Page({ params }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [drugDoc, setDrugDoc] = useState(null)
    useEffect(() => {
        fetchData(params.id, setDrugDoc, setIsLoading)
    }, [])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, drugDoc, router)}>
                <div className="container mx-auto mt-5">
                    <h1 className="mb-5 text-3xl font-extrabold italic">Edit Drug Document</h1>
                    <div className="grid grid-rows-4 grid-flow-col gap-4 mb-5">
                        <div className="mb-5">
                            <label className="font-bold">Trade Name</label>
                            <br />
                            <input type="text" placeholder="enter the trade name here..." id="trade_name" className="input input-bordered w-full" onChange={(e) => handleChangeInput(e, setDrugDoc)} value={drugDoc.trade_name} required />
                        </div>

                        <div className="mb-5">
                            <label className="font-bold">Drug Name</label>
                            <br />
                            <input type="text" placeholder="enter the drug name here..." id="drug_name" className="input input-bordered w-full" onChange={(e) => handleChangeInput(e, setDrugDoc)} value={drugDoc.drug_name} required />
                        </div>

                        <div className="mb-5">
                            <label className="font-bold">preparation</label>
                            <br />
                            <input type="text" placeholder="enter the preparation here..." id="preparation" className="input input-bordered w-full" onChange={(e) => handleChangeInput(e, setDrugDoc)} value={drugDoc.preparation} required />
                        </div>

                        <div className="mb-5">
                            <label className="font-bold">caution</label>
                            <br />
                            <input type="text" placeholder="enter the caution here..." id="caution" className="input input-bordered w-full" onChange={(e) => handleChangeInput(e, setDrugDoc)} value={drugDoc.caution} required />
                        </div>

                        <div className="row-span-4">
                            <DragDropFileInput id={IMAGE_INPUT_ID} imagePreviewSrc={drugDoc.image} imagePreviewID={IMAGE_PREVIEW_ID} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="font-bold">Description</label>
                        <br />
                        <textarea id="description" className="textarea textarea-bordered w-full" rows="15" placeholder="enter the description of video document here..." onChange={(e) => handleChangeInput(e, setDrugDoc)} value={drugDoc.description} required />
                    </div>

                    <div className="flex justify-center gap-5 mt-5">
                        <button type="button" className="btn btn-neutal rounded-full" onClick={() => document.getElementById(SAVE_CHANGE_CONFIRMATION_MODAL_ID).showModal()}>Save Change</button>
                        <button type="button" className="btn btn-accent rounded-full" onClick={() => document.getElementById(DISCARD_CONFIRMATION_MODAL_ID).showModal()}>Discard</button>
                    </div>
                </div>
            </form>

            <SaveChangeConfirmationModal id={SAVE_CHANGE_CONFIRMATION_MODAL_ID} handleSaveChange={(e) => handleSubmit(e, drugDoc, router)} />
            <DiscardConfirmationModal id={DISCARD_CONFIRMATION_MODAL_ID} goBackPath={`/doc/drug_doc/${drugDoc.id}`} />
            <LoadingModal id={LOADING_MODAL_ID} />
        </>
    )
}
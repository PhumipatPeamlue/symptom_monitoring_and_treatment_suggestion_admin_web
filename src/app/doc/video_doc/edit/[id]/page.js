"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import LoadingModal from "@/components/loadingModal"
import SaveChangeConfirmationModal from "@/components/saveChangeConfirmationModal"
import DiscardConfirmationModal from "@/components/discardConfirmationModal"
import LoadingPage from "@/components/loadingPage"

import { changeVideoDocInfoAPI, getVideoDoc } from "@/api/videoDocAPI"

const LOADING_MODAL_ID = "loading-modal"
const DISCARD_CONFIRMATION_MODAL_ID = "discard-confirmation-modal"
const SAVE_CHANGE_CONFIRMATION_MODAL_ID = "save-change-confirmation-modal"

async function fetchData(id, setVideoDoc, setIsLoading) {
    try {
        const data = await getVideoDoc(id)
        setVideoDoc(data)
        setIsLoading(false)
    } catch (error) {
        console.error(error)
    }
}

function handleChangeInput(e, setVideoDoc) {
    setVideoDoc(prev => ({
        ...prev,
        [e.target.id]: e.target.value
    }))
}

async function handleSaveChange(videoDoc, router) {
    try {
        document.getElementById(LOADING_MODAL_ID).showModal()
        await changeVideoDocInfoAPI(videoDoc)
        router.push(`/doc/video_doc/${videoDoc.id}`)
    } catch (error) {
        console.error(error)
    }
}

export default function Page({ params }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [videoDoc, setVideoDoc] = useState(null)
    useEffect(() => {
        fetchData(params.id, setVideoDoc, setIsLoading)
    }, [])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    // console.log(videoDoc)

    return (
        <>
            <div className="container mx-auto mt-6 relative">
                <h1 className="mb-5 text-3xl font-extrabold italic">Edit Video Document</h1>
                <div className="mb-5">
                    <label className="font-bold">Title</label>
                    <br />
                    <input type="text" placeholder="enter the title here..." id="title" className="input input-bordered w-1/2 bg-base-200" value={videoDoc.title} onChange={(e) => handleChangeInput(e, setVideoDoc)} />
                </div>

                <div className="mb-5">
                    <label className="font-bold">Video URL</label>
                    <br />
                    <input type="text" placeholder="enter the youtube URL here..." id="video_url" className="input input-bordered w-1/2 bg-base-200" value={videoDoc.video_url} onChange={(e) => handleChangeInput(e, setVideoDoc)} />
                </div>

                <div className="mb-5">
                    <label className="font-bold">Description</label>
                    <br />
                    <textarea id="description" className="textarea textarea-bordered w-full bg-base-200" rows="15" placeholder="enter the description of video document here..." value={videoDoc.description} onChange={(e) => handleChangeInput(e, setVideoDoc)} />
                </div>

                <div className="flex justify-center gap-5 mt-5">
                    <button className="btn btn-accent rounded-full" onClick={() => document.getElementById(SAVE_CHANGE_CONFIRMATION_MODAL_ID).showModal()}>Save Change</button>
                    <button className="btn btn-error rounded-full" onClick={() => document.getElementById(DISCARD_CONFIRMATION_MODAL_ID).showModal()}>Discard</button>
                </div>

            </div>

            <SaveChangeConfirmationModal id={SAVE_CHANGE_CONFIRMATION_MODAL_ID} handleSaveChange={() => handleSaveChange(videoDoc, router)} />

            <DiscardConfirmationModal id={DISCARD_CONFIRMATION_MODAL_ID} goBackPath={`/doc/video_doc/${videoDoc.id}`} />

            <LoadingModal id={LOADING_MODAL_ID}  />
        </>
    )
}
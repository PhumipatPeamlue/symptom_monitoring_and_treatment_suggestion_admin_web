"use client"

import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LoadingModal from '@/components/loadingModal';
import RemoveConfirmationModal from '@/components/removeConfirmationModal';
import LoadingPage from '@/components/loadingPage';

import { getVideoDoc, removeVideoDocAPI } from '@/api/videoDocAPI';

const LOADING_MODAL_ID = "loading-modal"
const REMOVE_CONFIRMATION_MODAL_ID = "remove-confirmation"

async function fetchData(id, setVideoDoc, setIsLoading) {
    try {
        const data = await getVideoDoc(id)
        setVideoDoc(data)
        setIsLoading(false)
    } catch (error) {
        console.error(error)
    }
}

async function handleRemoveVideoDoc(id, router) {
    try {
        document.getElementById(LOADING_MODAL_ID).showModal()
        await removeVideoDocAPI(id)
        router.push("/doc/video_doc")
    } catch (error) {
        console.error(error)
    }
}

export default function Page({ params }) {
    const videoDocID = params.id
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [videoDoc, setVideoDoc] = useState(null)
    useEffect(() => {
        fetchData(videoDocID, setVideoDoc, setIsLoading)
    }, []);

    if (isLoading) {
        return (
            <LoadingPage />

        )
    }

    const youtubeVideoID = videoDoc.video_url.split("https://youtu.be/")[1]
    return (
        <>
            <div className="container mx-auto mt-6">
                <div>
                    <h1 className="mb-4 text-5xl font-extrabold italic">{videoDoc.title}</h1>
                    <div className="flex justify-center mb-4">
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeVideoID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>

                    <div className="divider"></div>

                    <div className="mb-4">
                        <h2 className="mb-4 text-3xl font-bold">Description</h2>
                        <p className="indent-8 text-pretty bg-base-200 rounded-md p-5">{videoDoc.description}</p>
                    </div>
                </div>

                <div className="flex justify-center gap-5 mt-5">
                    <button className="btn btn-accent rounded-full"><Link href={`/doc/video_doc/edit/${videoDocID}`}>Edit</Link></button>
                    <button className="btn btn-error rounded-full" onClick={() => document.getElementById(REMOVE_CONFIRMATION_MODAL_ID).showModal()}>Remove</button>
                </div>
            </div>

            <RemoveConfirmationModal id={REMOVE_CONFIRMATION_MODAL_ID} handleRemove={() => handleRemoveVideoDoc(videoDocID, router)} />

            <LoadingModal id={LOADING_MODAL_ID} />
        </>
    );
}
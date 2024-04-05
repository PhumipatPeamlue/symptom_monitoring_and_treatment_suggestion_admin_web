"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { getDrugDocAPI, removeDrugDocAPI } from "@/api/drugDocAPI"
import { getImageAPI, deleteImageAPI } from "@/api/imageAPI"

import LoadingPage from "@/components/loadingPage"
import RemoveConfirmationModal from "@/components/removeConfirmationModal"
import LoadingModal from "@/components/loadingModal"

const LOADING_MODAL_ID = "loading-modal"
const REMOVE_CONFIRMATION_MODAL_ID = "remove-confirmation-modal"

async function handleRemoveDrugDoc(id, router) {
    try {
        document.getElementById(LOADING_MODAL_ID).showModal()
        await removeDrugDocAPI(id)
        await deleteImageAPI(id)
        router.push("/doc/drug_doc")
    } catch (error) {
        console.error(error)
    }
}

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

export default function Page({ params }) {
    const router = useRouter()
    const [drugDoc, setDrugDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchData(params.id, setDrugDoc, setIsLoading)
    }, [])

    if (isLoading) {
        return <LoadingPage />
    }

    if (drugDoc === null) {
        return <h1 className="text-5xl font-extrabold">404</h1>
    }

    // console.log(drugDoc)

    return (
        <>
            <div className="container mx-auto mt-6">
                <div className="mb-4">
                    <h1 className="mb-4 text-5xl font-extrabold italic">{drugDoc.trade_name} ({drugDoc.drug_name})</h1>
                    <img alt="drug-image" src={drugDoc.image === null ? "/no-image.svg" : drugDoc.image} className="mx-auto"/>
                </div>

                <div className="divider"></div>

                <div className="mb-4">
                    <h2 className="mb-4 text-3xl font-bold">Description</h2>
                    <p className="indent-8 text-pretty rounded-md p-5 bg-base-200">{drugDoc.description}</p>
                </div>

                <div className="mb-4">
                    <h2 className="mb-4 text-3xl font-bold">Preparation</h2>
                    <p className="indent-8 text-pretty rounded-md p-5 bg-base-200">{drugDoc.preparation}</p>
                </div>

                <div className="mb-4">
                    <h2 className="mb-4 text-3xl font-bold">Caution</h2>
                    <p className="indent-8 text-pretty rounded-md p-5 bg-base-200">{drugDoc.caution}</p>
                </div>

                <div className="flex justify-center gap-5 mt-5">
                    <button className="btn btn-accent rounded-full"><Link href={`/doc/drug_doc/edit/${drugDoc.id}`}>Edit</Link></button>
                    <button className="btn btn-error rounded-full" onClick={() => document.getElementById(REMOVE_CONFIRMATION_MODAL_ID).showModal()}>Remove</button>
                </div>
            </div>

            <RemoveConfirmationModal id={REMOVE_CONFIRMATION_MODAL_ID} handleRemove={() => handleRemoveDrugDoc(drugDoc.id, router)} />

            <LoadingModal id={LOADING_MODAL_ID} />
        </>
    )
}
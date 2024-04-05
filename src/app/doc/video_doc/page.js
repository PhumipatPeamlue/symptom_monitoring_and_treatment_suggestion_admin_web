"use client"

import { useEffect, useState, useContext } from "react"
import Link from "next/link"

import { LayoutContext } from "../layout"

import style from "./style.module.css"

import Table from "../../../components/videoDocTable"
import Pagination from "@/components/pagination"
import LoadingPage from "@/components/loadingPage"

import { searchVideoDocs } from "@/api/videoDocAPI"


const PAGE_SIZE = 10



export default function Page() {
    const [isLoading, setIsLoading] = useState(true)
    const [searchData, setSearchData] = useState(null)
    const [page, setPage] = useState(1)
    const { search } = useContext(LayoutContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await searchVideoDocs(page, PAGE_SIZE, search)
                setSearchData(res)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();
    }, [page, search])


    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <div className="md:container md:mx-auto">
                <div className={style.row}>
                    <button className="btn btn-primary"><Link href={"/doc/video_doc/add"}>+ Video Document</Link></button>
                </div>
                <div className="grid grid-rows-2 grid-flow-col gap-4">
                    <div className={style.row}>
                        <Table docs={searchData.data} />
                    </div>

                    <div className={style.row}>
                        <div className="absolute top-0 right-0">
                            <Pagination currentPage={page} setCurrentPage={setPage} pageSize={PAGE_SIZE} total={searchData.total} />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

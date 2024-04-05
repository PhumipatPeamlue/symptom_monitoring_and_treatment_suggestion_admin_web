"use client"

import { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { LayoutContext } from "../layout";

import style from "./style.module.css"

import Table from "@/components/drugDocTable";
import Pagination from "@/components/pagination";
import LoadingPage from "@/components/loadingPage";

import { searchDrugDocs } from "@/api/drugDocAPI";

const PAGE_SIZE = 10

export default function Page() {
    const [isLoading, setIsLoading] = useState(true)
    const [searchData, setSearchData] = useState(null)
    const [page, setPage] = useState(1)
    const { search } = useContext(LayoutContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await searchDrugDocs(page, PAGE_SIZE, search)
                setSearchData(res)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [page, search])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <>
            <div className="container mx-auto">
                <div className={style.row}>
                    <button className="btn btn-primary"><Link href={"/doc/drug_doc/add"}>+ Drug Document</Link></button>
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
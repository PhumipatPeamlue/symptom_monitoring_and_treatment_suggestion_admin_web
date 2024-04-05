"use client"

export default function Pagination({ currentPage, setCurrentPage, pageSize, total }) {
    const lastPage = Math.ceil(total / pageSize)
    
    const handleIncrement = () => {
        if (currentPage === lastPage) {
            return
        }

        setCurrentPage(currentPage + 1)
    }

    const handleDecrement = () => {
        if (currentPage === 1) {
            return
        }

        setCurrentPage(currentPage - 1)
    }


    return (
        <div className="join">
            <button className={"join-item btn" + " " + (currentPage === 1 ? "btn-disabled" : "")} onClick={handleDecrement}>«</button>
            <button className="join-item btn">{`Page ${currentPage}`}</button>
            <button className={"join-item btn" + " " + (currentPage >= lastPage ? "btn-disabled" : "")} onClick={handleIncrement}>»</button>
        </div>
    )
}
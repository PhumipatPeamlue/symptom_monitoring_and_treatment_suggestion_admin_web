import Link from "next/link"

function Row({ index, doc }) {
    const { id, trade_name: tradeName, drug_name: drugName } = doc
    let createdDate = new Date(doc.created_at)
    let updatedDate = new Date(doc.updated_at)
    const createdAt = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`
    const updatedAt = `${updatedDate.getDate()}/${updatedDate.getMonth() + 1}/${updatedDate.getFullYear()}`

    return (
        <tr>
            <th>{index}</th>
            <td>{tradeName}</td>
            <td>{drugName}</td>
            <td>{createdAt}</td>
            <td>{updatedAt}</td>
            <td><Link href={`/doc/drug_doc/${id}`}><button className="btn btn-xs btn-secondary">more details</button></Link></td>
        </tr>
    )
}

export default function DrugDocTable({ docs }) {
    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th></th>
                        <th>Trade Name</th>
                        <th>Drug Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {docs.map((doc, index) => {
                        return <Row key={doc.id} index={index + 1} doc={doc} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
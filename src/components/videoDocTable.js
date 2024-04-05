import Link from "next/link";

function Row({ index, doc }) {
    const { id, title } = doc
    let createdAt = new Date(doc.created_at)
    let updatedAt = new Date(doc.updated_at)
    createdAt = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`
    updatedAt = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}/${updatedAt.getFullYear()}`

    return (
        <tr>
            <th>{index}</th>
            <td>{title}</td>
            <td>{createdAt}</td>
            <td>{updatedAt}</td>
            <td><Link href={`/doc/video_doc/${id}`}><button className="btn btn-xs btn-secondary">more details</button></Link></td>
        </tr>
    );
}

export default function VideoDocTable({ docs }) {

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
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
        </>


    );
}
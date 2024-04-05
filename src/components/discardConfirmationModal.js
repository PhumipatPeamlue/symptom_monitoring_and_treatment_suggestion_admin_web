import Link from 'next/link'

export default function DiscardConfirmationModal({ id, goBackPath }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Discard Confirmation</h3>
                <p>Are you sure to discard?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-error"><Link href={goBackPath}>Confirm</Link></button>
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
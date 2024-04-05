export default function RemoveConfirmationModal({ id, handleRemove }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Remove Confirmation</h3>
                <p className="py-4">Are you sure to remove this document?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-accent" onClick={() => handleRemove()}>Confirm</button>
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
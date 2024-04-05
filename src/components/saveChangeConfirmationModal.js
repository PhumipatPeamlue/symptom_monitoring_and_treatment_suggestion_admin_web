export default function SaveChangeConfirmationModal({ id, handleSaveChange }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Save Change Confirmation</h3>
                <p>Are you sure to save change?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-accent" onClick={(e) => handleSaveChange(e)}>Confirm</button>
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
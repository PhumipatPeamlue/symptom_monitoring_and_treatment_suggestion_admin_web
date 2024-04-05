export default function LoadingModal({ id }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <div className="flex justify-center">
                    <h3 className="font-bold text-lg">Please wait</h3>
                </div>
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>

            </div>
        </dialog>
    )
}
import { FaCloudArrowUp } from "react-icons/fa6";

function showPreviewImage(file) {
    const reader = new FileReader()
    reader.onload = function (e) {
        const img = document.getElementById("image-preview")
        img.src = e.target.result
    }
    reader.readAsDataURL(file)
    document.getElementById("drop-file-here-textbox").classList.add("hidden")
    document.getElementById("cloud-upload-icon").classList.add("hidden")
    document.getElementById("or-textbox").classList.add("hidden")
    document.getElementById("image-preview").removeAttribute("hidden")
    document.getElementById("rm-img-btn").classList.remove("hidden")
}

function handleDropFile(e, id) {
    e.preventDefault()

    if (e.dataTransfer.files.length) {
        document.getElementById(id).files = e.dataTransfer.files
        showPreviewImage(e.dataTransfer.files[0])
    }
}

function handleFileInputChange(id) {
    const fileInput = document.getElementById(id)
    showPreviewImage(fileInput.files[0])
}

function handleRemoveFile(id, imagePreviewID) {
    document.getElementById(id).value = ""
    document.getElementById("drop-file-here-textbox").classList.remove("hidden")
    document.getElementById("cloud-upload-icon").classList.remove("hidden")
    document.getElementById("or-textbox").classList.remove("hidden")
    document.getElementById("image-preview").setAttribute("hidden", true)
    document.getElementById("rm-img-btn").classList.add("hidden")
    document.getElementById(imagePreviewID).removeAttribute("src")
}

export default function DragDropFileInput({ id, imagePreviewSrc, imagePreviewID }) {


    if (imagePreviewSrc === undefined || imagePreviewSrc === null) {
        return (
            <div className="border-4 border-dashed border-gray-300 rounded-lg w-full h-full flex flex-col justify-center gap-4 p-5 bg-base-200" onDragOver={e => e.preventDefault()} onDrop={(e) => handleDropFile(e, id)}>
                <div className="flex justify-center">
                    <img id={imagePreviewID} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%' }} hidden />
                </div>
                <div id="drop-file-here-textbox" className="flex justify-center">
                    <h3 className="text-3xl font-bold">Drop image here</h3>
                </div>
                <div id="cloud-upload-icon" className="flex justify-center">
                    <FaCloudArrowUp size={70} />
                </div>
                <div id="or-textbox" className="flex justify-center">
                    <p className="font-bold">or</p>
                </div>
                <div className="flex justify-center gap-5">
                    <input id={id} type="file" onChange={() => handleFileInputChange(id)} accept="image/*" hidden />
                    <button type="button" className="btn btn-accent" onClick={() => document.getElementById(id).click()}>choose image</button>
                    <button id="rm-img-btn" type="button" className="btn btn-error hidden" onClick={() => handleRemoveFile(id, imagePreviewID)}>remove image</button>
                </div>
            </div>
        )

    }

    return (
        <div className="border-4 border-dashed border-gray-300 rounded-lg w-full h-full flex flex-col justify-center gap-4 p-5" onDragOver={e => e.preventDefault()} onDrop={(e) => handleDropFile(e, id)}>
            <div className="flex justify-center">
                <img id={imagePreviewID} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%' }} src={imagePreviewSrc} />
            </div>
            <div id="drop-file-here-textbox" className="flex justify-center hidden">
                <h3 className="text-3xl font-bold">Drop image here</h3>
            </div>
            <div id="or-textbox" className="flex justify-center hidden">
                <p className="font-bold">or</p>
            </div>
            <div className="flex justify-center gap-5">
                <input id={id} type="file" onChange={() => handleFileInputChange(id)} accept="image/*" hidden />
                <button type="button" className="btn btn-accent" onClick={() => document.getElementById(id).click()}>choose image</button>
                <button id="rm-img-btn" type="button" className="btn btn-error" onClick={() => handleRemoveFile(id, imagePreviewID)}>remove image</button>
            </div>
        </div>
    )
}
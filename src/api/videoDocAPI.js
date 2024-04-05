export async function searchVideoDocs(page, pageSize, keyword) {
    try {
        let url = `http://localhost:8080/document/video_doc/search?page=${page}&page_size=${pageSize}`
        if (keyword.trim() !== "") {
            url = `http://localhost:8080/document/video_doc/search?page=${page}&page_size=${pageSize}&keyword=${keyword}`
        }
        const res = await fetch(url)
        let data = await res.json()
        switch (res.status) {
            case 404:
                data = { data: [], total: 0 }
                break
            case 500:
                throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw error
    }
}

export async function getVideoDoc(id) {
    const res = await fetch(`http://localhost:8080/document/video_doc/${id}`)
    if (!res.ok) {
        console.error(err)
        return
    }
    const data = await res.json()

    return data
}

export async function removeVideoDocAPI(id) {
    try {
        const res = await fetch(`http://localhost:8080/document/video_doc/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        switch (res.status) {
            case 500:
                throw new Error(data.error)
            default:
                console.log(data.message)
        }
    } catch (error) {
        throw error
    }
}

export async function addNewVideoDocAPI(videoDoc) {
    try {
        const formData = new FormData()
        formData.set("title", videoDoc.title)
        formData.set("video_url", videoDoc.video_url)
        formData.set("description", videoDoc.description)
        const res = await fetch("http://localhost:8080/document/video_doc/", {
            method: "POST",
            body: formData
        })
        let data = await res.json()

        switch (res.status) {
            case 400:
                throw new Error(data.error)
            case 409:
                throw new Error(data.error)
            default:
                console.log(data.message)
        }
    } catch (error) {
        throw error
    }
}

export async function changeVideoDocInfoAPI(videoDoc) {
    try {
        const formData = new FormData()
        formData.set("id", videoDoc.id)
        formData.set("title", videoDoc.title)
        formData.set("video_url", videoDoc.video_url)
        formData.set("description", videoDoc.description)

        const res = await fetch(`http://localhost:8080/document/video_doc/`, {
            method: "PUT",
            body: formData
        })
        let data = await res.json()

        switch (res.status) {
            case 400:
                throw new Error(data.error)
            case 409:
                throw new Error(data.error)
            default:
                console.log(data.message)
        }
    } catch (error) {
        throw error
    }
}
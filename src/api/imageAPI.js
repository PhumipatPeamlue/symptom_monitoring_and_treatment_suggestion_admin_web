export async function getImageAPI(id) {
    try {
        const res = await fetch(`http://localhost:8080/image/${id}`)
        let data = await res.json()
        switch (res.status) {
            case 404:
                data = null
                break
            case 500:
                throw new Error(data.error)
            default:
                data = data.image_url
        }
        return data
    } catch (error) {
        throw error
    }
}



export async function deleteImageAPI(id) {
    try {
        const res = await fetch(`http://localhost:8080/image/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        switch (res.status) {
            case 400:
                throw new Error(data.error)
            case 500:
                throw new Error(data.error)
            default:
                console.log(data.message)
        }
    } catch (error) {
        throw error
    }
}

export async function saveImageAPI(id, file) {
    try {
        const formData = new FormData()
        formData.set("image", file)
        const res = await fetch(`http://localhost:8080/image/${id}`, {
            method: "POST",
            body: formData
        })
        let data = await res.json()

        switch (res.status) {
            case 404:
                throw new Error(data.error)
            case 500:
                throw new Error(data.error)
            default:
                console.log(data.message)
        }
    } catch (error) {
        throw error
    }
}

export default async function changeImageAPI(id, file) {
    try {
        const formData = new FormData()
        formData.set("image", file)
        const res = await fetch(`http://localhost:8080/image/${id}`, {
            method: "PUT",
            body: formData
        })
        let data = await res.json()

        switch (res.status) {
            case 404:
                throw new Error(data.error)
            case 500:
                throw new Error(data.error)
            default:
                console.log(data.message)
        }
    } catch (error) {
        throw error
    }
}
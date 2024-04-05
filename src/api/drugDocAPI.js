export async function getDrugDocAPI(id) {
    try {
        const res = await fetch(`http://localhost:8080/document/drug_doc/${id}`)
        let data = await res.json()
        switch (res.status) {
            case 404:
                data = null
                break
            case 500:
                throw new Error(data.error)
        }

        return data
    } catch (error) {
        throw error
    }
}

export async function removeDrugDocAPI(id) {
    try {
        const res = await fetch(`http://localhost:8080/document/drug_doc/${id}`, {
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

export async function addNewDrugDocAPI(drugDoc) {
    try {
        const formData = new FormData()
        formData.set("trade_name", drugDoc.trade_name)
        formData.set("drug_name", drugDoc.drug_name)
        formData.set("description", drugDoc.description)
        formData.set("preparation", drugDoc.preparation)
        formData.set("caution", drugDoc.caution)

        const res = await fetch("http://localhost:8080/document/drug_doc/", {
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
        
        return data.doc_id
    } catch (error) {
        throw error
    }
}

export async function changeDrugDocInfoAPI(drugDoc) {
    try {
        const formData = new FormData()
        formData.set("id", drugDoc.id)
        formData.set("trade_name", drugDoc.trade_name)
        formData.set("drug_name", drugDoc.drug_name)
        formData.set("description", drugDoc.description)
        formData.set("preparation", drugDoc.preparation)
        formData.set("caution", drugDoc.caution)

        const res = await fetch("http://localhost:8080/document/drug_doc/", {
            method: "PUT",
            body: formData,
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

export async function searchDrugDocs(page, pageSize, keyword) {
    try {
        let url = `http://localhost:8080/document/drug_doc/search?page=${page}&page_size=${pageSize}`
        if (keyword.trim() !== "") {
            url = `http://localhost:8080/document/drug_doc/search?page=${page}&page_size=${pageSize}&keyword=${keyword}`
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
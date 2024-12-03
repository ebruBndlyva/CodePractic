


export async function getAllDatas(url) {
    let data = null;
    let error = null;

    await axios.get(url)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};

export async function getDataId(url, id) {
    let data = null;
    let error = null;

    await axios.get(`${url}/${id}`)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};
export async function postData(url, newObj) {
    let data = null;
    let error = null;

    await axios.post(url, newObj)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};

export async function UpdateData(url,id, newObj) {
    let data = null;
    let error = null;

    await axios.put(`${url}/${id}`, newObj)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};
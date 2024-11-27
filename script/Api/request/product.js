


export async function getAllProducts(url) {
    let data = null;
    let error = null;

    await axios.get(url)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};

export async function getProductId(url, id) {
    let data = null;
    let error = null;

    await axios.get(`${url}${id}`)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};
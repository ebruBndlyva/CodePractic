export async function getAllDatas(url) {
    let datas;
    let error;
    await axios.get(url)
        .then(res => datas = res.data)
        .catch(err => error = err)
 
    return {
        datas,
        error
    }
}

export async function PostData(url, newObj) {
    let datas;
    let error;
    await axios.post(url, newObj)
        .then(res => datas = res.data)
        .catch(err => error = err)

    return {
        datas,
        error
    }
}
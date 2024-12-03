import { baseUrl } from "./Api/baseUrl.js"
import { getAllDatas } from "./Api/request/request.js"

const logForm = document.querySelector(".logForm")
const logEmail = document.querySelector("#logEmail")
const logPasw = document.querySelector("#logPassword")

logForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    let userDatas = await getAllDatas(baseUrl.users)
    let findUser = userDatas.datas.find(({ email }) => email == logEmail.value)
    if (!findUser) {
        alert("Email is not defined")
        return
    }
    let findPasw = userDatas.datas.find(({ password }) => password == logPasw.value)
    if (!findPasw) {
        alert("Password is not defined")
        return
    }
    localStorage.setItem("userId", findUser.id)
    alert("You are successfully logged in")
})
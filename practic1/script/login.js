import baseUrl from "./Api/baseUrl.js"
import {getAllDatas } from "./Api/request/product.js"

let allUser = []


const logForm = document.querySelector("#login")
const logEmailInp = document.querySelector("#logEmail")
const logPaswInp = document.querySelector("#logPassword")


async function getAllUser() {
    let logUser = await getAllDatas(`${baseUrl}users`)
    allUser = logUser.data

    logForm.addEventListener("submit", function (e) {
        e.preventDefault()

        let findLogUser = allUser.find(({ email, password }) => email == logEmailInp.value && password == logPaswInp.value)
        if (!findLogUser) {
            alert("Invalid email and password")
        }
        localStorage.setItem("userId", JSON.stringify(findLogUser.id))
        window.location = "./index.html"
 
    })
}
getAllUser()

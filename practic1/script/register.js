import baseUrl from "./Api/baseUrl.js"
import { postData, getAllDatas } from "./Api/request/product.js"

let allUser = []
const regForm = document.querySelector("#register")
const regNameInp = document.querySelector("#regUserName")
const regEmailInp = document.querySelector("#regEmail")
const regPaswInp = document.querySelector("#regPassword")

async function GetUserData() {
    let users = await getAllDatas(`${baseUrl}users`)
    allUser = users.data
    regForm.addEventListener("submit", function (e) {
        e.preventDefault()
        let newUser = {
            name: regNameInp.value,
            email: regEmailInp.value,
            password: regPaswInp.value,
            isAdmin: false,
            favorites: []

        }
        let findUser = allUser.find(({ email }) => email == regEmailInp.value)
        if (findUser) {
            alert("Bu email artiq qeydiyyatdan keçmişdir!")
            return
        }
        postData(`${baseUrl}users`, newUser)
            .then(() => {
                window.location = "./login.html"
            })
    })
}

GetUserData()
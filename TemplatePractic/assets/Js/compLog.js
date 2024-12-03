import { baseUrl } from "./Api/baseUrl.js"
import { getAllDatas } from "./Api/request/request.js"

const compLogForm = document.querySelector(".compLogin-form")
const complogName = document.querySelector("#logCompName")
const compLogWebsite = document.querySelector("#logWebsite")

compLogForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    let companyDatas = await getAllDatas(baseUrl.companies)
    let findCompany = companyDatas.datas.find(({ companyName }) => companyName == complogName.value)
    if (!findCompany) {
        alert("CompanyName is not defined")
        return
    }
    let findSite = companyDatas.datas.find(({ website }) =>website== compLogWebsite.value)
    if (!findSite) {
        alert("website is not defined")
        return
    }
    localStorage.setItem("companyId", findCompany.id)
    alert("You are successfully logged in")
})
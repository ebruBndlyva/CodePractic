import { baseUrl } from "./Api/baseUrl.js"
import { PostData, getAllDatas } from "./Api/request/request.js"

const regCompForm = document.querySelector(".companyRegister")
const regCompName = document.querySelector("#compName")
const regLocation = document.querySelector("#location")
const regIndustry = document.querySelector("#industry")
const regSite = document.querySelector("#website")



regCompForm.addEventListener("submit", function (e) {
    e.preventDefault()

    let newCompany = {
        companyName: regCompName.value,
        location: regLocation.value,
        industry: regIndustry.value,
        website: regSite.value
    }
    let findCompany;
    getAllDatas(baseUrl.companies)
        .then(res => {
            let companyDatas = res.datas
            findCompany = companyDatas.find(({ companyName }) => companyName == regCompName.value)

        })
    if (!findCompany) {
        PostData(baseUrl.companies, newCompany)
            .then(() => {
               window.location = "./companyLogin.html"
            })

    } else {
        alert("Bu sirket adi qeydiyyatdan kecilmisdir!")

    }

}
)
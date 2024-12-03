
import { baseUrl } from "./Api/baseUrl.js"
import { getAllDatas } from "./Api/request/request.js"

const tBody = document.querySelector("tbody")
const thead = document.querySelector("thead")


const userClick = document.querySelector(".user-link")
const companyClick = document.querySelector(".company-link")

userClick.addEventListener("click", function () {
    usersSelect()
})

function usersSelect() {
    let tableUsers = []
    async function tableData() {
        let tableUserDatas = await getAllDatas(baseUrl.users)
        tableUsers = tableUserDatas.datas
        showData(tableUsers)
    }
    tableData()

    function showData(tableMembers) {
        tBody.innerHTML = ""
        tableMembers.forEach(member => {
            thead.innerHTML = `
            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Password</th>
                                <th>Address</th>
                                <th>#Edit</th>
                            </tr>
         `
            tBody.innerHTML += `
       <tr>
         <td>${member.id}</td>
     <td><img src=${member.image} alt="img"></td>
           <td>${member.name}</td>
              <td>${member.password}</td>
                <td>${member.email}</td>
         <td>
                <button
             style="text-align: center;background-color: yellow;border: none; padding: 5px 10px; ">Edit</button>
              <button
       style="text-align: center;background-color: red;border: none; padding: 5px 10px; color: white;">Delete</button>
        </td>
        </tr>
    `

        });
    }
}
usersSelect()

companyClick.addEventListener("click", function () {
    companiesSelect()
})


function companiesSelect() {
    let tableCompanies = []
    async function tableData() {
        let tableCompanyDatas = await getAllDatas(baseUrl.companies)
        tableCompanies = tableCompanyDatas.datas
        showCompanyData(tableCompanies)
    }
    tableData()

    function showCompanyData(tableMembers) {
        thead.innerHTML = `
           <tr>
                                <th>#</th>
                                <th>CompanyName</th>
                                <th>Location</th>
                                <th>Industry</th>
                                <th>Website</th>
                                <th>#Edit</th>
                            </tr>
        `
        tBody.innerHTML = ""
        tableMembers.forEach(member => {
            tBody.innerHTML += `
       <tr>
         <td>${member.id}</td>
     <td>${member.companyName}</td>
           <td>${member.location}</td>
              <td>${member.industry}</td>
                <td>${member.website}</td>
         <td>
                <button
             style="text-align: center;background-color: yellow;border: none; padding: 5px 10px; ">Edit</button>
              <button
       style="text-align: center;background-color: red;border: none; padding: 5px 10px; color: white;">Delete</button>
        </td>
        </tr>
    `

        });
    }
}
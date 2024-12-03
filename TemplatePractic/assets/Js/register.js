import { baseUrl } from "./Api/baseUrl.js"
import { PostData, getAllDatas } from "./Api/request/request.js"

const regForm = document.querySelector(".regForm")
const regName = document.querySelector("#name")
const regEmail = document.querySelector("#email")
const regPasw = document.querySelector("#password")
const regImage = document.querySelector("#image")

 

regForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let imgFile = regImage.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(imgFile)
    reader.onload = async function () {
        let newUser = {
            name: regName.value,
            email: regEmail.value,
            password: regPasw.value,
            image: reader.result
        }
        let findUser;
       await getAllDatas(baseUrl.users)
            .then(res => {
                let userDatas = res.datas
                findUser = userDatas.find(({ email }) => email == regEmail.value)

            })
        if (!findUser) {
            PostData(baseUrl.users, newUser)
            .then(res => {
                console.log(res.datas);
            })
           
        }else{
            alert("Bu emaille qeydiyyatdan kecilmisdir!")
       
        }
       
    }
})
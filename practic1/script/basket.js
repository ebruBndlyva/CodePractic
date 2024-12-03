import baseUrl from "./Api/baseUrl.js";
import { getAllDatas, getDataId } from "./Api/request/product.js";

let basketsProducts = JSON.parse(localStorage.getItem("basketProducts")) || []

const basketCard = document.querySelector(".basket-cards")
const navBtn = document.querySelector(".user-info")
let favUserId = JSON.parse(localStorage.getItem("userId"))


function showBasket() {
    basketCard.innerHTML = ""
    getAllDatas(`${baseUrl}products`)

        .then(res => {
            let productArr = res.data

            basketsProducts.forEach(basket => {
                let findedProduct = productArr.find(produc => produc.id == basket.id)
                basketCard.innerHTML += `
                <div class="basket-card">
                    <div class="card-head">
                        <div class="card-img">
                            <img src="https://kontakt.az/media/catalog/product/cache/ec3348cd707f11bd7a951e83328510dc/t/m/tm-dg-sbp-1105-sm-1515-f3af0d4a.webp" alt="menu-img">
                         
                        </div>
                        <div class="card-desc">

                            <h3>${findedProduct.brand} </h3>
                            <p>${findedProduct.model} </p>
                            
                        </div>
                    </div>
                    <span class="basketPrice">${findedProduct.price} $</span>
                    <div class="quantityBtns">
                        <button class="dec" data-id="${findedProduct.id}"><i class="fa-solid fa-minus"></i></button>
                        <span class="count">${basket.count}</span>
                        <button class="inc" data-id="${findedProduct.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <button data-id="${findedProduct.id}" class="delBtn"><i class="fa-solid fa-x"></i></button>
                </div>
            `
                let incBtns = document.querySelectorAll(".inc")
                IncreaseBasketProduct(incBtns)
                let decBtns = document.querySelectorAll(".dec")
                DecreaseBasketProduct(decBtns)
                let delBtns = document.querySelectorAll(".delBtn")
                delBtns.forEach(delBtn => {
                    delBtn.addEventListener("click", function (e) {
                        e.preventDefault()
                        let delId = delBtn.getAttribute("data-id")
                        DeletedBasketProduct(delId)
                    })
                })

            });

        })
}
showBasket()

function IncreaseBasketProduct(IncBtns) {
    IncBtns.forEach(incBtn => {
        incBtn.addEventListener("click", function (e) {
            e.preventDefault()
            let incId = incBtn.getAttribute("data-id")
            let findproduct = basketsProducts.find(basket => basket.id == incId)
            findproduct.count++
            localStorage.setItem("basketProducts", JSON.stringify(basketsProducts))
            showBasket()
        })
    })

}
function DecreaseBasketProduct(decBtns) {
    decBtns.forEach(decBtn => {
        decBtn.addEventListener("click", function (e) {
            e.preventDefault()
            let decId = decBtn.getAttribute("data-id")
            let findproduct = basketsProducts.find(basket => basket.id == decId)
            if (findproduct.count > 1) {
                findproduct.count--
            } else {
                let index = basketsProducts.indexOf(findproduct)
                basketsProducts.splice(index, 1)
            }
            localStorage.setItem("basketProducts", JSON.stringify(basketsProducts))
            showBasket()
        })
    })

}
function DeletedBasketProduct(delId) {

    let findproduct = basketsProducts.find(basketProduct => basketProduct.id == delId)
    console.log(findproduct);
    let index = basketsProducts.indexOf(findproduct)
    basketsProducts.splice(index, 1)

    localStorage.setItem("basketProducts", JSON.stringify(basketsProducts))
    showBasket()

}
async function getAllUser() {
    if (!favUserId) {
        navBtn.innerHTML = `
    <a href="./login.html" class="btn mx-3 btn-primary">Login</a>
    <a href="./register.html" class="btn btn-secondary">Register</a>
`
        return
    }
    getDataId(`${baseUrl}users`, favUserId)
        .then(res => {
            navBtn.innerHTML = `
          <span class="username">${res.data.name}</span>
            <button class="logout-btn">Logout</button>
       `
            let out = document.querySelector(".logout-btn")
            out.addEventListener("click", function () {
                localStorage.removeItem("userId")
                window.location.reload()

            })

        })

}
getAllUser()
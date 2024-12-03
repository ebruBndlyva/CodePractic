import baseUrl from "./Api/baseUrl.js";
import { getAllDatas, getDataId, UpdateData } from "./Api/request/product.js";
let allPhone = []
const wrapper = document.querySelector(".products-container")
const searchInput = document.querySelector("#searchInput")
const sortForAny = document.querySelector("#sortForAny")
const navBtn = document.querySelector(".user-info")
const favIcon = document.querySelector(".fav")
const basketIcon = document.querySelector(".basket")
let baskets = JSON.parse(localStorage.getItem("basketProducts")) || []
let userID = JSON.parse(localStorage.getItem("userId"))


async function GetData() {
    let products = await getAllDatas(`${baseUrl}products`)
    allPhone = products.data
    showProducts(allPhone);
}
function showProducts(productList) {
    wrapper.innerHTML = ""
    productList.forEach(({ id, brand, model, price }) => {
        wrapper.innerHTML += `
         <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card my-3" data-id=${id}>
                        <img src="https://kontakt.az/media/catalog/product/cache/ec3348cd707f11bd7a951e83328510dc/t/m/tm-dg-sbp-1105-sm-1515-f3af0d4a.webp" class="card-img-top" alt="iphone">
                        <div class="card-body">
                          <h5 class="card-title">${brand} , ${model.slice(0, 7)}...</h5>
                          <p class="card-text">$${price}</p>
                          <div class="d-flex justify-content-center">
                            <button data-id = ${id} class="addToFavorites favorite-btn mx-2">
                            <i style="color:red;" class="fa-regular fa-heart"></i>
                            </button>
                            <button data-id = ${id} class="addToBasket cart-btn"><i class="fa-solid fa-cart-shopping"></i></button>
                          </div>
                        </div>
                      </div>
                </div> 
        `

        let cards = document.querySelectorAll(".card")
        cards.forEach(card => {
            card.addEventListener("click", function (e) {
                window.location = "./detail.html?id=" + card.dataset.id
            })
        })

        document.querySelectorAll(".addToFavorites").forEach(favBtn => {
            favBtn.addEventListener("click", function (e) {
                e.stopPropagation()
                if (!userID) {
                    alert("login olmadiginiz ucun wishliste elave ede bilmirsiniz")
                }
                let favId = favBtn.getAttribute("data-id")
                AddFavorites(favId, favBtn)

            })
        })
        document.querySelectorAll(".addToBasket").forEach((basketBtn) => {
            basketBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!userID) {
                    alert("login olmadiginiz ucun sebete elave ede bilmirsiniz")
                    return
                }
                let basketId = basketBtn.getAttribute("data-id")
                AddBaskets(basketId, basketBtn)

            })
        })



    });
}
async function AddFavorites(favId, favBtn) {
    let response = await getDataId(`${baseUrl}users`, userID);
    let favUsers = response.data;


    if (favUsers.favorites.includes(favId)) {

        let index = favUsers.favorites.indexOf(favId);
        favUsers.favorites.splice(index, 1);


        favBtn.innerHTML = `<i style="color:red;" class="fa-regular fa-heart"></i>`;
    } else {

        favUsers.favorites.push(favId);


        favBtn.innerHTML = `<i style="color:red;" class="fa-solid fa-heart"></i>`;
    }


    UpdateData(`${baseUrl}users`, userID, favUsers)



}
console.log(baskets);
async function AddBaskets(basketId, basketBtn) {
    let findedBasket = baskets.find(basketProduct => basketProduct.id == basketId)
    if (findedBasket) {
        findedBasket.count++
        basketBtn.style.color = "green"
        basketBtn.style.border = "1px solid green"
        basketBtn.style.backgroundColor = "white"
    } else {
        findedBasket = { id: basketId, count: 1 }

        baskets.push(findedBasket)
        basketBtn.style.color = "green"
        basketBtn.style.border = "1px solid green"
        basketBtn.style.backgroundColor = "white"


    }
   
    localStorage.setItem("basketProducts", JSON.stringify(baskets))



}
favIcon.addEventListener("click", function () {
    window.location = "./favorites.html"

})
basketIcon.addEventListener("click", function () {
    window.location = "./basket.html"

})

searchInput.addEventListener("input", function (e) {
    let filterData = allPhone.filter(({ model }) => model.toLowerCase().startsWith(e.target.value.trim().toLowerCase()))
    showProducts(filterData)
})
sortForAny.addEventListener("change", function (e) {
    let sortedData;
    switch (e.target.value) {
        case "alphabetically-asc":
            sortedData = allPhone.toSorted((a, b) => a.model.localeCompare(b.model))
            break;
        case "alphabetically-des":
            sortedData = allPhone.toSorted((a, b) => b.model.localeCompare(a.model))
            break;

        case "cheap-first":
            sortedData = allPhone.toSorted((a, b) => a.price - b.price)
            break;
        case "exp-first":
            sortedData = allPhone.toSorted((a, b) => b.price - a.price)
            break;
        default:
            sortedData = [...allPhone]
    }

    showProducts(sortedData)
})


GetData()


export async function getAllUser() {
    if (!userID) {
        navBtn.innerHTML = `
    <a href="./login.html" class="btn  btn-primary">Login</a>
    <a href="./register.html" class="btn btn-secondary">Register</a>
   
`
        return
    }
    getDataId(`${baseUrl}users`, userID)
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


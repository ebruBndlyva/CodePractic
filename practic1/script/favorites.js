import baseUrl from "./Api/baseUrl.js";
import { getAllDatas, getDataId } from "./Api/request/product.js";
// import { getAllUser } from "./main.js";
let allPhone = []

let favUserId = JSON.parse(localStorage.getItem("userId"))

const wrapper = document.querySelector(".products-container")
const navBtn = document.querySelector(".user-info")
async function GetProductId() {
    let response = await getDataId(`${baseUrl}users`, favUserId)
    let favUser = response.data
    let favs = favUser.favorites
   
    getAllDatas(`${baseUrl}products`)
        .then(res => {
            allPhone = res.data

            let filterFavProducts = allPhone.filter(product => {
                for (let fav of favs) {
                    if (product.id == fav) {
                        return product.id
                    }
                }
            })

            if (filterFavProducts.length > 0) {
                filterFavProducts.forEach(({ id, brand, model, price }) => {
                    wrapper.innerHTML += `
                    <div class="col-lg-3 col-md-6 col-sm-12">
                               <div class="card my-3" data-id=${id}>
                                   <img src="https://kontakt.az/media/catalog/product/cache/ec3348cd707f11bd7a951e83328510dc/t/m/tm-dg-sbp-1105-sm-1515-f3af0d4a.webp" class="card-img-top" alt="iphone">
                                   <div class="card-body">
                                     <h5 class="card-title">${brand} , ${model.slice(0, 7)}...</h5>
                                     <p class="card-text">$${price}</p>
                                     <div class="d-flex justify-content-end">
                                       <button data-id = ${id} class="addToFavorites favorite-btn mx-1">
                                       <i style="color:red;" class="fa-regular fa-heart"></i>
                                       </button>
                                       <button class="addToBasket cart-btn"><i class="fa-solid fa-cart-shopping"></i></button>
                                     </div>
                                   </div>
                                 </div>
                           </div> 
                   `
                })

            } else {
                wrapper.innerHTML = "Sizin wishlistiniz boshdur"
            }

        })
}
GetProductId()



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

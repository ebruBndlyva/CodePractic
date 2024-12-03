import baseUrl from "./Api/baseUrl.js"
import { getDataId } from "./Api/request/product.js"

let id = new URLSearchParams(window.location.search).get("id")
let wrapper = document.querySelector(".wrapper")
async function GetProduct() {
    let res = await getDataId(`${baseUrl}products`, id)
    console.log(res);
    let { brand, model, operatingSystem, year, price } = res.data

    wrapper.innerHTML = `
       <div class="col-md-6">
                <div class="card py-3" >
                    <img src="https://kontakt.az/media/catalog/product/cache/ec3348cd707f11bd7a951e83328510dc/t/m/tm-dg-sbp-1105-sm-1515-f3af0d4a.webp"
                        alt="">
                </div>
            </div>
            <div class="col-md-6 d-flex">
                <div class="card p-3 d-flex justify-content-between  w-100" ">
                    <div>

                        <h1>${brand}</h1>
                        <h2>Model : ${model}</h2>
                        <p>Əməliyyat sistemi : ${operatingSystem}</p>
                        <p>Buraxılış ili : ${year}</p>

                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <h1>$${price}</h1>
                        <div>
                           <button data-id = ${id} class="addToFavorites favorite-btn mx-1">
                            <i style="color:red;" class="fa-regular fa-heart"></i>
                            </button>
                            <button class="addToBasket cart-btn">Add to Basket <i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    `
}
GetProduct()
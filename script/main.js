import baseUrl from "./Api/baseurl.js";
import { getAllProducts } from "./Api/request/product.js";
let allPhone = []
const wrapper = document.querySelector(".wrapper")
const searchInput = document.querySelector("#searchInput")
const sortForAny = document.querySelector("#sortForAny")


async function GetData() {
    let products = await getAllProducts(baseUrl)
    allPhone = products.data
    showProducts(allPhone);
}


function showProducts(productList) {
    wrapper.innerHTML = ""
    productList.forEach(({ id, brand, model, price }) => {
        wrapper.innerHTML += `
         <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card" data-id=${id}>
                        <img src="https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11/iphone-11-white.jpg" class="card-img-top" alt="iphone">
                        <div class="card-body">
                          <h5 class="card-title">${brand} , ${model}</h5>
                          <p class="card-text">$${price}</p>
                          <div class="d-flex justify-content-end">
                            <button class="addToFavorites btn btn-danger mx-1"><i class="fa-regular fa-heart"></i></button>
                            <button class="addToBasket btn btn-warning"><i class="fa-solid fa-cart-shopping"></i></button>
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
            })
        })
        document.querySelectorAll(".addToBasket").forEach((basketBtn) => {
            basketBtn.addEventListener('click', (e) => {
                e.stopPropagation();


            })
        })
    });
}





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
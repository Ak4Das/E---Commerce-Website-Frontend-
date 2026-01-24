import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"
import SearchInPage from "../components/SearchInPage"
import { useState } from "react"

export default function NewArrival() {
  const [search, setSearch] = useState("")
  const { clothsData, setClothsData } = GetClothsData()
  const filteredProducts = clothsData.filter(
    (product) => product.newArrival === true,
  )

  const finalFilteredProducts = search
    ? filteredProducts.filter((product) =>
        product.commonCategory
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()),
      )
    : filteredProducts

  function addToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value),
    )
    product.addToCart = product.addToCart === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
    const btn = e.target
    btn.innerHTML = '<i className="bi bi-check2"></i>'
    btn.style.backgroundColor = "#05a058"
    btn.style.color = "white"
    setTimeout(() => {
      btn.innerHTML = "Added To Cart"
      btn.style.backgroundColor = ""
      btn.style.color = ""
    }, 1000)
  }

  function addToWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value),
    )
    product.addToWishList = product.addToWishList === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
    const btn = e.target
    btn.innerHTML = '<i className="bi bi-check2"></i>'
    btn.style.backgroundColor = "#05a058"
    btn.style.color = "white"
    setTimeout(() => {
      btn.innerHTML = "Added To Wishlist"
      btn.style.backgroundColor = ""
      btn.style.color = ""
    }, 1000)
  }

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
      />
      <SearchInPage margin="ms-3" setSearch={setSearch} />
      <main className="mx-5 my-3">
        <h2 className="my-3 text-secondary">New Arrival</h2>
        <div className="">
          <div className="row">
            {finalFilteredProducts.map((product) => (
              <div
                key={product.id}
                className="col-sm-6 col-xl-4 col-xxl-3 mb-3"
              >
                <Link
                  className="text-decoration-none"
                  to={`/productDetails/${product.id}`}
                >
                  <div className="card productCard">
                    <div className="productImageContainerNewArrivalPage">
                      <img
                        src={product.url}
                        className="img-fluid listProductImage"
                        style={{ height: "300px" }}
                        alt="productImage"
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between w-100">
                      <p id="name" className="my-0 lh-sm listProductName">
                        <span className="badge text-bg-success me-1">New</span>
                        {product.name.length > 61
                          ? product.name.slice(0, 60).concat("...")
                          : product.name}
                      </p>
                      <div>
                        <RatingBar rating={product.rating} />
                        <span
                          style={{ fontSize: "15px" }}
                          className="ms-1 rating-listingPage"
                        >
                          {product.rating}
                        </span>
                      </div>
                      <div>
                        <p className="discount my-0">
                          <b>₹</b>
                          {(
                            product.price -
                            (product.price *
                              Number(product.discount.replace("%", ""))) /
                              100
                          ).toFixed(1)}
                          (-{product.discount})
                        </p>
                        <small
                          id="M.R.P."
                          className="text-decoration-line-through"
                        >
                          M.R.P. ₹{product.price}
                        </small>
                      </div>
                      <div>
                        <button
                          value={product.id}
                          className="btn btn-secondary w-100 mb-1 addToCart"
                          onClick={addToCart}
                        >
                          {product.addToCart ? "Added To Cart" : "Add To cart"}
                        </button>
                        <button
                          value={product.id}
                          className="btn btn-outline-secondary w-100 saveToWishlist"
                          onClick={addToWishlist}
                        >
                          {product.addToWishList
                            ? "Added To Wishlist"
                            : "Save To Wishlist"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

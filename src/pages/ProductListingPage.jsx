import { useState } from "react"
import GetClothsData from "../components/GetClothsData"
import Header from "../components/Header"
import Offcanvas from "../components/Offcanvas"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"
import SearchInPage from "../components/SearchInPage"

export default function ProductListingPage() {
  const [search, setSearch] = useState("")
  console.log(search)
  const { category } = useParams()
  const { clothsData, setClothsData } = GetClothsData()
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)
  const [sortBy, setSortBy] = useState("")
  const [Category, setCategory] = useState("")

  function addToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value),
    )
    if (product.addToCart === false) {
      const user = JSON.parse(localStorage.getItem("user"))
      user.addToCartItems.push({ id: product.id })
      localStorage.setItem("user", JSON.stringify(user))

      product.addToCart = true
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
  }

  function addToWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value),
    )
    if (product.addToWishList === false) {
      const user = JSON.parse(localStorage.getItem("user"))
      user.addToWishlistItems.push({ id: product.id })
      localStorage.setItem("user", JSON.stringify(user))

      product.addToWishList = true
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
  }

  const filterByCategory = clothsData.filter(
    (data) => data.category === category,
  )

  const filterByPrice = filterByCategory.filter(
    (product) =>
      (
        (product.price * Number(product.discount.replace("%", ""))) /
        100
      ).toFixed(1) >= price,
  )

  const filterByRating = filterByPrice.filter(
    (product) => product.rating >= rating,
  )

  function discountedPrice(product) {
    return (
      (product.price * Number(product.discount.replace("%", ""))) /
      100
    ).toFixed(1)
  }

  function sortProducts() {
    if (sortBy !== "") {
      for (let i = 0; i < filterByRating.length; ) {
        for (let j = i + 1; j < filterByRating.length; j++) {
          if (sortBy === "lowToHigh") {
            if (
              Number(discountedPrice(filterByRating[i])) >
              Number(discountedPrice(filterByRating[j]))
            ) {
              const a = filterByRating[j]
              filterByRating[j] = filterByRating[i]
              filterByRating[i] = a
            }
          } else {
            if (
              Number(discountedPrice(filterByRating[j])) >
              Number(discountedPrice(filterByRating[i]))
            ) {
              const a = filterByRating[j]
              filterByRating[j] = filterByRating[i]
              filterByRating[i] = a
            }
          }
        }
        i++
      }
    }
    return filterByRating
  }

  const filterBySort = sortProducts()

  const finalFilter =
    Category === ""
      ? filterBySort
      : filterBySort.filter((product) => product.gender === Category)

  return (
    <>
      <Header position="sticky" top={0} zIndex={1} setSearch={setSearch} />
      <SearchInPage margin="ms-3" setSearch={setSearch} />
      <main className="d-flex">
        <Offcanvas
          setPrice={setPrice}
          setRating={setRating}
          setSortBy={setSortBy}
          setCategory={setCategory}
        />
        <div className="mx-5 my-3">
          <h4 className="my-3 text-secondary">Showing All Products</h4>
          <div className="row">
            {finalFilter.map((product) => (
              <div
                key={product.id}
                className="col-sm-6 col-xl-4 col-xxl-3 mb-3"
              >
                <Link
                  className="text-decoration-none"
                  to={`/productDetails/${product.id}`}
                >
                  <div className="card productCard">
                    <div className="ProductImageContainer">
                      <img
                        src={product.url}
                        className="img-fluid listProductImage"
                        style={{ height: "300px" }}
                        alt="productImage"
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between w-100">
                      <p
                        id="name"
                        className="my-0 lh-sm listProductName lh-base"
                      >
                        {!!Number(product.offer.replace("%", "")) && (
                          <span className="badge text-bg-warning me-1">
                            Diwali Offer
                          </span>
                        )}
                        {product.newArrival === true && (
                          <span className="badge text-bg-primary me-1">
                            New
                          </span>
                        )}
                        {product.freeDelivery && (
                          <span className="badge text-bg-success">
                            Free Deilvery
                          </span>
                        )}{" "}
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
                        <p id="discount" className="my-0">
                          <b>₹</b>
                          {Math.round(
                            (
                              product.price -
                              (product.price *
                                (Number(product.offer.replace("%", ""))
                                  ? Number(product.offer.replace("%", ""))
                                  : Number(
                                      product.discount.replace("%", ""),
                                    ))) /
                                100
                            ).toFixed(1),
                          )}
                          (-
                          {Number(product.offer.replace("%", ""))
                            ? product.offer
                            : product.discount}
                          )
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

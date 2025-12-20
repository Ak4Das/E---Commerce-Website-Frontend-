import { useState } from "react"
import GetClothsData from "../components/GetClothsData"
import Header from "../components/Header"
import Offcanvas from "../components/Offcanvas"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"

export default function ProductListingPage() {
  const { category } = useParams()
  const { clothsData, setClothsData } = GetClothsData()
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)
  const [sortBy, setSortBy] = useState("")
  const [Category, setCategory] = useState("")
  console.log(Category) //TODO
  function addToCart(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToCart = product.addToCart === false ? true : false
    // setClothsData(clothsData)
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  function addToWishlist(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToWishList = product.addToWishList === false ? true : false
    // setClothsData(clothsData)
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  const filterByCategory = clothsData.filter(
    (data) => data.category === category
  )

  const filterByPrice = filterByCategory.filter(
    (product) =>
      (
        (product.price * Number(product.discount.replace("%", ""))) /
        100
      ).toFixed(1) >= price
  )

  const filterByRating = filterByPrice.filter(
    (product) => product.rating >= rating
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

  return (
    <>
      <Header position="sticky" top={0} zIndex={1} />
      <main className="d-flex">
        <Offcanvas
          setPrice={setPrice}
          setRating={setRating}
          setSortBy={setSortBy}
          setCategory={setCategory}
        />
        <div className="mx-5 my-3">
          <form role="search" className="searchInApp">
            <input
              className="border border-0 p-2 bg-body-tertiary"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <h4 className="my-3">Showing All Products</h4>
          <div className="row">
            {filterBySort.map((product) => (
              <div key={product.id} className="col-sm-6 col-xl-4 col-xxl-3 mb-3">
                <Link
                  className="text-decoration-none"
                  to={`/productDetails/${product.id}`}
                >
                  <div className="card productCard">
                    <img
                      src={product.url}
                      className="img-fluid listProductImage"
                      style={{ height: "300px" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <p id="name" className="my-0 lh-sm listProductName">
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
                          {(
                            product.price -
                            (product.price *
                              Number(product.discount.replace("%", ""))) /
                              100
                          ).toFixed(1)}{" "}
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
                          className="btn btn-secondary w-100 mb-1"
                          onClick={addToCart}
                        >
                          Add to cart
                        </button>
                        <button
                          value={product.id}
                          className="btn btn-outline-secondary w-100 saveToWishlist"
                          onClick={addToWishlist}
                        >
                          Save to wishlist
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

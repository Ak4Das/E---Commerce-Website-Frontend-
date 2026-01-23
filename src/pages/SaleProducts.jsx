import { useState } from "react"
import GetClothsData from "../components/GetClothsData"
import Header from "../components/Header"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"
import SearchInPage from "../components/SearchInPage"

export default function SaleProducts() {
  const [search, setSearch] = useState("")
  console.log(search)
  const { commonCategory } = useParams()
  const { clothsData, setClothsData } = GetClothsData()
  const [gender, setGender] = useState("")

  const filteredProducts = clothsData.filter(
    (product) => product.commonCategory === commonCategory,
  )

  const productWithOffer = filteredProducts.filter((product) =>
    Number(product.offer.replace("%", "")),
  )

  const filteredByGender =
    gender === ""
      ? productWithOffer
      : productWithOffer.filter((product) => product.gender === gender)

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
    btn.innerHTML = '<i class="bi bi-check2"></i>'
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
    btn.innerHTML = '<i class="bi bi-check2"></i>'
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
      <Header position="sticky" top={0} zIndex={1} setSearch={setSearch} />
      <SearchInPage margin="ms-3" setSearch={setSearch} />
      <main>
        <div className="mx-5 my-3">
          <div className="d-flex justify-content-between saleProductFirstSection mb-3">
            <h4 className="my-3 text-secondary">
              Diwali offer on {commonCategory}
            </h4>
            <div className="" style={{ width: "160px" }}>
              <label
                htmlFor="gender"
                className="form-label me-2 fw-bold text-secondary"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="py-1 px-2 rounded fw-medium text-secondary"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="row">
            {filteredByGender.map((product) => (
              <div key={product.id} className="col-sm-6 col-xl-4 mb-3">
                <Link
                  className="text-decoration-none"
                  to={`/productDetails/${product.id}`}
                >
                  <div className="card productCard">
                    <div className="productImageContainerSaleProductPage">
                      <img
                        src={product.url}
                        className="img-fluid listProductImage"
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between w-100">
                      <p id="name" className="my-0 lh-sm listProductName">
                        <span className="badge text-bg-warning me-1">
                          Diwali Offer
                        </span>
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
                        <p id="offer" className="my-0">
                          <b>₹</b>
                          {(
                            product.price -
                            (product.price *
                              Number(product.offer.replace("%", ""))) /
                              100
                          ).toFixed(1)}{" "}
                          (-{product.offer})
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

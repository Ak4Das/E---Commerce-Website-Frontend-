import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import SearchInPage from "../components/SearchInPage"
import { useState } from "react"

export default function WishlistPage() {
  const { clothsData, setClothsData } = GetClothsData()
  const [search, setSearch] = useState("")

  const ProductsInCart =
    JSON.parse(localStorage.getItem("createOrder")).item.length &&
    JSON.parse(localStorage.getItem("createOrder")).item.filter(
      (product) => product.addToCart === true,
    )

  function moveToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value),
    )
    if (product.addToCart) {
      product.quantity = product.quantity ? product.quantity + 1 : 2
    } else {
      product.addToCart = true
    }
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
    const btn = e.target
    if (product.quantity) {
      btn.innerHTML = `quantity: ${product.quantity}`
      btn.style.backgroundColor = "#05a058"
      btn.style.color = "white"
    } else {
      btn.innerHTML = '<i class="bi bi-check2"></i>'
      btn.style.backgroundColor = "#05a058"
      btn.style.color = "white"
    }
    setTimeout(() => {
      btn.innerHTML = "Added To Cart"
      btn.style.backgroundColor = ""
      btn.style.color = ""
    }, 1000)
  }

  function removeFromWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value),
    )
    product.addToWishList = product.addToWishList === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))

    const Product =
      ProductsInCart &&
      ProductsInCart.find((product) => product.id === Number(e.target.value))

    if (Product) {
      Product.addToWishList = Product.addToWishList === false ? true : false
    }

    ProductsInCart &&
      localStorage.setItem(
        "createOrder",
        JSON.stringify({ item: ProductsInCart }),
      )
  }

  const wishlistProducts = clothsData.filter(
    (product) => product.addToWishList === true,
  )

  const finalWishlistProducts = wishlistProducts.filter((product) =>
    product.commonCategory
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()),
  )

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
      />
      <SearchInPage margin="ms-3" setSearch={setSearch} />
      <main className="bg-body-secondary pb-3">
        <div className="container">
          <h3 className="py-3 text-center">My Wishlist</h3>
          <div className="row row-gap-4">
            {finalWishlistProducts.map((product) => (
              <div
                key={product.id}
                className="col-sm-6 col-md-4 col-xl-3 col-xxl-3 cardContainer"
              >
                <Link
                  className="text-decoration-none"
                  to={`/productDetails/${product.id}`}
                >
                  <div className="card  border border-0">
                    <img
                      src={product.url}
                      alt="productImage"
                      className="img-fluid"
                      style={{ height: "300px" }}
                    />
                    <div className="card-body">
                      <p
                        className="text-center overflow-hidden"
                        style={{ height: "75px" }}
                      >
                        {product.newArrival === true && (
                          <span className="badge text-bg-success me-1">
                            New
                          </span>
                        )}
                        {!!Number(product.offer.replace("%", "")) && (
                          <span className="badge text-bg-warning me-1">
                            Diwali Offer
                          </span>
                        )}
                        {product.name.length > 61
                          ? product.name.slice(0, 60).concat("...")
                          : product.name}
                      </p>
                      <p className="text-center fw-bold">
                        <b>₹</b>
                        {Math.round(
                          product.price -
                            (product.price *
                              (Number(product.offer.replace("%", ""))
                                ? Number(product.offer.replace("%", ""))
                                : Number(product.discount.replace("%", "")))) /
                              100,
                        )}{" "}
                        (
                        {Number(product.offer.replace("%", ""))
                          ? product.offer
                          : product.discount}{" "}
                        off)
                      </p>
                      <button
                        className="btn btn-secondary w-100 my-2"
                        value={product.id}
                        onClick={moveToCart}
                      >
                        {product.addToCart ? "Added To Cart" : "Move To Cart"}
                      </button>
                      <button
                        className="btn btn-outline-secondary w-100 saveToWishlist"
                        value={product.id}
                        onClick={removeFromWishlist}
                      >
                        Remove From Wishlist
                      </button>
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

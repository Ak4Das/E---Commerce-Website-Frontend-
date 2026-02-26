import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"
import SearchInPage from "../components/SearchInPage"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function NewArrival() {
  const [search, setSearch] = useState("")
  const { clothsData, setClothsData } = GetClothsData()

  const isCloth =
    search !== ""
      ? clothsData.filter((cloth) => cloth.commonCategory.includes(search))
          .length
        ? true
        : false
      : false

  useEffect(() => {
    if (search !== "" && !isCloth) {
      toast("No such product available")
    }
  }, [search])

  /* isUpdate useState is used to if user add to cart a item or add to wishlist a item 
  then variables present on this page will reinitialize */
  const [isUpdate, setUpdate] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  const createOrder = JSON.parse(localStorage.getItem("createOrder"))

  // To fix clothsData for first render of this page
  const finalClothsData = clothsData.map((cloth) => {
    const isClothPresentInCart =
      user && user.addToCartItems.filter((item) => item.id === cloth.id)
    if (isClothPresentInCart && isClothPresentInCart.length) {
      cloth.addToCart = true
      cloth.quantity = isClothPresentInCart[0].quantity
        ? isClothPresentInCart[0].quantity
        : 1
      cloth.size = isClothPresentInCart[0].size
        ? isClothPresentInCart[0].size
        : ""
    }
    const isClothPresentInWishlist =
      user && user.addToWishlistItems.filter((item) => item.id === cloth.id)
    if (isClothPresentInWishlist && isClothPresentInWishlist.length) {
      cloth.addToWishList = true
    }
    return cloth
  })

  const filteredProducts = finalClothsData.filter(
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
    // To stop Event Bubbling
    e.preventDefault()
    e.stopPropagation()

    const isAddedToCart = user.addToCartItems.filter(
      (item) => item.id === Number(e.target.value),
    )
    if (!isAddedToCart.length) {
      // Update user in Database
      user.addToCartItems.push({
        id: Number(e.target.value),
        quantity: 1,
        size: "",
      })
      localStorage.setItem("user", JSON.stringify(user))

      // Update clothsData in memory
      const item = clothsData.find(
        (Product) => Product.id === Number(e.target.value),
      )
      if (item) {
        item.addToCart = true
        item.quantity = 1
        item.size = ""
      }

      // Update createOrder in Database
      const Product =
        createOrder &&
        createOrder.item.length &&
        createOrder.item.filter(
          (product) => product.id === Number(e.target.value),
        )
      if (Product && Product.length) {
        Product[0].addToCart = true
        Product[0].quantity = 1
        Product[0].size = ""
      }
      Product &&
        Product.length &&
        localStorage.setItem("createOrder", JSON.stringify(createOrder))

      // For interactivity
      const btn = e.target
      btn.innerHTML = "Added To Cart"
      btn.style.backgroundColor = "#05a058"
      btn.style.color = "white"
      setTimeout(() => {
        btn.innerHTML = "Added To Cart"
        btn.style.backgroundColor = ""
        btn.style.color = ""
      }, 1000)

      // To update the variables present in this page
      setUpdate(true)

      toast("Product added to cart😊")
    }
  }

  function addToWishlist(e) {
    // To stop Event Bubbling
    e.preventDefault()
    e.stopPropagation()

    const isAddedToWishlist = user.addToWishlistItems.find(
      (item) => item.id === Number(e.target.value),
    )
    if (!isAddedToWishlist) {
      // Update user in Database
      user.addToWishlistItems.push({ id: Number(e.target.value) })
      localStorage.setItem("user", JSON.stringify(user))

      // Update clothsData in memory
      const item = clothsData.find(
        (Product) => Product.id === Number(e.target.value),
      )
      if (item) {
        item.addToWishList = true
      }

      // Update createOrder in Database
      const Product =
        createOrder &&
        createOrder.item.length &&
        createOrder.item.filter(
          (product) => product.id === Number(e.target.value),
        )
      if (Product && Product.length) {
        Product[0].addToWishList = true
      }
      Product &&
        Product.length &&
        localStorage.setItem("createOrder", JSON.stringify(createOrder))

      // For interactivity
      const btn = e.target
      btn.innerHTML = '<i className="bi bi-check2"></i>'
      btn.style.backgroundColor = "#05a058"
      btn.style.color = "white"
      setTimeout(() => {
        btn.innerHTML = "Added To Wishlist"
        btn.style.backgroundColor = ""
        btn.style.color = ""
      }, 1000)

      // To update the variables present in this page
      setUpdate(true)

      toast("Product added to wishlist😊")
    }
  }

  if (isUpdate) {
    setUpdate(false)
  }

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
        placeHolder="Search Product"
      />
      <SearchInPage
        margin="ms-3"
        setSearch={setSearch}
        placeHolder="Search Product"
      />
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
                    <div className="ProductImageContainer">
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
                      <div className="d-flex align-items-end">
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
                        <div>
                          {!user ? (
                            <button
                              className="btn btn-secondary w-100 mb-1 addToCart"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                toast("Please login to your account")
                              }}
                            >
                              {product.addToCart
                                ? "Added To Cart"
                                : "Add To cart"}
                            </button>
                          ) : (
                            <button
                              value={product.id}
                              className="btn btn-secondary w-100 mb-1 addToCart"
                              onClick={addToCart}
                            >
                              {product.addToCart
                                ? "Added To Cart"
                                : "Add To cart"}
                            </button>
                          )}
                        </div>
                        <div>
                          {!user ? (
                            <button
                              className="btn btn-outline-secondary w-100 saveToWishlist"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                toast("Please login to your account")
                              }}
                            >
                              {product.addToWishList
                                ? "Added To Wishlist"
                                : "Save To Wishlist"}
                            </button>
                          ) : (
                            <button
                              value={product.id}
                              className="btn btn-outline-secondary w-100 saveToWishlist"
                              onClick={addToWishlist}
                            >
                              {product.addToWishList
                                ? "Added To Wishlist"
                                : "Save To Wishlist"}
                            </button>
                          )}
                        </div>
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

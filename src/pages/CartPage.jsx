import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import { useState } from "react"
import SearchInPage from "../components/SearchInPage"

export default function CartPage() {
  const [search, setSearch] = useState("")
  const [isUpdated, setUpdated] = useState(false)
  const { clothsData, setClothsData } = GetClothsData()
  const [isRemoveFromCart, setIsRemoveFromCart] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  const productsInCart =
    user &&
    user.addToCartItems.map((cartItem) => {
      const cloth = clothsData.find((item) => item.id === cartItem.id)
      cloth.addToCart = true
      cloth.quantity = cartItem.quantity
      cloth.size = cartItem.size
      return cloth
    })
  const idOfProductsInCart =
    productsInCart && productsInCart.map((product) => product.id)

  const createOrderInDatabase = JSON.parse(localStorage.getItem("createOrder"))
  const idOfCreateOrderInDatabase =
    createOrderInDatabase &&
    createOrderInDatabase.item.map((product) => product.id)

  /* The Following if statement Maintaining createOrder because entire logic written 
  below this if statement is only depend on createOrder data not on clothsData */
  if (!isRemoveFromCart) {
    if (
      createOrderInDatabase &&
      createOrderInDatabase.item &&
      createOrderInDatabase.item.length
    ) {
      let pass = true
      for (const id of idOfCreateOrderInDatabase) {
        if (idOfProductsInCart && idOfProductsInCart.includes(id)) {
          pass = true
        } else {
          pass = false
          break
        }
      }
      if (!pass) {
        localStorage.setItem(
          "createOrder",
          JSON.stringify({ item: productsInCart }),
        )
      }
      if (idOfProductsInCart && idOfCreateOrderInDatabase) {
        if (idOfProductsInCart.length !== idOfCreateOrderInDatabase.length) {
          localStorage.setItem(
            "createOrder",
            JSON.stringify({ item: productsInCart }),
          )
        }
      }
    } else {
      localStorage.setItem(
        "createOrder",
        JSON.stringify({ item: productsInCart }),
      )
    }
  }

  // Here i get createOrder directly from the database to get the updated data
  const ProductsInCart =
    JSON.parse(localStorage.getItem("createOrder")) &&
    JSON.parse(localStorage.getItem("createOrder")).item

  const FinalProductsInCart = search
    ? ProductsInCart.filter((product) =>
        product.commonCategory
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()),
      )
    : ProductsInCart

  function moveToWishlist(e) {
    // To stop Event Bubbling
    e.preventDefault()
    e.stopPropagation()

    const isAddedToWishlist = user.addToWishlistItems.filter(
      (item) => item.id === Number(e.target.value),
    )
    if (!isAddedToWishlist.length) {
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
        createOrderInDatabase &&
        createOrderInDatabase.item.length &&
        createOrderInDatabase.item.filter(
          (product) => product.id === Number(e.target.value),
        )
      if (Product && Product.length) {
        Product[0].addToWishList = true
      }
      Product &&
        Product.length &&
        localStorage.setItem(
          "createOrder",
          JSON.stringify(createOrderInDatabase),
        )

      // For interactivity
      const btn = e.target
      btn.innerHTML = '<i class="bi bi-check2"></i>'
      btn.style.backgroundColor = "#05a058"
      btn.style.color = "white"
      setTimeout(() => {
        btn.innerHTML = "Added To Wishlist"
        btn.style.backgroundColor = ""
        btn.style.color = ""
      }, 1000)

      // To update the variables present in this page
      setUpdated(true)
    }
  }

  if (isUpdated) {
    setIsRemoveFromCart(false)
    setUpdated(false)
  }

  const totalOrder =
    ProductsInCart &&
    ProductsInCart.reduce(
      (acc, curr) =>
        acc +
        (curr.price -
          (curr.price / 100) *
            (Number(curr.offer.replace("%", ""))
              ? Number(curr.offer.replace("%", ""))
              : Number(curr.discount.replace("%", "")))) *
          (curr.quantity ? curr.quantity : 1),
      0,
    )

  const deliveryCharge =
    ProductsInCart &&
    Math.round(
      ProductsInCart.reduce((acc, curr) => acc + curr.deliveryCharge, 0) /
        ProductsInCart.length,
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
          <h3 className="py-4 text-center">My Cart</h3>
          <div className="d-md-flex justify-content-between align-items-start cartContainer">
            <section className="productsInCurt">
              {!!ProductsInCart &&
                FinalProductsInCart.map((product) => {
                  return (
                    <div key={product.id} className="row mb-3">
                      <div className="col-sm-12 col-md-12 mb-3">
                        <Link
                          className="text-decoration-none"
                          to={`/productDetails/${product.id}`}
                        >
                          <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                            <img
                              src={product.url}
                              alt="productImage"
                              className="imageOnProductCurt"
                            />
                            <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-2">
                              <div>
                                <p className="lh-sm fs-5 fw-bold m-0 mb-2 productNameOnCartPage overflow-hidden">
                                  {product.name.length > 61
                                    ? product.name.slice(0, 60).concat("...")
                                    : product.name}
                                </p>
                                <div>
                                  <span className="fw-bold fs-5">
                                    ₹
                                    {Math.round(
                                      product.price -
                                        (product.price *
                                          (Number(
                                            product.offer.replace("%", ""),
                                          )
                                            ? Number(
                                                product.offer.replace("%", ""),
                                              )
                                            : Number(
                                                product.discount.replace(
                                                  "%",
                                                  "",
                                                ),
                                              ))) /
                                          100,
                                    )}
                                  </span>
                                  <span className="text-decoration-line-through ms-2">
                                    ₹{product.price}
                                  </span>
                                </div>
                                <p className="fw-bold fs-5 text-body-tertiary">
                                  {Number(product.offer.replace("%", ""))
                                    ? product.offer
                                    : product.discount}{" "}
                                  off
                                </p>
                                <div className="mb-2">
                                  <span className="fw-bold me-2 quantityText">
                                    Quantity:{" "}
                                  </span>
                                  <div className="quantityBtnContainer mb-3">
                                    <button
                                      className="rounded-circle border border-1"
                                      style={{ width: "30px", height: "30px" }}
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        let inputElementValue = Number(
                                          e.target.nextElementSibling.value,
                                        )
                                        if (inputElementValue > 1) {
                                          // Update the input element value
                                          e.target.nextElementSibling.value =
                                            --inputElementValue

                                          // Update createOrder in Database
                                          product.quantity = Number(
                                            e.target.nextElementSibling.value,
                                          )
                                          localStorage.setItem(
                                            "createOrder",
                                            JSON.stringify({
                                              item: ProductsInCart,
                                            }),
                                          )

                                          // Update user in Database
                                          const clothItem =
                                            user.addToCartItems.find(
                                              (item) => item.id === product.id,
                                            )
                                          clothItem.quantity = Number(
                                            e.target.nextElementSibling.value,
                                          )
                                          localStorage.setItem(
                                            "user",
                                            JSON.stringify(user),
                                          )

                                          // Update clothsData in memory
                                          const cloth = clothsData.find(
                                            (cloth) => cloth.id === product.id,
                                          )
                                          cloth.quantity = Number(
                                            e.target.nextElementSibling.value,
                                          )

                                          // To update the variables present in this page
                                          setUpdated(true)
                                        }
                                      }}
                                    >
                                      {" "}
                                      -{" "}
                                    </button>
                                    <input
                                      type="text"
                                      defaultValue={product.quantity || 1}
                                      style={{ width: "30px" }}
                                      className="mx-2"
                                      onChange={(e) => {
                                        if (Number(e.target.value) >= 0) {
                                          product.quantity = Number(
                                            e.target.value,
                                          )
                                          setUpdated(true)
                                        }
                                      }}
                                    />
                                    <button
                                      className="rounded-circle border border-1"
                                      style={{ width: "30px", height: "30px" }}
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update the input element value
                                        let inputElementValue = Number(
                                          e.target.previousElementSibling.value,
                                        )
                                        e.target.previousElementSibling.value =
                                          ++inputElementValue

                                        // Update createOrder in Database
                                        product.quantity = Number(
                                          e.target.previousElementSibling.value,
                                        )
                                        localStorage.setItem(
                                          "createOrder",
                                          JSON.stringify({
                                            item: ProductsInCart,
                                          }),
                                        )

                                        // Update user in Database
                                        const clothItem =
                                          user.addToCartItems.find(
                                            (item) => item.id === product.id,
                                          )
                                        clothItem.quantity = Number(
                                          e.target.previousElementSibling.value,
                                        )
                                        localStorage.setItem(
                                          "user",
                                          JSON.stringify(user),
                                        )

                                        // Update clothsData in memory
                                        const cloth = clothsData.find(
                                          (cloth) => cloth.id === product.id,
                                        )
                                        cloth.quantity = Number(
                                          e.target.previousElementSibling.value,
                                        )

                                        // To update the variables present in this page
                                        setUpdated(true)
                                      }}
                                    >
                                      {" "}
                                      +{" "}
                                    </button>
                                  </div>
                                </div>
                                <div className="mb-2">
                                  <span className="sizeText fw-bold me-1 me-xl-3">
                                    Size:{" "}
                                  </span>
                                  <div className="sizeBtnContainer">
                                    <button
                                      className="border border-1 me-2 mb-2"
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update createOrder in Database
                                        product.size = "S"
                                        localStorage.setItem(
                                          "createOrder",
                                          JSON.stringify({
                                            item: ProductsInCart,
                                          }),
                                        )

                                        // Update clothsData in memory
                                        const cloth = clothsData.find(
                                          (cloth) => cloth.id === product.id,
                                        )
                                        cloth.size = "S"

                                        // Update user in Database
                                        const clothItem =
                                          user.addToCartItems.find(
                                            (item) => item.id === product.id,
                                          )
                                        clothItem.size = "S"
                                        localStorage.setItem(
                                          "user",
                                          JSON.stringify(user),
                                        )

                                        // To update the variables present in this page
                                        setUpdated(true)

                                        // For interactivity
                                        const btn = e.target
                                        btn.innerHTML =
                                          '<i class="bi bi-check2"></i>'
                                        setTimeout(() => {
                                          btn.innerHTML = "S"
                                        }, 500)
                                      }}
                                    >
                                      S
                                    </button>
                                    <button
                                      className="border border-1 me-2 mb-2"
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update createOrder in Database
                                        product.size = "M"
                                        localStorage.setItem(
                                          "createOrder",
                                          JSON.stringify({
                                            item: ProductsInCart,
                                          }),
                                        )

                                        // Update clothsData in memory
                                        const cloth = clothsData.find(
                                          (cloth) => cloth.id === product.id,
                                        )
                                        cloth.size = "M"

                                        // Update user in Database
                                        const clothItem =
                                          user.addToCartItems.find(
                                            (item) => item.id === product.id,
                                          )
                                        clothItem.size = "M"
                                        localStorage.setItem(
                                          "user",
                                          JSON.stringify(user),
                                        )

                                        // To update the variables present in this page
                                        setUpdated(true)

                                        // For interactivity
                                        const btn = e.target
                                        btn.innerHTML =
                                          '<i class="bi bi-check2"></i>'
                                        setTimeout(() => {
                                          btn.innerHTML = "M"
                                        }, 500)
                                      }}
                                    >
                                      M
                                    </button>
                                    <button
                                      className="border border-1 me-2 mb-2"
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update createOrder in Database
                                        product.size = "L"
                                        localStorage.setItem(
                                          "createOrder",
                                          JSON.stringify({
                                            item: ProductsInCart,
                                          }),
                                        )

                                        // Update clothsData in memory
                                        const cloth = clothsData.find(
                                          (cloth) => cloth.id === product.id,
                                        )
                                        cloth.size = "L"

                                        // Update user in Database
                                        const clothItem =
                                          user.addToCartItems.find(
                                            (item) => item.id === product.id,
                                          )
                                        clothItem.size = "L"
                                        localStorage.setItem(
                                          "user",
                                          JSON.stringify(user),
                                        )

                                        // To update the variables present in this page
                                        setUpdated(true)

                                        // For interactivity
                                        const btn = e.target
                                        btn.innerHTML =
                                          '<i class="bi bi-check2"></i>'
                                        setTimeout(() => {
                                          btn.innerHTML = "L"
                                        }, 500)
                                      }}
                                    >
                                      L
                                    </button>
                                    <button
                                      className="border border-1 me-2 mb-2"
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update createOrder in Database
                                        product.size = "XL"
                                        localStorage.setItem(
                                          "createOrder",
                                          JSON.stringify({
                                            item: ProductsInCart,
                                          }),
                                        )

                                        // Update clothsData in memory
                                        const cloth = clothsData.find(
                                          (cloth) => cloth.id === product.id,
                                        )
                                        cloth.size = "XL"

                                        // Update user in Database
                                        const clothItem =
                                          user.addToCartItems.find(
                                            (item) => item.id === product.id,
                                          )
                                        clothItem.size = "XL"
                                        localStorage.setItem(
                                          "user",
                                          JSON.stringify(user),
                                        )

                                        // To update the variables present in this page
                                        setUpdated(true)

                                        // For interactivity
                                        const btn = e.target
                                        btn.innerHTML =
                                          '<i class="bi bi-check2"></i>'
                                        setTimeout(() => {
                                          btn.innerHTML = "XL"
                                        }, 500)
                                      }}
                                    >
                                      XL
                                    </button>
                                    <button
                                      className="border border-1 mb-2"
                                      onClick={(e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update createOrder in Database
                                        product.size = "XXL"
                                        localStorage.setItem(
                                          "createOrder",
                                          JSON.stringify({
                                            item: ProductsInCart,
                                          }),
                                        )

                                        // Update clothsData in memory
                                        const cloth = clothsData.find(
                                          (cloth) => cloth.id === product.id,
                                        )
                                        cloth.size = "XXL"

                                        // Update user in Database
                                        const clothItem =
                                          user.addToCartItems.find(
                                            (item) => item.id === product.id,
                                          )
                                        clothItem.size = "XXL"
                                        localStorage.setItem(
                                          "user",
                                          JSON.stringify(user),
                                        )

                                        // To update the variables present in this page
                                        setUpdated(true)

                                        // For interactivity
                                        const btn = e.target
                                        btn.innerHTML =
                                          '<i class="bi bi-check2"></i>'
                                        setTimeout(() => {
                                          btn.innerHTML = "XXL"
                                        }, 500)
                                      }}
                                    >
                                      XXL
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <button
                                  className="btn btn-secondary w-100 my-2"
                                  value={product.id}
                                  onClick={(e) => {
                                    // To stop Event Bubbling
                                    e.preventDefault()
                                    e.stopPropagation()

                                    // Update clothsData in memory
                                    const item = clothsData.find(
                                      (Product) => Product.id === product.id,
                                    )
                                    if (item) {
                                      item.addToCart = false
                                      delete item.quantity
                                      delete item.size
                                    }

                                    // Update user in Database
                                    const user = JSON.parse(
                                      localStorage.getItem("user"),
                                    )
                                    const remainingCartItems =
                                      user.addToCartItems.filter(
                                        (item) => item.id !== product.id,
                                      )
                                    user.addToCartItems = remainingCartItems
                                    localStorage.setItem(
                                      "user",
                                      JSON.stringify(user),
                                    )

                                    setIsRemoveFromCart(true)
                                    setUpdated(true)
                                  }}
                                >
                                  Remove From Cart
                                </button>
                                <button
                                  className="btn btn-outline-secondary w-100"
                                  value={product.id}
                                  onClick={moveToWishlist}
                                >
                                  {product.addToWishList
                                    ? "Added To Wishlist"
                                    : "Move To Wishlist"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                })}
            </section>
            <section className="bg-light px-5 py-4 totalBill">
              <h3>Price Details</h3>
              <hr />
              <div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Price</p>
                  <p className="d-inline-block w-50 text-end m-0">
                    ₹{Math.round(totalOrder)}
                  </p>
                </div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Delivery Charges</p>
                  <p className="d-inline-block w-50 text-end m-0">
                    ₹{deliveryCharge ? Math.round(deliveryCharge) : 0}
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <p className="d-inline-block w-50 m-0">Total Amount</p>
                <p className="d-inline-block w-50 text-end m-0">
                  ₹
                  {totalOrder && deliveryCharge
                    ? Math.round(totalOrder + deliveryCharge)
                    : 0}
                </p>
              </div>
              <br />
              {!user && (
                <button
                  className="btn btn-primary w-100 my-2"
                  onClick={() => alert("Please login to your account")}
                >
                  Place Order
                </button>
              )}
              {user && !user.address.length && (
                <button
                  className="btn btn-primary w-100 my-2"
                  onClick={() => alert("Please add your address")}
                >
                  Place Order
                </button>
              )}
              {user && user.address.length !== 0 && (
                <div>
                  {ProductsInCart &&
                  JSON.parse(localStorage.getItem("createOrder")).item.filter(
                    (product) => product.size,
                  ).length ===
                    JSON.parse(localStorage.getItem("createOrder")).item
                      .length ? (
                    <Link
                      to="/paymentMethods"
                      className="btn btn-primary w-100"
                    >
                      Place Order
                    </Link>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() =>
                        ProductsInCart
                          ? alert(
                              "Please select size of all the products present in the cart",
                            )
                          : alert("There is no item in cart")
                      }
                    >
                      Place Order
                    </button>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function CartPage() {
  const [isUpdated, setUpdated] = useState(false)
  const { clothsData, setClothsData } = GetClothsData()

  const productsInCart = clothsData.filter(
    (product) => product.addToCart === true
  )
  const idOfProductsInCart = productsInCart.map((product) => product.id)
  const createOrderInDatabase = JSON.parse(localStorage.getItem("createOrder"))
  if (
    createOrderInDatabase &&
    JSON.parse(localStorage.getItem("createOrder")).item.length
  ) {
    const idOfCreateOrderInDatabase = createOrderInDatabase.item.map(
      (product) => product.id
    )
    if (idOfProductsInCart.length !== idOfCreateOrderInDatabase.length) {
      localStorage.setItem(
        "createOrder",
        JSON.stringify({ item: productsInCart })
      )
    }
  } else {
    localStorage.setItem(
      "createOrder",
      JSON.stringify({ item: productsInCart })
    )
  }

  function moveToWishlist(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToWishList = product.addToWishList === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  const ProductsInCart =
    JSON.parse(localStorage.getItem("createOrder")).item.length &&
    JSON.parse(localStorage.getItem("createOrder")).item.filter(
      (product) => product.addToCart === true
    )

  function newProduct(product) {
    product.quantity = 1
    return product
  }

  const isQuantityPresent =
    ProductsInCart && ProductsInCart.filter((product) => product.quantity)

  if (!isUpdated) {
    if (ProductsInCart.length) {
      if (ProductsInCart.length !== isQuantityPresent.length) {
        const finalProductsInCart = ProductsInCart.map((product) =>
          product.quantity ? product : newProduct(product)
        )
        const createOrder = { item: finalProductsInCart }
        localStorage.setItem("createOrder", JSON.stringify(createOrder))
      }
    }
  } else {
    setUpdated(false)
  }

  const totalOrder =
    ProductsInCart &&
    ProductsInCart.reduce(
      (acc, curr) =>
        acc +
        curr.price -
        (curr.price / 100) *
          (Number(curr.offer.replace("%", ""))
            ? Number(curr.offer.replace("%", ""))
            : Number(curr.discount.replace("%", ""))),
      0
    )

  const deliveryCharge =
    ProductsInCart &&
    Math.round(
      ProductsInCart.reduce((acc, curr) => acc + curr.deliveryCharge, 0) /
        ProductsInCart.length
    )

  return (
    <>
      <Header />{" "}
      <main className="bg-body-secondary pb-3">
        <div className="container">
          <h3 className="py-4 text-center">My Cart</h3>
          <div className="d-md-flex justify-content-between align-items-start cartContainer">
            <section className="productsInCurt">
              {!!ProductsInCart &&
                ProductsInCart.map((product) => {
                  return (
                    <div key={product.id} className="row mb-3">
                      <div className="col-sm-12 col-md-12 mb-3">
                        <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                          <img
                            src={product.url}
                            alt=""
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
                                        (Number(product.offer.replace("%", ""))
                                          ? Number(
                                              product.offer.replace("%", "")
                                            )
                                          : Number(
                                              product.discount.replace("%", "")
                                            ))) /
                                        100
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
                              <div className="mb-3">
                                <span className="fw-bold me-2">Quantity: </span>
                                <button
                                  className="rounded-circle border border-1"
                                  style={{ width: "30px", height: "30px" }}
                                  onClick={(e) => {
                                    let inputElementValue = Number(
                                      e.target.nextElementSibling.value
                                    )
                                    if (inputElementValue > 1) {
                                      e.target.nextElementSibling.value =
                                        --inputElementValue
                                      product.quantity = Number(
                                        e.target.nextElementSibling.value
                                      )
                                      localStorage.setItem(
                                        "createOrder",
                                        JSON.stringify({ item: ProductsInCart })
                                      )
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
                                      product.quantity = Number(e.target.value)
                                      setUpdated(true)
                                    }
                                  }}
                                />
                                <button
                                  className="rounded-circle border border-1"
                                  style={{ width: "30px", height: "30px" }}
                                  onClick={(e) => {
                                    let inputElementValue = Number(
                                      e.target.previousElementSibling.value
                                    )
                                    e.target.previousElementSibling.value =
                                      ++inputElementValue
                                    product.quantity = Number(
                                      e.target.previousElementSibling.value
                                    )
                                    localStorage.setItem(
                                      "createOrder",
                                      JSON.stringify({ item: ProductsInCart })
                                    )
                                    setUpdated(true)
                                  }}
                                >
                                  {" "}
                                  +{" "}
                                </button>
                              </div>
                              <div className="mb-3">
                                <span className="fw-bold me-0">Size: </span>
                                <button
                                  className="border border-1 me-2"
                                  onClick={() => {
                                    product.size = "S"
                                    localStorage.setItem(
                                      "createOrder",
                                      JSON.stringify({ item: ProductsInCart })
                                    )
                                    setUpdated(true)
                                  }}
                                >
                                  S
                                </button>
                                <button
                                  className="border border-1 me-2"
                                  onClick={() => {
                                    product.size = "M"
                                    localStorage.setItem(
                                      "createOrder",
                                      JSON.stringify({ item: ProductsInCart })
                                    )
                                    setUpdated(true)
                                  }}
                                >
                                  M
                                </button>
                                <button
                                  className="border border-1 me-2"
                                  onClick={() => {
                                    product.size = "L"
                                    localStorage.setItem(
                                      "createOrder",
                                      JSON.stringify({ item: ProductsInCart })
                                    )
                                    setUpdated(true)
                                  }}
                                >
                                  L
                                </button>
                                <button
                                  className="border border-1 me-2"
                                  onClick={() => {
                                    product.size = "XL"
                                    localStorage.setItem(
                                      "createOrder",
                                      JSON.stringify({ item: ProductsInCart })
                                    )
                                    setUpdated(true)
                                  }}
                                >
                                  XL
                                </button>
                                <button
                                  className="border border-1"
                                  onClick={() => {
                                    product.size = "XXL"
                                    localStorage.setItem(
                                      "createOrder",
                                      JSON.stringify({ item: ProductsInCart })
                                    )
                                    setUpdated(true)
                                  }}
                                >
                                  XXL
                                </button>
                              </div>
                            </div>
                            <div>
                              <button
                                className="btn btn-secondary w-100 my-2"
                                value={product.id}
                                onClick={() => {
                                  const item = clothsData.find(
                                    (Product) => Product.id === product.id
                                  )
                                  item.addToCart =
                                    item.addToCart === false ? true : false
                                  product.addToCart =
                                    product.addToCart === false ? true : false
                                  localStorage.setItem(
                                    "createOrder",
                                    JSON.stringify({ item: ProductsInCart })
                                  )
                                  localStorage.setItem(
                                    "clothsData",
                                    JSON.stringify(clothsData)
                                  )
                                  setClothsData(
                                    JSON.parse(
                                      localStorage.getItem("clothsData")
                                    )
                                  )
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
                                Move To Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
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
                    ₹{Math.round(deliveryCharge)}
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <p className="d-inline-block w-50 m-0">Total Amount</p>
                <p className="d-inline-block w-50 text-end m-0">
                  ₹{Math.round(totalOrder + deliveryCharge)}
                </p>
              </div>
              <br />
              {ProductsInCart &&
              JSON.parse(localStorage.getItem("createOrder")).item.filter(
                (product) => product.size
              ).length ===
                JSON.parse(localStorage.getItem("createOrder")).item.length ? (
                <Link to="/paymentMethods" className="btn btn-primary w-100">
                  Place Order
                </Link>
              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    ProductsInCart
                      ? alert(
                          "Please select size of all the products present in the cart"
                        )
                      : alert("There is no item in cart")
                  }
                >
                  Place Order
                </button>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

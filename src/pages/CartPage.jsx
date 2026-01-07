import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function CartPage() {
  const [isUpdated, setUpdated] = useState(false)
  const { clothsData, setClothsData } = GetClothsData()

  function removeFromCart(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToCart = product.addToCart === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  function moveToWishlist(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToWishList = product.addToWishList === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  const productsInCart = clothsData.filter(
    (product) => product.addToCart === true
  )

  const createOrderInDatabase = JSON.parse(localStorage.getItem("createOrder"))
  if (!createOrderInDatabase) {
    const createOrder = { item: [] }
    localStorage.setItem("createOrder", JSON.stringify(createOrder))
  }

  function newProduct(product) {
    product.quantity = 1
    return product
  }

  if (isUpdated) {
    const finalProductsInCart = productsInCart.map((product) =>
      product.quantity ? product : newProduct(product)
    )
    const createOrder = { item: finalProductsInCart }
    localStorage.setItem("createOrder", JSON.stringify(createOrder))
    setUpdated(false)
  }

  const totalOrder = productsInCart.reduce(
    (acc, curr) =>
      acc +
      curr.price -
      (curr.price / 100) * Number(curr.discount.replace("%", "")),
    0
  )

  const deliveryCharge = Math.round(
    productsInCart.reduce((acc, curr) => acc + curr.deliveryCharge, 0) /
      productsInCart.length
  )

  return (
    <>
      <Header />{" "}
      <main className="bg-body-secondary pb-3">
        <div className="container">
          <h3 className="py-4 text-center">My Cart</h3>
          <div className="d-md-flex justify-content-between align-items-start cartContainer">
            <section className="productsInCurt">
              {productsInCart.map((product) => {
                return (
                  <div key={product.id} className="row mb-3">
                    <div className="col-sm-12 col-md-12 mb-3">
                      <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                        <img
                          src={product.url}
                          alt=""
                          className="imageOnProductCurt"
                        />
                        <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                          <div>
                            <p className="lh-sm fs-5 fw-bold m-0 mb-2">
                              {product.name.length > 61
                                ? product.name.slice(0, 60).concat("...")
                                : product.name}
                            </p>
                            <div>
                              <span className="fw-bold fs-5">
                                ₹
                                {(
                                  product.price -
                                  (product.price *
                                    Number(product.discount.replace("%", ""))) /
                                    100
                                ).toFixed(1)}
                              </span>
                              <span className="text-decoration-line-through ms-2">
                                ₹{product.price}
                              </span>
                            </div>
                            <p className="fw-bold fs-5 text-body-tertiary">
                              {product.discount} off
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
                                    setUpdated(true)
                                  }
                                }}
                              >
                                {" "}
                                -{" "}
                              </button>
                              <input
                                type="text"
                                defaultValue="1"
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
                                  setUpdated(true)
                                }}
                              >
                                S
                              </button>
                              <button
                                className="border border-1 me-2"
                                onClick={() => {
                                  product.size = "M"
                                  setUpdated(true)
                                }}
                              >
                                M
                              </button>
                              <button
                                className="border border-1 me-2"
                                onClick={() => {
                                  product.size = "L"
                                  setUpdated(true)
                                }}
                              >
                                L
                              </button>
                              <button
                                className="border border-1 me-2"
                                onClick={() => {
                                  product.size = "XL"
                                  setUpdated(true)
                                }}
                              >
                                XL
                              </button>
                              <button
                                className="border border-1"
                                onClick={() => {
                                  product.size = "XXL"
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
                              onClick={removeFromCart}
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
              {productsInCart.filter((product) => product.size).length ===
                productsInCart.length &&
              JSON.parse(localStorage.getItem("createOrder")).item.length !==
                0 ? (
                <Link to="/paymentMethods" className="btn btn-primary w-100">
                  Place Order
                </Link>
              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    alert(
                      "Please select size of all the products present in the cart"
                    )
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

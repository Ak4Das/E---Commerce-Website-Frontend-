import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"

export default function CartPage() {
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

  return (
    <>
      <Header />{" "}
      <main className="bg-body-secondary pb-3">
        <div className="container">
          <h3 className="py-4 text-center">My Cart</h3>
          <div className="d-md-flex d-inline-block justify-content-between align-items-start cartContainer">
            <section className="productsInCurt">
              {productsInCart.map((product) => {
                return (
                  <div className="row mb-3">
                    <div className="col-sm-6 col-md-12 mb-3">
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
                              >
                                {" "}
                                -{" "}
                              </button>
                              <input
                                type="text"
                                value="1"
                                style={{ width: "30px" }}
                                className="mx-2"
                              />
                              <button
                                className="rounded-circle border border-1"
                                style={{ width: "30px", height: "30px" }}
                              >
                                {" "}
                                +{" "}
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
                  <p className="d-inline-block w-50 text-end m-0">₹3000</p>
                </div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Discount</p>
                  <p className="d-inline-block w-50 text-end m-0">- ₹1000</p>
                </div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Delivery Charges</p>
                  <p className="d-inline-block w-50 text-end m-0">₹30</p>
                </div>
              </div>
              <hr />
              <div>
                <p className="d-inline-block w-50 m-0">Total Amount</p>
                <p className="d-inline-block w-50 text-end m-0">₹2030</p>
              </div>
              <hr />
              <p className="my-3">We will save ₹1000 on this order</p>
              <Link to="/paymentMethods/cart" className="btn btn-primary w-100">Place Order</Link>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

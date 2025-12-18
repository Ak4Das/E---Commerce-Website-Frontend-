import Header from "./Header"
import { Link, useParams } from "react-router-dom"
import Plus from "../assets/plus.png"
import Card from "../assets/card.png"
import { useState } from "react"
import Cross from "../assets/cross.png"
import RatingBar from "./RatingBar"

export default function PaymentMethods({ cart }) {
  console.log(cart)
  const id = Number(useParams().id)
  const address = JSON.parse(localStorage.getItem("user")).address.find(
    (address) => address.selected
  )
  const [isCard, setIsCard] = useState(false)
  const [isNetBanking, setIsNetBanking] = useState(false)
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false)
  const [isVisible, setVisible] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders"))
  )
  console.log(orders)
  const [isPaymentMethodSelected, selectPaymentMethod] = useState(false)

  const products = JSON.parse(localStorage.getItem("clothsData")).filter(
    (product) => (cart ? product.addToCart === true : product.id === id)
  )
  console.log(products)

  function placeOrder() {
    localStorage.setItem("orders", JSON.stringify(orders))
    setOrders(JSON.parse(localStorage.getItem("orders")))
  }

  const totalOrder = products.reduce((acc, curr) => acc + curr.price, 0)
  console.log(totalOrder);

  return (
    <>
      <Header />
      <main className="container mt-3 mb-5 d-lg-flex gap-5 align-items-start">
        <div className="paymentMethodSectionOne">
          <section className="bg-light p-3 d-flex gap-5 justify-content-between">
            <div>
              <h5>Delivering to {address.fullName}</h5>
              <p className="fw-medium">
                {address.localInfo}, {address.area},{" "}
                {address.city.toUpperCase()}
                {", "}
                {address.state.toUpperCase()}, {address.pinCode},{" "}
                {address.country}
              </p>
            </div>
            <Link to="/userAddress" className="text-decoration-none fw-medium">
              Change
            </Link>
          </section>
          {isPaymentMethodSelected && (
            <section className="bg-light p-3 d-flex gap-5 justify-content-between mt-3">
              <div>
                <h5>Pay on delivery (cash/card)</h5>
                <p className="fw-medium">
                  Use a gift card, voucher or promo code
                </p>
              </div>
              <Link
                to="/paymentMethods"
                className="text-decoration-none fw-medium"
              >
                Change
              </Link>
            </section>
          )}
          {isPaymentMethodSelected && (
            <section>
              <h3 className="mt-4">Products List</h3>
              {products.map((product) => (
                <div key={product.id} className="bg-light px-4 py-3 mt-3">
                  <h5 className="mb-3 fw-bold">Arriving 25 Dec 2025</h5>
                  <div className="d-flex gap-4" style={{ width: "500px" }}>
                    <img src={product.url} alt="" style={{ width: "125px" }} />
                    <div>
                      <p className="fw-medium my-0">{product.name}</p>
                      <RatingBar rating={product.rating} />
                      <span className="ms-1 fw-medium">{product.rating}</span>
                      <div className="mt-2">
                        <span className="mt-2 fw-medium">₹{product.price}</span>
                        <span className="ms-2 fw-medium">
                          (-{product.discount})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
          {!isPaymentMethodSelected && (
            <section>
              <div className="mt-4">
                <h3>Payment Method</h3>
                <div className="bg-light p-3">
                  <div
                    className="d-flex gap-3 align-items-start p-2 rounded"
                    style={{
                      backgroundColor: `${isCard ? "#FCF5EE" : "#F8F9FA"}`,
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Credit or debit card"
                      className="mt-1"
                      onClick={(e) => {
                        setPaymentMethod(e.target.value)
                        setIsCard(true)
                        setIsNetBanking(false)
                        setIsCashOnDelivery(false)
                        setVisible(true)
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <div>
                      <label className="fw-medium mb-2">
                        Credit or debit card
                      </label>
                      <br />
                      <div className="d-flex">
                        <img
                          src="https://tse3.mm.bing.net/th/id/OIP.VxB3xx5PMyI8JoGlcWNkHAHaGE?pid=Api&P=0&h=180"
                          alt="master card"
                          className="img-fluid me-2 cardImage"
                          style={{ width: "60px" }}
                        />
                        <img
                          src="https://tse2.mm.bing.net/th/id/OIP.Y6-wJg-HiIJqiI8nok881AHaFr?pid=Api&P=0&h=180"
                          alt="visa"
                          className="img-fluid me-2 cardImage"
                          style={{ width: "60px" }}
                        />
                        <img
                          src="https://tse4.mm.bing.net/th/id/OIP.Irq5hFtZ2RWq4_WZa__XZwHaHa?pid=Api&P=0&h=180"
                          alt="rupay"
                          className="img-fluid me-2 cardImage"
                          style={{ width: "50px" }}
                        />
                        <img
                          src="https://tse2.mm.bing.net/th/id/OIP.q5UpjKh-KMHUQUEtd09BJQHaHa?pid=Api&P=0&h=180"
                          alt="maestro"
                          className="img-fluid me-2 maestroCard cardImage"
                          style={{ width: "50px" }}
                        />
                        <img
                          src="https://tse1.mm.bing.net/th/id/OIP.rNamf0fxtSx4i_wPGdjb2wHaHa?pid=Api&P=0&h=180"
                          alt="American Express"
                          className="img-fluid me-2 cardImage"
                          style={{ width: "50px" }}
                        />
                      </div>
                      <div style={{ display: `${isVisible ? "" : "none"}` }}>
                        <div className="d-flex align-items-start gap-3 mt-2">
                          <Link
                            className="addCardBtn"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={Plus}
                              alt=""
                              className="img-fluid bg-white p-1"
                              style={{ width: "20px" }}
                              onClick={() =>
                                setShowCard(showCard ? false : true)
                              }
                            />
                          </Link>
                          <img
                            src={Card}
                            alt=""
                            style={{ width: "30px", cursor: "pointer" }}
                            className="AtmCardImg"
                            onClick={() => setShowCard(showCard ? false : true)}
                          />
                          <Link
                            className="text-decoration-none fw-medium AddCardLink"
                            onClick={() => setShowCard(showCard ? false : true)}
                            style={{ cursor: "pointer" }}
                          >
                            Add a new credit or debit card
                          </Link>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "700px",
                          display: `${showCard ? "" : "none"}`,
                          boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.4)",
                        }}
                        className="card rounded position-absolute top-50 start-50 AtmCardDetailsForm"
                      >
                        <div className="bg-light d-flex justify-content-between align-items-center p-3">
                          <h5>Add a new credit or debit card</h5>
                          <img
                            src={Cross}
                            alt=""
                            className="img-fluid"
                            style={{ width: "15px", cursor: "pointer" }}
                            onClick={() => setShowCard(showCard ? false : true)}
                          />
                        </div>
                        <div className="bg-white p-3 d-flex justify-content-between">
                          <div className="w-50">
                            <label htmlFor="" className="fw-medium">
                              Card number
                            </label>
                            <input type="text" className="ms-2 rounded" />
                            <br />
                            <br />
                            <label htmlFor="" className="fw-medium">
                              Nickname
                            </label>
                            <input type="text" className="ms-2 rounded" />
                            <br />
                            <br />
                            <label htmlFor="" className="fw-medium">
                              Expiry date
                            </label>
                            <input type="date" className="ms-2 rounded" />
                          </div>
                          <div
                            className="w-50 ps-3"
                            style={{ borderLeft: "1px solid black" }}
                          >
                            <p>
                              Please ensure that you enable your card for online
                              payments from your bank’s app.
                            </p>
                            <div className="d-flex">
                              <img
                                src="https://tse3.mm.bing.net/th/id/OIP.VxB3xx5PMyI8JoGlcWNkHAHaGE?pid=Api&P=0&h=180"
                                alt="master card"
                                className="img-fluid me-2 cardImage"
                                style={{ width: "60px" }}
                              />
                              <img
                                src="https://tse2.mm.bing.net/th/id/OIP.Y6-wJg-HiIJqiI8nok881AHaFr?pid=Api&P=0&h=180"
                                alt="visa"
                                className="img-fluid me-2 cardImage"
                                style={{ width: "60px" }}
                              />
                              <img
                                src="https://tse4.mm.bing.net/th/id/OIP.Irq5hFtZ2RWq4_WZa__XZwHaHa?pid=Api&P=0&h=180"
                                alt="rupay"
                                className="img-fluid me-2 cardImage"
                                style={{ width: "50px" }}
                              />
                              <img
                                src="https://tse2.mm.bing.net/th/id/OIP.q5UpjKh-KMHUQUEtd09BJQHaHa?pid=Api&P=0&h=180"
                                alt="maestro"
                                className="img-fluid me-2 maestroCard cardImage"
                                style={{ width: "50px" }}
                              />
                              <img
                                src="https://tse1.mm.bing.net/th/id/OIP.rNamf0fxtSx4i_wPGdjb2wHaHa?pid=Api&P=0&h=180"
                                alt="American Express"
                                className="img-fluid me-2 cardImage"
                                style={{ width: "50px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-light p-3">
                          <div className="text-end">
                            <button
                              className="btn btn-white rounded-pill border border-black"
                              style={{ fontSize: "12px", cursor: "pointer" }}
                              onClick={() =>
                                setShowCard(showCard ? false : true)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-warning rounded-pill ms-2"
                              style={{ fontSize: "12px", cursor: "pointer" }}
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div
                    className="d-flex gap-3 align-items-start p-2 rounded"
                    style={{
                      backgroundColor: `${
                        isNetBanking ? "#FCF5EE" : "#F8F9FA"
                      }`,
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Net Banking"
                      onClick={(e) => {
                        setPaymentMethod(e.target.value)
                        setIsCard(false)
                        setIsNetBanking(true)
                        setIsCashOnDelivery(false)
                        setVisible(false)
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <div>
                      <label className="fw-medium mb-2">Net Banking</label>
                      <br />
                      <select
                        id=""
                        className="rounded p-2"
                        style={{ cursor: "pointer" }}
                      >
                        <option value="" className="fw-bold">
                          Choose an Option
                        </option>
                        <option value="" className="fw-medium">
                          Axis Bank
                        </option>
                        <option value="" className="fw-medium">
                          HDFC Bank
                        </option>
                        <option value="" className="fw-medium">
                          ICICI Bank
                        </option>
                        <option value="" className="fw-medium">
                          Kotak Bank
                        </option>
                        <option value="" className="fw-medium">
                          State Bank of India
                        </option>
                        <hr />
                        <option value="" className="fw-medium">
                          Allahabad Bank
                        </option>
                        <option value="" className="fw-medium">
                          Andhra Bank
                        </option>
                        <option value="" className="fw-medium">
                          Bank of India
                        </option>
                        <option value="" className="fw-medium">
                          Bank of Maharashtra
                        </option>
                        <option value="" className="fw-medium">
                          Canada Bank
                        </option>
                        <option value="" className="fw-medium">
                          Catholic Syrian Bank
                        </option>
                        <option value="" className="fw-medium">
                          Central Bank of India
                        </option>
                        <option value="" className="fw-medium">
                          City Union Bank
                        </option>
                        <option value="" className="fw-medium">
                          Corporation Bank
                        </option>
                        <option value="" className="fw-medium">
                          Cosmos Bank
                        </option>
                        <option value="" className="fw-medium">
                          DCB Bank Ltd
                        </option>
                        <option value="" className="fw-medium">
                          Deutsche Bank
                        </option>
                        <option value="" className="fw-medium">
                          Dhanlakshmi Bank
                        </option>
                        <option value="" className="fw-medium">
                          Federal Bank
                        </option>
                        <option value="" className="fw-medium">
                          IDBI Bank
                        </option>
                        <option value="" className="fw-medium">
                          IDFC FIRST Bank
                        </option>
                        <option value="" className="fw-medium">
                          ING Vysya Bank
                        </option>
                        <option value="" className="fw-medium">
                          Indian Bank
                        </option>
                        <option value="" className="fw-medium">
                          Indian Overseas Bank
                        </option>
                        <option value="" className="fw-medium">
                          Indusind Bank
                        </option>
                        <option value="" className="fw-medium">
                          Jammu Kashmir Bank
                        </option>
                        <option value="" className="fw-medium">
                          Janata Sahakari Bank
                        </option>
                        <option value="" className="fw-medium">
                          Karnataka Bank LTD.
                        </option>
                        <option value="" className="fw-medium">
                          kARUR Vysya Bank
                        </option>
                        <option value="" className="fw-medium">
                          Laxmi Vilas Bank
                        </option>
                        <option value="" className="fw-medium">
                          Oriental Bank of Commerce
                        </option>
                        <option value="" className="fw-medium">
                          PNB YUVA Netbanking
                        </option>
                        <option value="" className="fw-medium">
                          Punjab National Bank
                        </option>
                        <option value="" className="fw-medium">
                          Saraswat Bank
                        </option>
                        <option value="" className="fw-medium">
                          Shamrao Vitthal Co-operative Bank
                        </option>
                        <option value="" className="fw-medium">
                          South Indian Bank
                        </option>
                        <option value="" className="fw-medium">
                          Standard Chartered Bank
                        </option>
                        <option value="" className="fw-medium">
                          State bank of Jaipur
                        </option>
                        <option value="" className="fw-medium">
                          State bank of Hydrabad
                        </option>
                        <option value="" className="fw-medium">
                          State bank of Mysore
                        </option>
                        <option value="" className="fw-medium">
                          State bank of Patiala
                        </option>
                        <option value="" className="fw-medium">
                          Syndicate Bank
                        </option>
                        <option value="" className="fw-medium">
                          Tamilnad Mercantile Bank LTD.
                        </option>
                        <option value="" className="fw-medium">
                          Union Bank of India
                        </option>
                        <option value="" className="fw-medium">
                          United Bank of India
                        </option>
                        <option value="" className="fw-medium">
                          Yes Bank Ltd
                        </option>
                        <option value="" className="fw-medium">
                          Airtal Digital Bank
                        </option>
                        <option value="" className="fw-medium">
                          Jio Digital Bank
                        </option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div
                    className="d-flex gap-3 align-items-start p-2 rounded"
                    style={{
                      backgroundColor: `${
                        isCashOnDelivery ? "#FCF5EE" : "#F8F9FA"
                      }`,
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery/Pay on Delivery"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setPaymentMethod(e.target.value)
                        setIsCard(false)
                        setIsNetBanking(false)
                        setIsCashOnDelivery(true)
                        setVisible(false)
                      }}
                    />
                    <div>
                      <label className="fw-medium">
                        Cash on Delivery/Pay on Delivery
                      </label>
                      <p className="my-0">Cash, UPI and Cards accepted.</p>
                    </div>
                  </div>
                  <button
                    className="btn btn-warning rounded-pill mt-4 px-4"
                    onClick={() => {
                      if (cart) {
                        setOrders(products)
                        selectPaymentMethod(true)
                      }
                      if (id) {
                        const order = {
                          itemId: id,
                          address,
                          price:totalOrder,
                          paymentMethod,
                          delivery: 30,
                        }
                        orders.push(order)
                        setOrders(orders)
                        selectPaymentMethod(true)
                      }
                    }}
                  >
                    Use this payment method
                  </button>
                </div>
              </div>
            </section>
          )}
          {isPaymentMethodSelected && (
            <section className="bg-light mt-4 p-4 d-flex gap-4 fs-5">
              <button
                className="btn btn-warning rounded-pill px-5"
                onClick={placeOrder}
              >
                Place your order
              </button>
              <p className="fw-bold my-0">Order Total: ₹</p>
            </section>
          )}
        </div>
        <section className="bg-light p-3 paymentMethodSectionTwo mt-5 mt-lg-0 position-sticky top-0">
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block">Items: </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end">₹</p>
          </div>
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block">Delivery: </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end">₹</p>
          </div>
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block">Total: </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end">₹</p>
          </div>
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block text-success">
              Free Delivery:{" "}
            </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end text-success">
              ₹
            </p>
          </div>
          <hr />
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block fs-5">
              Order Total:{" "}
            </p>
            <p className="my-0 w-50 fw-medium d-inline-block fs-5 text-end">
              ₹
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

import Header from "../components/Header"
import { Link } from "react-router-dom"
import Plus from "../assets/plus.png"
import Card from "../assets/card.png"
import { useState } from "react"
import Cross from "../assets/cross.png"
import RatingBar from "../components/RatingBar"
import SearchInPage from "../components/SearchInPage"
import GetClothsData from "../components/GetClothsData"

export default function PaymentMethods() {
  const { clothsData, setClothsData } = GetClothsData()
  const [search, setSearch] = useState("")
  console.log(search)
  const user = JSON.parse(localStorage.getItem("user"))
  const address =
    user &&
    user.address.length !== 0 &&
    user.address.find((address) => address.selected)
  const [isCard, setIsCard] = useState(false)
  const [isNetBanking, setIsNetBanking] = useState(false)
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false)
  const [isVisible, setVisible] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [updated, setUpdated] = useState(false)
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || [],
  )

  const [isPaymentMethodSelected, selectPaymentMethod] = useState(false)

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("createOrder"))
      ? JSON.parse(localStorage.getItem("createOrder")).item
      : [],
  )

  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const [coupon, setCoupon] = useState("")

  const totalOrder = products.reduce(
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

  const DeliveryCharge = Math.round(
    products.reduce((acc, curr) => acc + curr.deliveryCharge, 0) /
      products.length,
  )

  const deliveryCharge = Math.round(
    products.reduce(
      (acc, curr) => acc + (curr.freeDelivery ? 0 : curr.deliveryCharge),
      0,
    ) / products.length,
  )

  const freeDelivery = Math.round(
    products.reduce(
      (acc, curr) => acc + (curr.freeDelivery ? curr.deliveryCharge : 0),
      0,
    ) / products.length,
  )

  const totalPrice = totalOrder + deliveryCharge + (isCashOnDelivery ? 10 : 0)

  function placeOrder() {
    if (coupon === "HAPPYDIWALI") {
      orders[orders.length - 1].sale = "10%"
    }
    if (freeDelivery) {
      orders[orders.length - 1].freeDelivery = `₹${freeDelivery}`
    }
    orders[orders.length - 1].totalPrice = Math.round(
      totalPrice - (coupon === "HAPPYDIWALI" ? totalOrder / 10 : 0),
    )
    localStorage.setItem("orders", JSON.stringify(orders))
    localStorage.setItem("createOrder", JSON.stringify({ item: [] }))
    setIsOrderPlaced(true)
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  function getOrderDate() {
    const today = new Date()
    return `${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`
  }

  function setDeliveryDate() {
    const today = new Date()
    today.setDate(today.getDate() + 10)
    return `${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`
  }

  function getDeliveryDay() {
    const date = new Date()
    date.setDate(date.getDate() + 10)
    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    })
    return dayName
  }

  function setDeliveryTime() {
    const today = new Date()
    return today.toLocaleTimeString()
  }

  if (updated) {
    setUpdated(false)
  }

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
      />
      <SearchInPage margin="ms-3" setSearch={setSearch} />
      <main className="container mt-3 mb-5 d-lg-flex gap-5 align-items-start">
        <div className="paymentMethodSectionOne">
          {user && user.address.length !== 0 && (
            <section className="bg-light p-3 d-flex column-gap-5 justify-content-between align-items-start deliveryAddressSection">
              <div>
                <h5 className="userName">Delivering to {address.fullName}</h5>
                <p className="fw-medium userAddress">
                  {address.localInfo}, {address.area},{" "}
                  {address.city.toUpperCase()}
                  {", "}
                  {address.state.toUpperCase()}, {address.pinCode},{" "}
                  {address.country}
                </p>
              </div>
              <Link
                to="/userAddress/paymentMethods"
                className="text-decoration-none fw-medium changeBtn"
              >
                Change
              </Link>
            </section>
          )}
          {isPaymentMethodSelected && (
            <section className="bg-light p-3 d-flex column-gap-5 row-gap-3 justify-content-between align-items-start mt-3 paymentMethodSection">
              <div>
                <h5 className="paymentMethodHeading">
                  {orders[orders.length - 1].paymentMethod}
                </h5>
                <Link className="fw-medium text-decoration-none discountCard d-block lh-sm">
                  Use a gift card, voucher or promo code
                </Link>
              </div>
              <p
                className="text-decoration-none fw-medium my-0 text-primary changeBtn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  selectPaymentMethod(false)
                  setOrders(JSON.parse(localStorage.getItem("orders")))
                }}
              >
                Change
              </p>
            </section>
          )}
          {isPaymentMethodSelected && (
            <section>
              <h3 className="mt-4">Products List</h3>
              <div className="bg-light px-4 py-3 mt-3">
                <h5 className="mb-3 fw-bold deliveryDate text-success">
                  Arriving {setDeliveryDate()}
                </h5>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="card column-gap-4 my-3 cardInPaymentMethodPage"
                  >
                    <div className="h-100 mx-auto productImageDiv">
                      <img
                        src={product.url}
                        alt="productImage"
                        className="w-100 h-100"
                      />
                    </div>
                    <div className="p-2 w-100">
                      <p
                        className="fw-medium my-0"
                        style={{ height: "96px", overflow: "hidden" }}
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
                        {product.name}
                      </p>
                      <RatingBar rating={product.rating} />
                      <span className="ms-1 fw-medium">{product.rating}</span>
                      <div className="mt-2">
                        <span className="mt-2 fw-medium">
                          ₹
                          {Math.round(
                            product.price -
                              (product.price *
                                (Number(product.offer.replace("%", ""))
                                  ? Number(product.offer.replace("%", ""))
                                  : Number(
                                      product.discount.replace("%", ""),
                                    ))) /
                                100,
                          )}
                        </span>
                        <span className="ms-2 fw-medium">
                          (-
                          {Number(product.offer.replace("%", ""))
                            ? product.offer
                            : product.discount}
                          )
                        </span>
                      </div>
                      <div
                        className="border border-warning border-2 mt-3 d-flex align-items-center rounded-pill overflow-hidden justify-content-around deleteOrIncreaseQuantityBtn"
                        style={{ width: "100px" }}
                      >
                        <button
                          className="border border-0 bg-white text-danger"
                          onClick={(e) => {
                            const Product = products.filter(
                              (item) => item.id !== product.id,
                            )
                            orders[orders.length - 1].item = Product
                            setProducts(Product)
                          }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                        <input
                          type="text"
                          className="border border-0"
                          defaultValue={product.quantity || 1}
                          style={{ width: "30px", outline: "none" }}
                          onChange={(e) => {
                            let inputElementValue = Number(e.target.value)
                            const Product = products.find(
                              (item) => item.id === product.id,
                            )
                            Product.quantity = inputElementValue
                            orders[orders.length - 1].item = products
                          }}
                        />
                        <button
                          className="border border-0 bg-white fs-5 fw-bold"
                          style={{ marginTop: "-5px" }}
                          onClick={(e) => {
                            let inputElementValue = Number(
                              e.target.previousElementSibling.value,
                            )
                            e.target.previousElementSibling.value =
                              ++inputElementValue
                            const item = clothsData.find(
                              (item) => item.id === product.id,
                            )
                            if (item.addToCart) {
                              item.quantity = Number(
                                e.target.previousElementSibling.value,
                              )
                              localStorage.setItem(
                                "clothsData",
                                JSON.stringify(clothsData),
                              )
                              setClothsData(
                                JSON.parse(localStorage.getItem("clothsData")),
                              )
                              const createOrder = JSON.parse(
                                localStorage.getItem("createOrder"),
                              )
                              const createOrderItem = createOrder.item.find(
                                (item) => item.id === product.id,
                              )
                              createOrderItem.quantity = Number(
                                e.target.previousElementSibling.value,
                              )
                              localStorage.setItem(
                                "createOrder",
                                JSON.stringify(createOrder),
                              )
                            }
                            const Product = products.find(
                              (item) => item.id === product.id,
                            )
                            Product.quantity = Number(
                              e.target.previousElementSibling.value,
                            )
                            orders[orders.length - 1].item = products
                            setUpdated(true)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                      <div className="d-flex cardImagesInPaymentMethodPage">
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
                              alt="plusIcon"
                              className="img-fluid bg-white p-1"
                              style={{ width: "20px" }}
                              onClick={() =>
                                setShowCard(showCard ? false : true)
                              }
                            />
                          </Link>
                          <img
                            src={Card}
                            alt="cardIcon"
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
                            alt="crossIcon"
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
                      <label htmlFor="netBanking" className="fw-medium mb-2">
                        Net Banking
                      </label>
                      <br />
                      <select
                        id="netBanking"
                        className="rounded p-2 netBanking"
                        style={{ cursor: "pointer", width: "200px" }}
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
                  {products.length === 0 ? (
                    <Link
                      to="/cart"
                      className="btn btn-warning rounded-pill mt-4 px-4 useThisPaymentMethodBtn"
                    >
                      Use this payment method
                    </Link>
                  ) : (
                    paymentMethod && (
                      <button
                        className="btn btn-warning rounded-pill mt-4 px-4 useThisPaymentMethodBtn"
                        onClick={() => {
                          const order = {
                            id: Number(
                              Date.now().toString() +
                                Math.floor(Math.random() * 1000),
                            ),
                            item: products,
                            address,
                            paymentMethod,
                            deliveryCharge,
                            orderDate: getOrderDate(),
                            orderTime: setDeliveryTime(),
                            deliveryDate: setDeliveryDate(),
                            deliveryDay: getDeliveryDay(),
                            totalPrice: Math.round(totalPrice),
                          }
                          orders.push(order)
                          setOrders(orders)
                          selectPaymentMethod(true)
                        }}
                      >
                        Use this payment method
                      </button>
                    )
                  )}
                </div>
              </div>
            </section>
          )}
          {isPaymentMethodSelected && (
            <section className="bg-light mt-4 p-4 d-flex fs-5 align-items-center couponSection">
              <input
                type="text"
                className="form-control couponSectionInput"
                onChange={(e) => setCoupon(e.target.value)}
              />
              <label
                htmlFor=""
                className="form-lavel fw-medium text-secondary couponSectionLabel"
              >
                Have you any coupon?
              </label>
            </section>
          )}
          {isPaymentMethodSelected && (
            <section className="bg-light mt-4 p-4 d-flex gap-3 fs-5 placeYourOrderSection">
              {isOrderPlaced ? (
                <Link
                  to="/yourOrders"
                  className="btn btn-warning rounded-pill px-4 placeYourOrderBtn"
                >
                  See your orders
                </Link>
              ) : (
                <button
                  className="btn btn-warning rounded-pill px-4 placeYourOrderBtn"
                  onClick={placeOrder}
                >
                  Place your order
                </button>
              )}

              <p className="fw-bold my-0 text-center orderTotalPlaceOrderSection">
                Order Total: ₹
                {totalPrice && totalOrder
                  ? Math.round(
                      totalPrice -
                        (coupon === "HAPPYDIWALI" ? totalOrder / 10 : 0),
                    )
                  : 0}
              </p>
            </section>
          )}
        </div>
        <section className="bg-light p-3 paymentMethodSectionTwo mt-5 mt-lg-0 position-sticky top-0">
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block">Items: </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end">
              ₹{Math.round(totalOrder)}
            </p>
          </div>
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block">Delivery: </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end">
              ₹{DeliveryCharge ? DeliveryCharge : 0}
            </p>
          </div>
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block text-success">
              Free Delivery:
            </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end text-success">
              -₹{freeDelivery ? freeDelivery : 0}
            </p>
          </div>
          {isCashOnDelivery && (
            <div>
              <p className="my-0 w-50 fw-medium d-inline-block">
                Cash On Delivery Charge:{" "}
              </p>
              <p className="my-0 w-50 fw-medium d-inline-block text-end">₹10</p>
            </div>
          )}
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block">Total: </p>
            <p className="my-0 w-50 fw-medium d-inline-block text-end">
              ₹{totalPrice ? Math.round(totalPrice) : 0}
            </p>
          </div>
          {coupon === "HAPPYDIWALI" && (
            <div>
              <p className="my-0 w-50 fw-medium d-inline-block text-success">
                Sale:
              </p>
              <p className="my-0 w-50 fw-medium d-inline-block text-end text-success">
                -₹{Math.round(coupon === "HAPPYDIWALI" ? totalOrder / 10 : 0)}
              </p>
            </div>
          )}
          <hr />
          <div>
            <p className="my-0 w-50 fw-medium d-inline-block fs-5">
              Order Total:
            </p>
            <p className="my-0 w-50 fw-medium d-inline-block fs-5 text-end">
              ₹
              {totalPrice
                ? Math.round(
                    totalPrice -
                      (coupon === "HAPPYDIWALI" ? totalOrder / 10 : 0),
                  )
                : 0}
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

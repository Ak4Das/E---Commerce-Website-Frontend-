import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useState } from "react"
import Plus from "../assets/plus.png"
import Card from "../assets/card.png"
import Cross from "../assets/cross.png"
import { useParams } from "react-router-dom"
import SearchInPage from "../components/SearchInPage"
import { toast } from "react-toastify"

export default function EditYourOrder() {
  const orderId = Number(useParams().orderId)
  const [search, setSearch] = useState("")
  console.log(search)

  /* isUpdated useState is used to rerender the page if quantity will change 
  to update the variables present on this page */
  const [isUpdated, setUpdated] = useState(false)

  // deductPrice useState is used only to manage calculation on this page
  const [deductPrice, setDeductPrice] = useState(0)

  /* changePaymentMethod useState is used only to if user wants to change payment method then 
  select payment method will render on the page */
  const [changePaymentMethod, setChangePaymentMethod] = useState(false)

  /* isCard useState is used only to set background color of card option if user will select 
  card option for payment */
  const [isCard, setIsCard] = useState(false)

  /* isVisible useState is used only to manage if user select card option for payment 
  then only he/she can see the Add a new credit or debit card option */
  const [isVisible, setVisible] = useState(false)

  /* showCard useState is used only to if user wants to add new card then the floating form to 
  add a new credit or debit card will appear on the page */
  const [showCard, setShowCard] = useState(false)

  /* isNetBanking useState is used only to set background color of Net Banking option 
  if user will select Net Banking option for payment */
  const [isNetBanking, setIsNetBanking] = useState(false)

  /* isCashOnDelivery useState is used only to set background color of cash on delivery option 
  if user will select cash on delivery option for payment */
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false)

  // paymentMethod useState is used only to retain the payment option which user was selected
  const [paymentMethod, setPaymentMethod] = useState("")

  // deliveryCharge useState is used only to retain the new delivery charge if user delete a item
  const [deliveryCharge, setDeliveryCharge] = useState(0)

  const orders = JSON.parse(localStorage.getItem("orders")) || []

  const orderToBeEdit = orders.find((order) => order.id === orderId)

  const [products, setProducts] = useState(orderToBeEdit && orderToBeEdit.item)

  const address = JSON.parse(localStorage.getItem("user")).address.find(
    (address) => address.selected,
  )

  const totalPrice =
    paymentMethod &&
    (orderToBeEdit.paymentMethod === paymentMethod
      ? orderToBeEdit.totalPrice
      : orderToBeEdit.paymentMethod === "Cash on Delivery/Pay on Delivery"
        ? orderToBeEdit.totalPrice - 10
        : paymentMethod === "Cash on Delivery/Pay on Delivery"
          ? orderToBeEdit.totalPrice + 10
          : orderToBeEdit.totalPrice)

  function cancelOrder(ORDERS, ORDER) {
    const Orders = ORDERS && ORDERS.filter((order) => order.id !== ORDER.id)
    localStorage.setItem("orders", JSON.stringify(Orders))
  }

  function save(e) {
    const order = {
      id: orderToBeEdit.id,
      item: products,
      address,
      paymentMethod: paymentMethod
        ? paymentMethod
        : orderToBeEdit.paymentMethod,
      deliveryCharge: deliveryCharge
        ? deliveryCharge
        : orderToBeEdit.deliveryCharge,
      orderDate: orderToBeEdit.orderDate,
      orderTime: orderToBeEdit.orderTime,
      deliveryDate: orderToBeEdit.deliveryDate,
      deliveryDay: orderToBeEdit.deliveryDay,
      sale: orderToBeEdit.sale,
      totalPrice: totalPrice
        ? Math.round(totalPrice + deductPrice)
        : Math.round(orderToBeEdit.totalPrice + deductPrice),
    }
    let OrderIndex = null
    orders.forEach((Order, index) => {
      if (Order.id === order.id) {
        OrderIndex = index
      }
    })
    orders[OrderIndex] = order
    localStorage.setItem("orders", JSON.stringify(orders))
    setDeductPrice(0)

    const ORDERS = JSON.parse(localStorage.getItem("orders"))
    const ORDER = ORDERS && ORDERS[OrderIndex]
    ORDER && ORDER.item.length === 0 ? cancelOrder(ORDERS, ORDER) : 0

    const btn = e.target
    btn.innerHTML = "Changes Saved"
    setTimeout(() => {
      btn.innerHTML = "Save Changes"
    }, 1000)

    toast("Changes Saved Successfully😊")
  }

  if (isUpdated) {
    setUpdated(false)
  }

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
        isSearchBarNeeded={false}
      />
      <SearchInPage margin="ms-3" setSearch={setSearch} isSearchBarNeeded={false}/>
      <h1 className="text-success fw-medium my-3 container">Edit Order</h1>
      {orderToBeEdit && (
        <main className="container my-4">
          <section className="editOrderSection1 bg-light p-3 d-flex column-gap-5 justify-content-between align-items-start deliveryAddressSection">
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
              to={`/userAddress/editOrder/${orderId}`}
              className="text-decoration-none fw-medium changeBtn"
            >
              Change
            </Link>
          </section>
          <section className="editOrderSection2 bg-light p-3 d-flex column-gap-5 row-gap-3 justify-content-between align-items-start mt-3 paymentMethodSection">
            <div>
              <h5 className="paymentMethodHeading">
                {paymentMethod ? paymentMethod : orderToBeEdit.paymentMethod}
              </h5>
              <Link className="fw-medium text-decoration-none discountCard d-block lh-sm">
                Use a gift card, voucher or promo code
              </Link>
            </div>
            <p
              className="text-decoration-none fw-medium my-0 text-primary changeBtn"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setChangePaymentMethod(true)
              }}
            >
              Change
            </p>
          </section>
          {changePaymentMethod && (
            <section className="editOrderSection3">
              <div className="mt-4">
                <h3 className="fw-medium">Select Payment Method</h3>
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
                      backgroundColor: `${isNetBanking ? "#FCF5EE" : "#F8F9FA"}`,
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
                        className="rounded p-2"
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
                  <button
                    className="btn btn-warning rounded-pill mt-4 px-4"
                    onClick={() => {
                      setChangePaymentMethod(false)
                    }}
                  >
                    Use this payment method
                  </button>
                </div>
              </div>
            </section>
          )}
          <section className="editOrderSection4">
            <h3 className="mt-4">Products List</h3>
            <div className="bg-light px-4 py-3 mt-3">
              <h5 className="mb-3 fw-bold deliveryDate text-success">
                Arriving {orderToBeEdit.deliveryDate}
              </h5>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="card column-gap-4 my-3 cardInPaymentMethodPage"
                >
                  <div className="h-100 mx-auto productImageContainerDiv">
                    <img
                      src={product.url}
                      alt="productImage"
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="p-2 w-100">
                    <p
                      className="fw-medium my-0"
                      style={{ height: "72px", overflow: "hidden" }}
                    >
                      {product.newArrival === true && (
                        <span className="badge text-bg-success me-1">New</span>
                      )}
                      {!!Number(product.offer.replace("%", "")) && (
                        <span className="badge text-bg-warning me-1">
                          Diwali Offer
                        </span>
                      )}
                      {product.name}
                    </p>
                    <div className="mt-2">
                      <span className="fw-bold text-secondary">Price: </span>
                      <span className="mt-2 fw-medium">
                        ₹
                        {Math.round(
                          product.price -
                            (product.price *
                              (Number(product.offer.replace("%", ""))
                                ? Number(product.offer.replace("%", ""))
                                : Number(product.discount.replace("%", "")))) /
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
                    <div className="my-3">
                      <span className="fw-bold me-0 text-secondary sizeText me-1 me-sm-3">
                        Size:{" "}
                      </span>
                      <div className="sizeBtnContainer">
                        <button
                          className="border border-1 me-2 mb-2"
                          onClick={(e) => {
                            product.size = "S"
                            const btn = e.target
                            btn.innerHTML = '<i class="bi bi-check2"></i>'
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
                            product.size = "M"
                            const btn = e.target
                            btn.innerHTML = '<i class="bi bi-check2"></i>'
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
                            product.size = "L"
                            const btn = e.target
                            btn.innerHTML = '<i class="bi bi-check2"></i>'
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
                            product.size = "XL"
                            const btn = e.target
                            btn.innerHTML = '<i class="bi bi-check2"></i>'
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
                            product.size = "XXL"
                            const btn = e.target
                            btn.innerHTML = '<i class="bi bi-check2"></i>'
                            setTimeout(() => {
                              btn.innerHTML = "XXL"
                            }, 500)
                          }}
                        >
                          XXL
                        </button>
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center btnInEditOrderPage">
                      <div
                        className="border border-warning w-100 my-0 border-2 d-flex align-items-center rounded-pill overflow-hidden justify-content-around deleteOrIncreaseQuantityBtn"
                        style={{ width: "100px" }}
                      >
                        <button
                          className="border border-0 bg-white fs-5 fw-bold text-danger"
                          style={{ marginTop: "-5px" }}
                          onClick={(e) => {
                            let inputElementValue = Number(
                              e.target.nextElementSibling.value,
                            )
                            if (inputElementValue > 1) {
                              e.target.nextElementSibling.value =
                                --inputElementValue
                              product.quantity = Number(
                                e.target.nextElementSibling.value,
                              )
                              const price = Math.round(
                                (
                                  product.price -
                                  (product.price *
                                    (Number(product.offer.replace("%", ""))
                                      ? Number(product.offer.replace("%", ""))
                                      : Number(
                                          product.discount.replace("%", ""),
                                        ))) /
                                    100
                                ).toFixed(1),
                              )
                              const discountDueToSale = orderToBeEdit.sale
                                ? price / 10
                                : 0
                              setDeductPrice(
                                deductPrice - price + discountDueToSale,
                              )
                              setUpdated(true)
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="border border-0"
                          defaultValue={product.quantity || 1}
                          style={{ width: "30px", outline: "none" }}
                          onChange={(e) => {
                            const initialQuantity = product.quantity
                            let inputElementValue = Number(e.target.value)
                            product.quantity = inputElementValue
                            const price = Math.round(
                              (
                                product.price -
                                (product.price *
                                  (Number(product.offer.replace("%", ""))
                                    ? Number(product.offer.replace("%", ""))
                                    : Number(
                                        product.discount.replace("%", ""),
                                      ))) /
                                  100
                              ).toFixed(1),
                            )
                            const discountDueToSale = orderToBeEdit.sale
                              ? price / 10
                              : 0
                            const updatedQuantity = product.quantity
                            const changeInQuantity =
                              updatedQuantity - initialQuantity
                            setDeductPrice(
                              deductPrice +
                                price * changeInQuantity -
                                discountDueToSale * changeInQuantity,
                            )
                            setUpdated(true)
                          }}
                        />
                        <button
                          className="border border-0 bg-white fs-5 fw-bold text-success"
                          style={{ marginTop: "-5px" }}
                          onClick={(e) => {
                            let inputElementValue = Number(
                              e.target.previousElementSibling.value,
                            )
                            e.target.previousElementSibling.value =
                              ++inputElementValue
                            product.quantity = Number(
                              e.target.previousElementSibling.value,
                            )
                            const price = Math.round(
                              (
                                product.price -
                                (product.price *
                                  (Number(product.offer.replace("%", ""))
                                    ? Number(product.offer.replace("%", ""))
                                    : Number(
                                        product.discount.replace("%", ""),
                                      ))) /
                                  100
                              ).toFixed(1),
                            )
                            const discountDueToSale = orderToBeEdit.sale
                              ? price / 10
                              : 0
                            console.log(discountDueToSale)
                            setDeductPrice(
                              deductPrice + price - discountDueToSale,
                            )
                            setUpdated(true)
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill w-100"
                        onClick={() => {
                          const Product = products.filter(
                            (item) => item.id !== product.id,
                          )

                          const price = Math.round(
                            (
                              product.price -
                              (product.price *
                                (Number(product.offer.replace("%", ""))
                                  ? Number(product.offer.replace("%", ""))
                                  : Number(
                                      product.discount.replace("%", ""),
                                    ))) /
                                100
                            ).toFixed(1),
                          )

                          const newDeliveryCharge =
                            Product.length &&
                            Math.round(
                              Product.reduce(
                                (acc, curr) =>
                                  acc +
                                  (curr.freeDelivery ? 0 : curr.deliveryCharge),
                                0,
                              ) / Product.length,
                            )

                          setDeliveryCharge(newDeliveryCharge)

                          const deductInDeliveryCharge =
                            orderToBeEdit.deliveryCharge - newDeliveryCharge

                          const salePercent = orderToBeEdit.sale
                            ? Number(orderToBeEdit.sale.replace("%", ""))
                            : 0

                          const saleDeduction = salePercent
                            ? Math.round(price / salePercent)
                            : 0

                          let paymentMethodChargeDeduction = 0
                          if (
                            orderToBeEdit.paymentMethod ===
                              "Cash on Delivery/Pay on Delivery" &&
                            Product.length === 0
                          ) {
                            paymentMethodChargeDeduction = 10
                          }

                          setDeductPrice(
                            deductPrice -
                              price * product.quantity -
                              deductInDeliveryCharge +
                              saleDeduction -
                              paymentMethodChargeDeduction,
                          )

                          setProducts(Product)

                          toast("Product removed successfully")
                        }}
                      >
                        <i className="bi bi-trash3-fill"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <button className="btn btn-warning rounded-pill mt-4" onClick={save}>
            Save Changes
          </button>
        </main>
      )}
    </>
  )
}

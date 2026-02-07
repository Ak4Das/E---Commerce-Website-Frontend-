import Header from "../components/Header"
import cashOnDelivery from "../assets/cash-on-delivery.png"
import { useParams } from "react-router-dom"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"
import { useState } from "react"
import location from "../assets/location.png"
import { useEffect } from "react"
import SearchInPage from "../components/SearchInPage"

export default function ProductDetailsPage() {
  const [search, setSearch] = useState("")
  console.log(search)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("")
  const [isUpdated, setUpdated] = useState(false)
  const id = Number(useParams().id)
  const { clothsData, setClothsData } = GetClothsData()
  const [time, setTime] = useState("")
  const [isFreeDeliveryAvailable, setFreeDelivery] = useState(false)

  const product = clothsData.find((product) => product.id === id)

  const user = JSON.parse(localStorage.getItem("user"))

  function increaseCount(e) {
    // Update the input element value
    let inputElementValue = Number(e.target.previousElementSibling.value)
    e.target.previousElementSibling.value = ++inputElementValue

    // Update user in Database
    const clothItem = user.addToCartItems.find((item) => item.id === id)
    if (clothItem) {
      clothItem.quantity = Number(e.target.previousElementSibling.value)
      localStorage.setItem("user", JSON.stringify(user))
    }

    // Update clothsData in memory
    if (product) {
      product.quantity = Number(e.target.previousElementSibling.value)
    }

    setQuantity(Number(e.target.previousElementSibling.value))
    setUpdated(true)
  }

  function decreaseCount(e) {
    let inputElementValue = Number(e.target.nextElementSibling.value)
    if (inputElementValue > 1) {
      // Update the input element value
      e.target.nextElementSibling.value = --inputElementValue

      // Update user in Database
      const clothItem = user.addToCartItems.find((item) => item.id === id)
      if (clothItem) {
        clothItem.quantity = Number(e.target.nextElementSibling.value)
        localStorage.setItem("user", JSON.stringify(user))
      }

      // Update clothsData in memory
      if (product) {
        product.quantity = Number(e.target.nextElementSibling.value)
      }

      setQuantity(Number(e.target.nextElementSibling.value))
      setUpdated(true)
    }
  }

  function addToCart(e) {
    // To stop Event Bubbling
    e.preventDefault()
    e.stopPropagation()

    // Update clothsData in memory
    const cloth = clothsData.find(
      (Product) => Product.id === Number(e.target.value),
    )
    if (cloth) {
      cloth.addToCart = true
      cloth.quantity = quantity
      cloth.size = size
    }

    // Update user in Database
    const isAddedToCart = user.addToCartItems.filter(
      (item) => item.id === Number(e.target.value),
    )
    if (!isAddedToCart.length) {
      user.addToCartItems.push({
        id: id,
        quantity: quantity,
        size: size,
      })
      localStorage.setItem("user", JSON.stringify(user))

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
    }

    // To update the variables present in this page
    setUpdated(true)
  }

  function addToWishlist(e) {
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

      // For interactivity
      const btn = e.target
      btn.innerHTML = "Added To Wishlist"
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

  const isProductAddedToCart =
    user && user.addToCartItems.filter((item) => item.id === id)

  /* Reset the quantity and size value of the product in clothsData 
  while i enter the page if this product is not added to cart */
  if (isProductAddedToCart) {
    if (!isProductAddedToCart.length) {
      product.quantity = quantity
      product.size = size
    }
  }

  const address =
    user &&
    user.address.length !== 0 &&
    user.address.find((address) => address.selected)

  /* Update createOrder in Database while quantity, size, freeDelivery will change and 
  update user in database while quantity change and if product is already added to cart */
  if (isUpdated) {
    if (isProductAddedToCart.length) {
      if (quantity > 1) {
        isProductAddedToCart[0].quantity = quantity
        localStorage.setItem("user", JSON.stringify(user))
        product.quantity = quantity
      }
    } else {
      if (quantity > 1) {
        product.quantity = quantity
      }
    }
    if (size) {
      product.size = size
    }
    if (isFreeDeliveryAvailable) {
      product.freeDelivery = true
    } else {
      product.freeDelivery = false
    }
    const createOrder = { item: [product] }
    localStorage.setItem("createOrder", JSON.stringify(createOrder))
    setUpdated(false)
  }

  // Slide content btn logic
  function preBtnClicked(e) {
    const element = e.target
    const container = element.parentElement.children[2]
    const containerDimensions = container.getBoundingClientRect()
    const containerWidth = containerDimensions.width
    container.scrollLeft += containerWidth
    element.style.opacity = 0
    element.nextElementSibling.style.opacity = 1
  }
  function nxtBtnClicked(e) {
    const element = e.target
    const container = element.parentElement.children[2]
    const containerDimensions = container.getBoundingClientRect()
    const containerWidth = containerDimensions.width
    container.scrollLeft -= containerWidth
    element.style.opacity = 0
    element.previousElementSibling.style.opacity = 1
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

  function setDeliveryDate() {
    const today = new Date()
    today.setDate(today.getDate() + 10)
    return `${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`
  }

  useEffect(() => {
    if (product.freeDelivery) {
      setFreeDelivery(true)
      const timerId = setInterval(() => {
        const currentTime = new Date()
        const hours = currentTime.getHours()
        const minutes = currentTime.getMinutes()
        const seconds = currentTime.getSeconds()
        setTime(`${23 - hours}:${59 - minutes}:${59 - seconds}`)
        // console.log(hours, minutes, seconds)
        if (hours === 23 && minutes === 59 && seconds === 59) {
          setFreeDelivery(false)
          setUpdated(true)
          const clothsData = JSON.parse(localStorage.getItem("clothsData"))
          const cloth = clothsData.find((product) => product.id === id)
          cloth.freeDelivery = false
          localStorage.setItem("clothsData", JSON.stringify(clothsData))
          clearInterval(timerId)
        }
      }, 1000)
    } else {
      setTime("0:0:0")
    }
  }, [])

  const similarProductIds = product.similarProducts.map((product) => product.id)
  const similarProducts = JSON.parse(localStorage.getItem("clothsData")).filter(
    (product) => similarProductIds.includes(product.id),
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
      <main className="bg-body-secondary py-3 px-4 py-sm-5 px-sm-5">
        <div className="bg-light-subtle py-3 px-3 productDetailsContainer">
          <section className="d-sm-flex gap-sm-4 gap-xl-5 productDetailsContainerFirstSection">
            <div
              className="productDetailsImage top-0 start-0"
              style={{ minWidth: "200px" }}
            >
              <img
                src={product.url}
                alt="productImage"
                className="img-fluid productImage"
              />
              <div className="btnContainer1">
                {!user && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => alert("Please login to your account")}
                  >
                    Buy Now
                  </button>
                )}
                {user && !user.address.length && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => alert("Please add your address")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && !size && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => alert("Please select the product size")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && size && (
                  <Link
                    to="/paymentMethods"
                    className="btn btn-primary w-100 my-2 text-decoration-none"
                  >
                    Buy Now{" "}
                  </Link>
                )}
                <br />
                <div>
                  {!user ? (
                    <button
                      className="btn btn-secondary w-100 mb-2"
                      onClick={() => alert("Please login to your account")}
                    >
                      {product.addToCart ? "Added To Cart" : "Add To cart"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary w-100 mb-2"
                      value={product.id}
                      onClick={addToCart}
                    >
                      {product.addToCart ? "Added To Cart" : "Add To cart"}
                    </button>
                  )}
                </div>
                <div>
                  {!user ? (
                    <button
                      className="btn btn-outline-secondary w-100 mb-2"
                      onClick={() => alert("Please login to your account")}
                    >
                      {product.addToWishList
                        ? "Added To Wishlist"
                        : "Save To Wishlist"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-secondary w-100 mb-2"
                      style={{ fontSize: "15px" }}
                      value={product.id}
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
            <div className="me-md-5">
              <small className="text-primary fw-medium">{product.soldBy}</small>
              <p className="fw-bold lh-sm productDescription mb-1">
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
              <RatingBar rating={product.rating} />
              <span style={{ fontSize: "15px" }}> {product.rating}</span>
              <div>
                <span className="fw-bold fs-5">
                  ₹
                  {Math.round(
                    (
                      product.price -
                      (product.price *
                        (Number(product.offer.replace("%", ""))
                          ? Number(product.offer.replace("%", ""))
                          : Number(product.discount.replace("%", "")))) /
                        100
                    ).toFixed(1),
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
              <div>
                <span className="quantityText fw-bold me-2">Quantity: </span>
                <div className="quantityBtnContainer mb-3">
                  <button
                    className="rounded-circle border border-1"
                    style={{ width: "30px", height: "30px" }}
                    onClick={decreaseCount}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <input
                    type="text"
                    defaultValue={
                      product.quantity ? product.quantity : quantity
                    }
                    style={{ width: "30px" }}
                    className="mx-2"
                    onChange={(e) => {
                      // Update user in Database
                      const user = JSON.parse(localStorage.getItem("user"))
                      const clothItem = user.addToCartItems.find(
                        (item) => item.id === id,
                      )
                      if (clothItem) {
                        clothItem.quantity = Number(e.target.value)
                        localStorage.setItem("user", JSON.stringify(user))
                      }

                      setQuantity(Number(e.target.value))

                      // To update the variables present in this page
                      setUpdated(true)
                    }}
                  />
                  <button
                    className="rounded-circle border border-1"
                    style={{ width: "30px", height: "30px" }}
                    onClick={increaseCount}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <div>
                <span className="sizeText fw-bold me-3">Size: </span>
                <div className="sizeBtnContainer">
                  <button
                    className="border border-1 me-2 mb-2"
                    onClick={(e) => {
                      setSize("S")

                      // Update user in Database
                      const isClothAddedToCart = user.addToCartItems.find(
                        (item) => item.id === id,
                      )
                      if (isClothAddedToCart) {
                        isClothAddedToCart.size = "S"
                        localStorage.setItem("user", JSON.stringify(user))
                      }

                      // To update the variables present in this page
                      setUpdated(true)

                      // For interactivity
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
                      setSize("M")

                      // Update user in Database
                      const isClothAddedToCart = user.addToCartItems.find(
                        (item) => item.id === id,
                      )
                      if (isClothAddedToCart) {
                        isClothAddedToCart.size = "M"
                        localStorage.setItem("user", JSON.stringify(user))
                      }

                      // To update the variables present in this page
                      setUpdated(true)

                      // For interactivity
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
                      setSize("L")

                      // Update user in Database
                      const isClothAddedToCart = user.addToCartItems.find(
                        (item) => item.id === id,
                      )
                      if (isClothAddedToCart) {
                        isClothAddedToCart.size = "L"
                        localStorage.setItem("user", JSON.stringify(user))
                      }

                      // To update the variables present in this page
                      setUpdated(true)

                      // For interactivity
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
                      setSize("XL")

                      // Update user in Database
                      const isClothAddedToCart = user.addToCartItems.find(
                        (item) => item.id === id,
                      )
                      if (isClothAddedToCart) {
                        isClothAddedToCart.size = "XL"
                        localStorage.setItem("user", JSON.stringify(user))
                      }

                      // To update the variables present in this page
                      setUpdated(true)

                      // For interactivity
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
                      setSize("XXL")

                      // Update user in Database
                      const isClothAddedToCart = user.addToCartItems.find(
                        (item) => item.id === id,
                      )
                      if (isClothAddedToCart) {
                        isClothAddedToCart.size = "XXL"
                        localStorage.setItem("user", JSON.stringify(user))
                      }

                      // To update the variables present in this page
                      setUpdated(true)

                      // For interactivity
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
              <hr />
              <div className="orderFeaturesContainerInProductDetailsPage">
                <i
                  className="pre-btn bi bi-chevron-left"
                  onClick={preBtnClicked}
                ></i>
                <i
                  className="nxt-btn bi bi-chevron-right"
                  onClick={nxtBtnClicked}
                ></i>
                <div className="orderFeaturesInProductDetailsPage d-flex gap-3 gap-sm-4 gap-md-5 px-sm-4">
                  <div
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                    style={{ width: "50px", minWidth: "50px" }}
                  >
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"
                      alt="returnProductIcon"
                      className="w-100 img-fluid"
                    />
                    <p
                      className="lh-1 m-0 text-center"
                      style={{ fontSize: "10px" }}
                    >
                      10 days Return & Exchange
                    </p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                    style={{ width: "50px", minWidth: "50px" }}
                  >
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"
                      alt="freeDeliveryIcon"
                      className="w-100 img-fluid"
                    />
                    <p
                      className="lh-1 m-0 text-center"
                      style={{ fontSize: "10px" }}
                    >
                      Free Delivery
                    </p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                    style={{ width: "50px", minWidth: "50px" }}
                  >
                    <img
                      src={cashOnDelivery}
                      alt="cashOnDeliveryIcon"
                      className="bg-body-tertiary p-2 rounded-circle w-100 img-fluid"
                      style={{ width: "80px" }}
                    />
                    <p
                      className="lh-1 m-0 text-center"
                      style={{ fontSize: "10px" }}
                    >
                      Cash on Delivery
                    </p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                    style={{ width: "50px", minWidth: "50px" }}
                  >
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png"
                      alt="securePaymentIcon"
                      className="w-100 img-fluid"
                    />
                    <p
                      className="lh-1 m-0 text-center"
                      style={{ fontSize: "10px" }}
                    >
                      Secure transaction
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <h5>Description</h5>
                <ul>
                  {product.description.map((list, index) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </div>
              <div className="btnContainer2">
                {!user && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => alert("Please login to your account")}
                  >
                    Buy Now
                  </button>
                )}
                {user && !user.address.length && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => alert("Please add your address")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && !size && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => alert("Please select the product size")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && size && (
                  <Link
                    to="/paymentMethods"
                    className="btn btn-primary w-100 my-2 text-decoration-none"
                  >
                    Buy Now{" "}
                  </Link>
                )}
                <br />
                <div>
                  {!user ? (
                    <button
                      className="btn btn-secondary w-100 mb-2"
                      onClick={() => alert("Please login to your account")}
                    >
                      {product.addToCart ? "Added To Cart" : "Add To cart"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary w-100 mb-2"
                      value={product.id}
                      onClick={addToCart}
                    >
                      {product.addToCart ? "Added To Cart" : "Add To cart"}
                    </button>
                  )}
                </div>
                <div>
                  {!user ? (
                    <button
                      className="btn btn-outline-secondary w-100 mb-2"
                      onClick={() => alert("Please login to your account")}
                    >
                      {product.addToWishList
                        ? "Added To Wishlist"
                        : "Save To Wishlist"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-secondary w-100 mb-2"
                      value={product.id}
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
            <div className="bg-white checkoutSidebar ms-auto px-4 py-3 fw-medium border border-secondary">
              <span className="aboutProduct-sidebar-price">
                <span
                  style={{ fontSize: "18px", bottom: "7px" }}
                  className="position-relative"
                >
                  ₹
                </span>
                {Math.round(
                  (
                    product.price -
                    (product.price *
                      (Number(product.offer.replace("%", ""))
                        ? Number(product.offer.replace("%", ""))
                        : Number(product.discount.replace("%", "")))) /
                      100
                  ).toFixed(1),
                )}
              </span>
              {time !== "0:0:0" && (
                <p className="aboutProduct-sidebar-deliveryEstimate lh-sm">
                  FREE delivery
                  <span className="fw-bold"> {setDeliveryDate()}</span>. Order
                  within{" "}
                  <span
                    className="sidebar-deliveryEstimate-orderWithin"
                    style={{ color: "green" }}
                  >
                    {time}
                  </span>
                  .
                  {!size && (
                    <a
                      className="d-block text-decoration-underline"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        alert("Please select the product size First")
                      }
                    >
                      Details
                    </a>
                  )}
                  {size && (
                    <Link
                      to="/paymentMethods"
                      className="d-block text-decoration-underline"
                      style={{ cursor: "pointer" }}
                    >
                      Details
                    </Link>
                  )}
                </p>
              )}
              {user && user.address.length !== 0 && (
                <div className="d-flex align-items-start aboutProduct-sidebar-deliveryLocation">
                  <img
                    className="sidebar-deliveryLocation-locationLogo"
                    src={location}
                    alt="Location icon"
                  />
                  <p className="sidebar-deliveryLocation-locationText lh-sm">
                    Delivering to {user.name} - {address.city} {address.pinCode}
                  </p>
                </div>
              )}
              <p className="aboutProduct-sidebar-stockStatus fw-bold fs-5">
                In stock
              </p>
              <table className="aboutProduct-sidebar-table">
                <tbody>
                  <tr>
                    <td>Ships from</td>
                    <td>{product.shipsFrom}</td>
                  </tr>
                  <tr>
                    <td>Sold by</td>
                    <td>{product.soldBy}</td>
                  </tr>
                  <tr>
                    <td>Payment</td>
                    <td>Secure transaction</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                {!user && (
                  <button
                    className="btn btn-warning w-100 my-2"
                    onClick={() => alert("Please login to your account")}
                  >
                    Buy Now
                  </button>
                )}
                {user && !user.address.length && (
                  <button
                    className="btn btn-warning w-100 my-2"
                    onClick={() => alert("Please add your address")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && !size && (
                  <button
                    className="btn btn-warning rounded w-100 my-2"
                    onClick={() => alert("Please select the product size")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && size && (
                  <Link
                    to="/paymentMethods"
                    className="btn btn-warning rounded w-100 mb-2"
                  >
                    Buy Now
                  </Link>
                )}
                <div>
                  {!user ? (
                    <button
                      className="btn btn-warning rounded w-100 mb-2"
                      onClick={() => alert("Please login to your account")}
                    >
                      {product.addToCart ? "Added To Cart" : "Add To cart"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning rounded w-100 mb-2"
                      value={product.id}
                      onClick={addToCart}
                    >
                      {product.addToCart ? "Added To Cart" : "Add To cart"}
                    </button>
                  )}
                </div>
                <hr className="mt-1 mb-3" />
                <div>
                  {!user ? (
                    <button
                      className="btn btn-outline-secondary rounded w-100"
                      onClick={() => alert("Please login to your account")}
                    >
                      {product.addToWishList
                        ? "Added To Wishlist"
                        : "Save To Wishlist"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-secondary rounded w-100"
                      value={product.id}
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
          </section>
          <hr />
          <section>
            <h3 className="my-3">More items you may like in apparel</h3>
            <div className="row row-gap-3">
              {similarProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-md-4 col-sm-6 col-xl-3 py-2 bg-body-tertiary cardContainer"
                >
                  <Link
                    className="text-decoration-none"
                    to={`/productDetails/${product.id}`}
                  >
                    <div className="card border border-0 similarCards">
                      <img
                        src={product.url}
                        alt="productImage"
                        className="img-fluid similarItemsImage"
                        style={{ minHeight: "250px", maxHeight: "250px" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between align-items-center">
                        <p
                          className="text-center m-0 lh-sm overflow-hidden listProductName lh-base"
                          style={{ height: "72px" }}
                        >
                          {!!Number(product.offer.replace("%", "")) && (
                            <span className="badge text-bg-warning me-1">
                              Diwali Offer
                            </span>
                          )}
                          {product.newArrival === true && (
                            <span className="badge text-bg-primary me-1">
                              New
                            </span>
                          )}
                          {product.freeDelivery && (
                            <span className="badge text-bg-success">
                              Free Deilvery
                            </span>
                          )}{" "}
                          {product.name.length > 61
                            ? product.name.slice(0, 60).concat("...")
                            : product.name}
                        </p>
                        <div>
                          <RatingBar rating={product.rating} />
                        </div>
                        <div>
                          <p className="fw-bold my-2">
                            <b>₹</b>
                            {Math.round(
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
                            )}
                            (-
                            {Number(product.offer.replace("%", ""))
                              ? product.offer
                              : product.discount}
                            )
                          </p>
                          <p
                            id="M.R.P."
                            className="text-decoration-line-through text-center my-0"
                          >
                            M.R.P. ₹{product.price}
                          </p>
                        </div>
                        <div className="w-100 mt-3">
                          <div>
                            {!user ? (
                              <button
                                className="btn btn-secondary w-100 mb-2 addToCart"
                                onClick={() =>
                                  alert("Please login to your account")
                                }
                              >
                                {product.addToCart
                                  ? "Added To Cart"
                                  : "Add To cart"}
                              </button>
                            ) : (
                              <button
                                className="btn btn-secondary w-100 mb-2 addToCart"
                                value={product.id}
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
                                className="btn btn-outline-secondary w-100 mb-2 saveToWishlist"
                                onClick={() =>
                                  alert("Please login to your account")
                                }
                              >
                                {product.addToWishList
                                  ? "Added To Wishlist"
                                  : "Save To Wishlist"}
                              </button>
                            ) : (
                              <button
                                className="btn btn-outline-secondary w-100 mb-2 saveToWishlist"
                                value={product.id}
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
          </section>
        </div>
      </main>
    </>
  )
}

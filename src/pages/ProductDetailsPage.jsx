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
import { toast } from "react-toastify"

export default function ProductDetailsPage() {
  const [search, setSearch] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("")
  const [isUpdated, setUpdated] = useState(false)
  const [time, setTime] = useState("")
  const [isFreeDeliveryAvailable, setFreeDelivery] = useState(false)
  const [expand, setExpand] = useState(false)
  const [showTable1, setShowTable1] = useState(false)
  const [showTable2, setShowTable2] = useState(false)
  const [showTable3, setShowTable3] = useState(false)
  const [showTable4, setShowTable4] = useState(false)
  const [checkBox1Clicked, setCheckBox1Clicked] = useState(false)
  const [checkBox2Clicked, setCheckBox2Clicked] = useState(false)
  const [returnAndExchangePopover, setReturnAndExchangePopover] =
    useState(false)
  const [freeDeliveryPopover, setFreeDeliveryPopover] = useState(false)
  const [payOnDeliveryPopover, setPayOnDeliveryPopover] = useState(false)
  const [secureTransactionPopover, setSecureTransactionPopover] =
    useState(false)
  const [knowMore, setKnowMore] = useState(false)

  const id = Number(useParams().id)

  const { clothsData, setClothsData } = GetClothsData()

  const user = JSON.parse(localStorage.getItem("user"))

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

  const isCloth =
    search !== ""
      ? finalClothsData.filter((cloth) => cloth.commonCategory.includes(search))
          .length
        ? true
        : false
      : false

  useEffect(() => {
    if (search !== "" && !isCloth) {
      toast("No such product available")
    }
  }, [search])

  const product = finalClothsData.find((product) => product.id === id)

  const isClothPresentInCart =
    user && user.addToCartItems.filter((item) => item.id === product.id)

  if (isClothPresentInCart && isClothPresentInCart.length) {
    product.addToCart = true
    product.quantity = isClothPresentInCart[0].quantity
      ? isClothPresentInCart[0].quantity
      : 1
    product.size = isClothPresentInCart[0].size
      ? isClothPresentInCart[0].size
      : ""
  }

  /* Reset the quantity and size value of the product in clothsData 
  while i enter the page if this product is not added to cart */
  if (isClothPresentInCart && !isClothPresentInCart.length) {
    product.quantity = quantity
    product.size = size
  }

  const isClothPresentInWishlist =
    user && user.addToWishlistItems.filter((item) => item.id === product.id)

  if (isClothPresentInWishlist && isClothPresentInWishlist.length) {
    product.addToWishList = true
  }

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
    const cloth = finalClothsData.find(
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
        id: cloth.id,
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

    toast("Product added to cart😊")
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
      const item = finalClothsData.find(
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

      toast("Product added to wishlist😊")
    }
  }

  const address =
    user &&
    user.address.length !== 0 &&
    user.address.find((address) => address.selected)

  /* Update createOrder in Database while quantity, size, freeDelivery will change and 
  update user in database while quantity change and if product is already added to cart */
  if (isUpdated) {
    if (isClothPresentInCart.length) {
      if (quantity > 1) {
        isClothPresentInCart[0].quantity = quantity
        localStorage.setItem("user", JSON.stringify(user))
        product.quantity = quantity
      }
    } else {
      if (quantity > 1) {
        product.quantity = quantity
      }
    }
    if (size) {
      const createOrder = JSON.parse(localStorage.getItem("createOrder"))
      createOrder.item.forEach((item) => (item.size = size))
      // product.size = size
      localStorage.setItem("createOrder", JSON.stringify(createOrder))
    }
    if (isFreeDeliveryAvailable) {
      product.freeDelivery = true
    } else {
      product.freeDelivery = false
    }
    const createOrder = JSON.parse(localStorage.getItem("createOrder"))
    const filteredItem = createOrder.item.filter(
      (item) => item.id !== product.id,
    )
    filteredItem.push(product)
    const CreateOrder = { item: filteredItem }
    localStorage.setItem("createOrder", JSON.stringify(CreateOrder))
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
    // set createOrder for every mount
    const obj = { item: [] }
    obj.item.push(product)
    localStorage.setItem("createOrder", JSON.stringify(obj))
  }, [])

  const similarProductIds = product.similarProducts.map((product) => product.id)
  const similarProducts = finalClothsData.filter((product) =>
    similarProductIds.includes(product.id),
  )

  const additionalInformationKeys = Object.keys(
    product.productDetails.additionalInformation,
  )

  const itemDetailsKeys = Object.keys(product.productDetails.itemDetails)

  const styleKeys = Object.keys(product.productDetails.style)

  const topHighlightsKeys = Object.keys(product.productDetails.topHighlights)

  function camelCaseToTitle(camelCase) {
    const wordsArray = []
    const arrayOfLetters = camelCase.split("")
    arrayOfLetters[0] = arrayOfLetters[0].toUpperCase()
    let firstIndex = 0
    let lastIndex = 0
    arrayOfLetters.forEach((letter) => {
      if (letter.toUpperCase() === letter) {
        const word = arrayOfLetters.slice(firstIndex, lastIndex).join("")
        wordsArray.push(word)
        firstIndex = lastIndex
      }
      lastIndex++
    })
    const lastWord = arrayOfLetters.slice(firstIndex).join("")
    wordsArray.push(lastWord)
    return wordsArray.join(" ")
  }

  function addToCreateOrder(e, productId) {
    const checked = e.target.checked
    const createOrder = JSON.parse(localStorage.getItem("createOrder"))
    const product = finalClothsData.find((item) => item.id === productId)
    const isIncluded = createOrder.item.filter((item) => item.id === product.id)
      .length
      ? true
      : false
    if (checked) {
      if (!isIncluded) {
        if (size) {
          product.size = size
        }
        product.quantity = 1
        createOrder.item.push(product)
        localStorage.setItem("createOrder", JSON.stringify(createOrder))
      }
    } else {
      if (isIncluded) {
        const updatedItem = createOrder.item.filter(
          (item) => item.id !== product.id,
        )
        localStorage.setItem(
          "createOrder",
          JSON.stringify({ item: updatedItem }),
        )
      }
    }
  }

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
        placeHolder="Search Product"
        page="productDetails"
      />
      <SearchInPage
        margin="ms-3"
        setSearch={setSearch}
        page="productDetails"
        placeHolder="Search Product"
      />
      <main className="bg-body-secondary py-3 px-4 py-sm-5 px-sm-5">
        <div className="bg-light-subtle py-3 px-3 productDetailsContainer">
          <section className="d-sm-flex gap-sm-4 gap-xl-5 productDetailsContainerFirstSection">
            <div
              className="productDetailsImage top-0 start-0"
              style={{ minWidth: "200px", maxWidth: "300px" }}
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
                    onClick={() => toast("Please login to your account")}
                  >
                    Buy Now
                  </button>
                )}
                {user && !user.address.length && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => toast("Please add your address")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && !size && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => toast("Please select the product size")}
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
                <div>
                  {!user ? (
                    <button
                      className="btn btn-secondary w-100 mb-2"
                      onClick={() => toast("Please login to your account")}
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
                      onClick={() => toast("Please login to your account")}
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
              <div className="d-flex align-items-end">
                <RatingBar rating={product.rating} />
                <span
                  className="fw-bold"
                  style={{ fontSize: "15px", marginLeft: "5px" }}
                >
                  {" "}
                  {product.rating}
                </span>
              </div>
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
                    className="mx-2 text-center"
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

                      // To update clothsData, createOrder and the variables present in this page
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

                      // To update clothsData, createOrder and the variables present in this page
                      setUpdated(true)

                      // For interactivity
                      const btn = e.target
                      btn.innerHTML = '<i class="bi bi-check2"></i>'
                      setTimeout(() => {
                        btn.innerHTML = "S"
                        btn.style.backgroundColor = "green"
                        btn.style.color = "white"
                        const parentElement = btn.parentElement
                        const siblings = parentElement.children
                        const arrayOfSiblings = [...siblings]
                        arrayOfSiblings.forEach((sibling) => {
                          if (sibling !== btn) {
                            sibling.style.backgroundColor = ""
                            sibling.style.color = ""
                          }
                        })
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

                      // To update clothsData, createOrder and the variables present in this page
                      setUpdated(true)

                      // For interactivity
                      const btn = e.target
                      btn.innerHTML = '<i class="bi bi-check2"></i>'
                      setTimeout(() => {
                        btn.innerHTML = "M"
                        btn.style.backgroundColor = "green"
                        btn.style.color = "white"
                        const parentElement = btn.parentElement
                        const siblings = parentElement.children
                        const arrayOfSiblings = [...siblings]
                        arrayOfSiblings.forEach((sibling) => {
                          if (sibling !== btn) {
                            sibling.style.backgroundColor = ""
                            sibling.style.color = ""
                          }
                        })
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

                      // To update clothsData, createOrder and the variables present in this page
                      setUpdated(true)

                      // For interactivity
                      const btn = e.target
                      btn.innerHTML = '<i class="bi bi-check2"></i>'
                      setTimeout(() => {
                        btn.innerHTML = "L"
                        btn.style.backgroundColor = "green"
                        btn.style.color = "white"
                        const parentElement = btn.parentElement
                        const siblings = parentElement.children
                        const arrayOfSiblings = [...siblings]
                        arrayOfSiblings.forEach((sibling) => {
                          if (sibling !== btn) {
                            sibling.style.backgroundColor = ""
                            sibling.style.color = ""
                          }
                        })
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

                      // To update clothsData, createOrder and the variables present in this page
                      setUpdated(true)

                      // For interactivity
                      const btn = e.target
                      btn.innerHTML = '<i class="bi bi-check2"></i>'
                      setTimeout(() => {
                        btn.innerHTML = "XL"
                        btn.style.backgroundColor = "green"
                        btn.style.color = "white"
                        const parentElement = btn.parentElement
                        const siblings = parentElement.children
                        const arrayOfSiblings = [...siblings]
                        arrayOfSiblings.forEach((sibling) => {
                          if (sibling !== btn) {
                            sibling.style.backgroundColor = ""
                            sibling.style.color = ""
                          }
                        })
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

                      // To update clothsData, createOrder and the variables present in this page
                      setUpdated(true)

                      // For interactivity
                      const btn = e.target
                      btn.innerHTML = '<i class="bi bi-check2"></i>'
                      setTimeout(() => {
                        btn.innerHTML = "XXL"
                        btn.style.backgroundColor = "green"
                        btn.style.color = "white"
                        const parentElement = btn.parentElement
                        const siblings = parentElement.children
                        const arrayOfSiblings = [...siblings]
                        arrayOfSiblings.forEach((sibling) => {
                          if (sibling !== btn) {
                            sibling.style.backgroundColor = ""
                            sibling.style.color = ""
                          }
                        })
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
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures returnAndExchange"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setReturnAndExchangePopover(
                        returnAndExchangePopover ? false : true,
                      )
                      setFreeDeliveryPopover(false)
                      setPayOnDeliveryPopover(false)
                      setSecureTransactionPopover(false)
                      setKnowMore(false)
                    }}
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
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures freeDelivery"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFreeDeliveryPopover(freeDeliveryPopover ? false : true)
                      setReturnAndExchangePopover(false)
                      setPayOnDeliveryPopover(false)
                      setSecureTransactionPopover(false)
                    }}
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
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures payOnDelivery"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setPayOnDeliveryPopover(
                        payOnDeliveryPopover ? false : true,
                      )
                      setFreeDeliveryPopover(false)
                      setReturnAndExchangePopover(false)
                      setSecureTransactionPopover(false)
                    }}
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
                      Pay on Delivery
                    </p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center gap-1 buyingFeatures secureTransaction"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSecureTransactionPopover(
                        secureTransactionPopover ? false : true,
                      )
                      setPayOnDeliveryPopover(false)
                      setFreeDeliveryPopover(false)
                      setReturnAndExchangePopover(false)
                    }}
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
              <div className="popoverContainer position-relative">
                {returnAndExchangePopover && (
                  <div className="popover">
                    <div
                      className="position-absolute"
                      style={{
                        top: "-14px",
                        left: "37px",
                      }}
                    >
                      <i class="bi bi-chevron-up"></i>
                    </div>
                    <div className="d-flex justify-content-between pb-2 fw-bold">
                      <h6>10 days Return & Exchange</h6>
                      <i
                        className="bi bi-x-lg fs-6"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setReturnAndExchangePopover(false)
                          setKnowMore(false)
                        }}
                      ></i>
                    </div>
                    <table>
                      <thead>
                        <tr className="border-secondary-subtle border-top border-bottom">
                          <th className="py-2">Return Reason</th>
                          <th className="py-2">Return Period</th>
                          <th className="py-2">Return Policy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-secondary-subtle border-bottom">
                          <td className="py-1">Any other reason</td>
                          <td className="py-1">10 days from delivery</td>
                          <td className="py-1">Full refund</td>
                        </tr>
                        <tr className="border-secondary-subtle border-bottom">
                          <td className="py-1">
                            Size too large, Size too small
                          </td>
                          <td className="py-1">10 days from delivery</td>
                          <td className="py-1">
                            Exchange with a different size or colour
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      className="mt-3 mb-2 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setKnowMore(knowMore ? false : true)}
                    >
                      {knowMore ? (
                        <span className="me-1">Know Less</span>
                      ) : (
                        <span className="me-1">Know More</span>
                      )}
                      {knowMore ? (
                        <i className="bi bi-chevron-up"></i>
                      ) : (
                        <i className="bi bi-chevron-down"></i>
                      )}
                    </div>
                    {knowMore && (
                      <div>
                        <h5>Return Instructions</h5>
                        <div className="d-flex gap-3">
                          <img
                            src="https://m.media-amazon.com/images/I/11Sa2OpQXzL.png"
                            style={{ width: "100px" }}
                            alt="return"
                          />
                          <p>
                            Keep the item in its original condition and
                            packaging along with MRP tag and accessories for a
                            successful pick-up.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {freeDeliveryPopover && (
                  <div className="popover">
                    <div
                      className="position-absolute"
                      style={{
                        top: "-14px",
                        left: "137px",
                      }}
                    >
                      <i class="bi bi-chevron-up"></i>
                    </div>
                    <div className="d-flex justify-content-between fw-bold pb-2">
                      <h6>Free Delivery</h6>
                      <i
                        className="bi bi-x-lg fs-6"
                        style={{ cursor: "pointer" }}
                        onClick={() => setFreeDeliveryPopover(false)}
                      ></i>
                    </div>
                    {product.freeDelivery ? (
                      <p>The product is eligible for Free delivery.</p>
                    ) : (
                      <p>The product is not eligible for Free delivery.</p>
                    )}
                  </div>
                )}
                {payOnDeliveryPopover && (
                  <div className="popover">
                    <div
                      className="position-absolute"
                      style={{
                        top: "-14px",
                        left: "237px",
                      }}
                    >
                      <i class="bi bi-chevron-up"></i>
                    </div>
                    <div className="d-flex justify-content-between fw-bold pb-2">
                      <h6>What is Pay on Delivery (Cash/Card)?</h6>
                      <i
                        className="bi bi-x-lg fs-6"
                        style={{ cursor: "pointer" }}
                        onClick={() => setPayOnDeliveryPopover(false)}
                      ></i>
                    </div>
                    <p>
                      Pay on Delivery (Cash/Card) payment method includes Cash
                      on Delivery (COD) as well as Debit card / Credit card /
                      Net banking payments at your doorstep.
                    </p>
                  </div>
                )}
                {secureTransactionPopover && (
                  <div className="popover">
                    <div
                      className="position-absolute"
                      style={{
                        top: "-14px",
                        left: "337px",
                      }}
                    >
                      <i class="bi bi-chevron-up"></i>
                    </div>
                    <div className="d-flex justify-content-between fw-bold pb-2">
                      <h6>Your transaction is secure</h6>
                      <i
                        className="bi bi-x-lg fs-6"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSecureTransactionPopover(false)}
                      ></i>
                    </div>
                    <p>
                      We work hard to protect your security and privacy. Our
                      payment security system encrypts your information during
                      transmission. We don’t share your credit card details with
                      third-party sellers, and we don’t sell your information to
                      others.
                    </p>
                  </div>
                )}
              </div>
              <hr />
              <div>
                <h5>Description</h5>
                <ul
                  className={`mb-0 ${expand ? "" : "productDescriptionLimit"}`}
                >
                  {product.description.map((list, index) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
                <div
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setExpand(expand ? false : true)}
                >
                  <span>{expand ? "show less" : "show more"}</span>{" "}
                  {expand ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </div>
              </div>
              <div className="btnContainer2">
                {!user && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => toast("Please login to your account")}
                  >
                    Buy Now
                  </button>
                )}
                {user && !user.address.length && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => toast("Please add your address")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && !size && (
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => toast("Please select the product size")}
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
                      onClick={() => toast("Please login to your account")}
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
                      onClick={() => toast("Please login to your account")}
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
                      onClick={() => toast("Please select the product size")}
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
                    onClick={() => toast("Please login to your account")}
                  >
                    Buy Now
                  </button>
                )}
                {user && !user.address.length && (
                  <button
                    className="btn btn-warning w-100 my-2"
                    onClick={() => toast("Please add your address")}
                  >
                    Buy Now
                  </button>
                )}
                {user && user.address.length !== 0 && !size && (
                  <button
                    className="btn btn-warning rounded w-100 my-2"
                    onClick={() => toast("Please select the product size")}
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
                      onClick={() => toast("Please login to your account")}
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
                      onClick={() => toast("Please login to your account")}
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
          <section className="frequentlyBoughtSection">
            <h3 className="mt-2 mb-4">Frequently bought together</h3>
            <div className="frequentlyBoughtContainer">
              <div className="frequently-bought-item">
                <div className="frequently-bought-image">
                  <img src={product.url} alt="Frequently bought item 1" />
                  <input type="checkbox" checked readOnly />
                </div>
                <p
                  style={{
                    height: "67px",
                    overflow: "hidden",
                    fontSize: "14px",
                    marginBottom: "0px",
                  }}
                >
                  <span className="fw-bold">This item:</span>{" "}
                  {product.name.length > 71
                    ? product.name.slice(0, 70).concat("...")
                    : product.name}
                </p>
                <div className="item-price">
                  <b>₹</b>
                  <span>
                    {Math.round(
                      product.price -
                        (product.price *
                          (Number(product.offer.replace("%", ""))
                            ? Number(product.offer.replace("%", ""))
                            : Number(product.discount.replace("%", "")))) /
                          100,
                    )}
                  </span>
                  <span className="ms-1">
                    (-
                    {Number(product.offer.replace("%", ""))
                      ? product.offer
                      : product.discount}
                    )
                  </span>
                </div>
              </div>
              <span className="plus-symbol" style={{ fontSize: "30px" }}>
                +
              </span>
              <div className="frequently-bought-item">
                <div className="frequently-bought-image">
                  <img
                    src={similarProducts[2].url}
                    alt="Frequently bought item 2"
                  />
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    onChange={(e) => {
                      addToCreateOrder(e, similarProducts[2].id)
                      setCheckBox1Clicked(checkBox1Clicked ? false : true)
                    }}
                  />
                </div>
                <a
                  href={`/productDetails/${similarProducts[2].id}`}
                  style={{
                    height: "67px",
                    overflow: "hidden",
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "0px",
                  }}
                >
                  {similarProducts[2].name.length > 71
                    ? similarProducts[2].name.slice(0, 70).concat("...")
                    : similarProducts[2].name}
                </a>
                <div className="item-price text-black">
                  <b>₹</b>
                  <span>
                    {Math.round(
                      similarProducts[2].price -
                        (similarProducts[2].price *
                          (Number(similarProducts[2].offer.replace("%", ""))
                            ? Number(similarProducts[2].offer.replace("%", ""))
                            : Number(
                                similarProducts[2].discount.replace("%", ""),
                              ))) /
                          100,
                    )}
                  </span>
                  <span className="ms-1">
                    (-
                    {Number(similarProducts[2].offer.replace("%", ""))
                      ? similarProducts[2].offer
                      : similarProducts[2].discount}
                    )
                  </span>
                </div>
              </div>
              <span
                className="plus-symbol frequentlyBoughtThirdPlusSymbol"
                style={{ fontSize: "30px" }}
              >
                +
              </span>
              <div className="frequently-bought-item frequentlyBoughtThirdItem">
                <div className="frequently-bought-image">
                  <img
                    src={similarProducts[3].url}
                    alt="Frequently bought item 3"
                  />
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    onChange={(e) => {
                      addToCreateOrder(e, similarProducts[3].id)
                      setCheckBox2Clicked(checkBox2Clicked ? false : true)
                    }}
                  />
                </div>
                <a
                  href={`/productDetails/${similarProducts[3].id}`}
                  style={{
                    height: "67px",
                    overflow: "hidden",
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "0px",
                  }}
                >
                  {similarProducts[3].name.length > 71
                    ? similarProducts[3].name.slice(0, 70).concat("...")
                    : similarProducts[3].name}
                </a>
                <div className="item-price text-black">
                  <b>₹</b>
                  <span>
                    {Math.round(
                      similarProducts[3].price -
                        (similarProducts[3].price *
                          (Number(similarProducts[3].offer.replace("%", ""))
                            ? Number(similarProducts[3].offer.replace("%", ""))
                            : Number(
                                similarProducts[3].discount.replace("%", ""),
                              ))) /
                          100,
                    )}
                  </span>
                  <span className="ms-1">
                    (-
                    {Number(similarProducts[3].offer.replace("%", ""))
                      ? similarProducts[3].offer
                      : similarProducts[3].discount}
                    )
                  </span>
                </div>
              </div>
              <div className="frequentlyBroughtPriceSection">
                <div className="text-center fw-medium">
                  <p className="d-inline-block fs-6 mb-0">Total Price:</p>
                  <p className="d-inline-block ms-1 mb-0">
                    ₹
                    <span>
                      {Math.round(
                        product.price -
                          (product.price *
                            (Number(product.offer.replace("%", ""))
                              ? Number(product.offer.replace("%", ""))
                              : Number(product.discount.replace("%", "")))) /
                            100,
                      ) +
                        (checkBox1Clicked
                          ? Math.round(
                              similarProducts[2].price -
                                (similarProducts[2].price *
                                  (Number(
                                    similarProducts[2].offer.replace("%", ""),
                                  )
                                    ? Number(
                                        similarProducts[2].offer.replace(
                                          "%",
                                          "",
                                        ),
                                      )
                                    : Number(
                                        similarProducts[2].discount.replace(
                                          "%",
                                          "",
                                        ),
                                      ))) /
                                  100,
                            )
                          : 0) +
                        (checkBox2Clicked
                          ? Math.round(
                              similarProducts[3].price -
                                (similarProducts[3].price *
                                  (Number(
                                    similarProducts[3].offer.replace("%", ""),
                                  )
                                    ? Number(
                                        similarProducts[3].offer.replace(
                                          "%",
                                          "",
                                        ),
                                      )
                                    : Number(
                                        similarProducts[3].discount.replace(
                                          "%",
                                          "",
                                        ),
                                      ))) /
                                  100,
                            )
                          : 0)}
                    </span>
                  </p>
                </div>
                <div
                  className="frequentlyBroughtBuyNowBtn"
                  style={{ width: "250px" }}
                >
                  {!user && (
                    <button
                      className="btn btn-warning w-100 my-2 rounded-pill"
                      onClick={() => toast("Please login to your account")}
                    >
                      Buy now
                    </button>
                  )}
                  {user && !user.address.length && (
                    <button
                      className="btn btn-warning w-100 my-2 rounded-pill"
                      onClick={() => toast("Please add your address")}
                    >
                      Buy now
                    </button>
                  )}
                  {user && user.address.length !== 0 && !size && (
                    <button
                      className="btn btn-warning w-100 my-2 rounded-pill"
                      onClick={() => toast("Please select the product size")}
                    >
                      Buy now
                    </button>
                  )}
                  {user && user.address.length !== 0 && size && (
                    <Link
                      to="/paymentMethods"
                      className="btn btn-warning w-100 mb-2 rounded-pill"
                    >
                      Buy now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
          <hr className="frequentlyBroughtSectionHr" />
          <section className="productSpecsSection">
            <h3>Product information</h3>
            <div className="specsContainer specsContainerFirst">
              <div
                className="Product-details mt-3 additionalInformationTable"
                style={{ cursor: "pointer" }}
                onClick={() => setShowTable1(showTable1 ? false : true)}
              >
                <div className="tableHeader p-2">
                  <h4 className="additionalInformationHeader">
                    Additional Information
                  </h4>
                  {showTable1 ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </div>
                <table className={`${showTable1 ? "showTable" : ""}`}>
                  <tbody>
                    {additionalInformationKeys &&
                      additionalInformationKeys.map((key) => {
                        return (
                          <tr key={key}>
                            <td>{camelCaseToTitle(key)}</td>
                            <td>
                              {
                                product.productDetails.additionalInformation[
                                  key
                                ]
                              }
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <div
                className="Product-details mt-3 itemDetailsTable"
                style={{ cursor: "pointer" }}
                onClick={() => setShowTable2(showTable2 ? false : true)}
              >
                <div className="tableHeader p-2">
                  <h4 className="itemDetailsHeader">Item Details</h4>
                  {showTable2 ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </div>
                <table className={`${showTable2 ? "showTable" : ""}`}>
                  <tbody>
                    {itemDetailsKeys &&
                      itemDetailsKeys.map((key) => {
                        return (
                          <tr key={key}>
                            <td>{camelCaseToTitle(key)}</td>
                            <td>
                              {key !== "bestSellersRank"
                                ? product.productDetails.itemDetails[key]
                                : Object.values(
                                    product.productDetails.itemDetails
                                      .bestSellersRank,
                                  ).join(", ")}
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="specsContainer specsContainerSecond">
              <div
                className="Product-details mt-3 styleTable"
                style={{ cursor: "pointer" }}
                onClick={() => setShowTable3(showTable3 ? false : true)}
              >
                <div className="tableHeader p-2">
                  <h4 className="styleHeader">Style</h4>
                  {showTable3 ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </div>
                <table className={`${showTable3 ? "showTable" : ""}`}>
                  <tbody>
                    {styleKeys &&
                      styleKeys.map((key) => {
                        return (
                          <tr key={key}>
                            <td>{camelCaseToTitle(key)}</td>
                            <td>{product.productDetails.style[key]}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <div
                className="Product-details mt-3 topHighlightsTable"
                style={{ cursor: "pointer" }}
                onClick={() => setShowTable4(showTable4 ? false : true)}
              >
                <div className="tableHeader p-2">
                  <h4 className="topHighlightsHeader">Top Highlights</h4>
                  {showTable4 ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </div>
                <table className={`${showTable4 ? "showTable" : ""}`}>
                  <tbody>
                    {topHighlightsKeys &&
                      topHighlightsKeys.map((key) => {
                        return (
                          <tr key={key}>
                            <td>{camelCaseToTitle(key)}</td>
                            <td>{product.productDetails.topHighlights[key]}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <hr className="productSpecsSectionHr" />
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

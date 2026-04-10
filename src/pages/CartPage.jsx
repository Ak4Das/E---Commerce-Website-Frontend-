import styles from "../style_modules/pages_modules/CartPage.module.css"
import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import { useState } from "react"
import SearchInPage from "../components/SearchInPage"
import { toast } from "react-toastify"
import { useEffect } from "react"
import {
  fetchCreateOrder,
  updateAllItemsInCreateOrder,
  fetchUserById,
  updateWishlistItemsInUser,
  updateCartItemsInUser,
} from "../components/FetchRequests.js"
import CartPageShimmer from "../shimmers/CartPage.shimmer.jsx"

export default function CartPage() {
  const [search, setSearch] = useState("")
  const [isUpdated, setUpdated] = useState(false)
  const { clothsData, setClothsData } = GetClothsData()
  const [isRemoveFromCart, setIsRemoveFromCart] = useState(false)
  const [isOrderConfirmed, setConfirmOrder] = useState(false)

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

  const userId = localStorage.getItem("userId")
  const [user, setUser] = useState(null)

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
    } else {
      delete cloth.addToCart
    }
    const isClothPresentInWishlist =
      user && user.addToWishlistItems.filter((item) => item.id === cloth.id)
    if (isClothPresentInWishlist && isClothPresentInWishlist.length) {
      cloth.addToWishList = true
    } else {
      delete cloth.addToWishList
    }
    return cloth
  })

  const productsInCart = user
    ? user.addToCartItems.map((cartItem) => {
        const cloth = finalClothsData.find((item) => item.id === cartItem.id)
        cloth.addToCart = true
        cloth.quantity = cartItem.quantity
        cloth.size = cartItem.size
        return cloth
      })
    : []
  const idOfProductsInCart = productsInCart.map((product) => product.id)

  const [CreateOrderInDatabase, setCreateOrderInDatabase] = useState(null)
  const uniqueCreateOrderInDatabase =
    CreateOrderInDatabase &&
    CreateOrderInDatabase.reduce((acc, item) => {
      if (!acc.length) {
        acc.push(item)
      } else {
        const searchInAcc = acc.find((obj) => obj.id === item.id) ? true : false
        if (!searchInAcc) {
          acc.push(item)
        }
      }
      return acc
    }, [])
  const createOrderInDatabase = { item: uniqueCreateOrderInDatabase }

  const [url, setUrl] = useState("")
  const [data, setData] = useState([])
  useEffect(() => {
    if (url !== "") {
      async function updateItems() {
        await updateAllItemsInCreateOrder(url, data)
        setUpdated(true)
      }
      updateItems()
    }
  }, [url])

  const idOfCreateOrderInDatabase =
    createOrderInDatabase &&
    createOrderInDatabase.item &&
    createOrderInDatabase.item.map((product) => product.id)

  /* The Following if statement Maintaining createOrder because entire logic written 
  below this if statement is only depend on createOrder data not on finalClothsData */
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
        if (url === "" && productsInCart.length) {
          setUrl("http://localhost:3000/createOrder/updateItems")
          setData(productsInCart)
        }
      }
      if (idOfProductsInCart && idOfCreateOrderInDatabase) {
        if (idOfProductsInCart.length !== idOfCreateOrderInDatabase.length) {
          if (url === "" && productsInCart.length) {
            setUrl("http://localhost:3000/createOrder/updateItems")
            setData(productsInCart)
          }
        }
      }
    } else {
      if (url === "" && productsInCart.length) {
        setUrl("http://localhost:3000/createOrder/updateItems")
        setData(productsInCart)
      }
    }
  }

  const ProductsInCart =
    user &&
    idOfProductsInCart.length &&
    createOrderInDatabase &&
    createOrderInDatabase.item

  async function moveToWishlist(e) {
    // To stop Event Bubbling
    e.preventDefault()
    e.stopPropagation()

    const isAddedToWishlist = user.addToWishlistItems.filter(
      (item) => item.id === Number(e.target.value),
    )
    if (!isAddedToWishlist.length) {
      // Update user in Database
      user.addToWishlistItems.push({ id: Number(e.target.value) })
      await updateWishlistItemsInUser(user._id, user.addToWishlistItems)

      // Update finalClothsData in memory
      const item = finalClothsData.find(
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
        (await updateAllItemsInCreateOrder(
          "http://localhost:3000/createOrder/updateItems",
          createOrderInDatabase.item,
        ))

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

      toast("Product added to wishlist😊")
    }
  }

  useEffect(() => {
    async function fetchData() {
      const createOrder = await fetchCreateOrder()
      setCreateOrderInDatabase(createOrder)
      const user = await fetchUserById(userId)
      setUser(user)
      if (isUpdated) {
        setIsRemoveFromCart(false)
        setUpdated(false)
      }
    }
    fetchData()
  }, [isUpdated])

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
      {userId && !user ? (
        <CartPageShimmer />
      ) : (
        <>
          <Header
            position="static"
            top="auto"
            zIndex="auto"
            setSearch={setSearch}
            placeHolder="Search Product"
            page="cartPage"
            userDetails={user}
          />
          <SearchInPage
            margin="ms-3"
            setSearch={setSearch}
            page="cartPage"
            placeHolder="Search Product"
          />
          <main className="bg-body-secondary pb-3">
            <div className="container">
              <h3 className="py-4 text-center">My Cart</h3>
              <div
                className={`d-md-flex justify-content-between align-items-start ${styles.cartContainer}`}
              >
                <section className={`${styles.productsInCurt}`}>
                  {!!ProductsInCart &&
                    ProductsInCart.map((product) => {
                      return (
                        <div key={product.id} className="row mb-3">
                          <div className="col-sm-12 col-md-12 mb-3">
                            <Link
                              className="text-decoration-none"
                              to={`/productDetails/${product.id}`}
                            >
                              <div
                                className={`card flex-lg-row gap-4 ${styles.productCardInCart} m-auto`}
                              >
                                <img
                                  src={product.url}
                                  alt="productImage"
                                  className={`${styles.imageOnProductCurt}`}
                                />
                                <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-2">
                                  <div>
                                    <p
                                      className={`lh-sm fs-5 fw-bold m-0 mb-2 ${styles.productNameOnCartPage} overflow-hidden`}
                                    >
                                      {product.name.length > 61
                                        ? product.name
                                            .slice(0, 60)
                                            .concat("...")
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
                                                    product.offer.replace(
                                                      "%",
                                                      "",
                                                    ),
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
                                      <span
                                        className={`fw-bold me-2 ${styles.quantityText}`}
                                      >
                                        Quantity:{" "}
                                      </span>
                                      <div
                                        className={`${styles.quantityBtnContainer} mb-3`}
                                      >
                                        <button
                                          className="rounded-circle border border-1"
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                          }}
                                          onClick={async (e) => {
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
                                                e.target.nextElementSibling
                                                  .value,
                                              )
                                              await updateAllItemsInCreateOrder(
                                                "http://localhost:3000/createOrder/updateItems",
                                                ProductsInCart,
                                              )

                                              // Update user in Database
                                              const clothItem =
                                                user.addToCartItems.find(
                                                  (item) =>
                                                    item.id === product.id,
                                                )
                                              clothItem.quantity = Number(
                                                e.target.nextElementSibling
                                                  .value,
                                              )
                                              await updateCartItemsInUser(
                                                user._id,
                                                user.addToCartItems,
                                              )

                                              // Update finalClothsData in memory
                                              const cloth =
                                                finalClothsData.find(
                                                  (cloth) =>
                                                    cloth.id === product.id,
                                                )
                                              cloth.quantity = Number(
                                                e.target.nextElementSibling
                                                  .value,
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
                                          style={{
                                            width: "30px",
                                            textAlign: "center",
                                          }}
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
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                          }}
                                          onClick={async (e) => {
                                            // To stop Event Bubbling
                                            e.preventDefault()
                                            e.stopPropagation()

                                            // Update the input element value
                                            let inputElementValue = Number(
                                              e.target.previousElementSibling
                                                .value,
                                            )
                                            e.target.previousElementSibling.value =
                                              ++inputElementValue

                                            // Update createOrder in Database
                                            product.quantity = Number(
                                              e.target.previousElementSibling
                                                .value,
                                            )
                                            await updateAllItemsInCreateOrder(
                                              "http://localhost:3000/createOrder/updateItems",
                                              ProductsInCart,
                                            )

                                            // Update user in Database
                                            const clothItem =
                                              user.addToCartItems.find(
                                                (item) =>
                                                  item.id === product.id,
                                              )
                                            clothItem.quantity = Number(
                                              e.target.previousElementSibling
                                                .value,
                                            )
                                            await updateCartItemsInUser(
                                              user._id,
                                              user.addToCartItems,
                                            )

                                            // Update finalClothsData in memory
                                            const cloth = finalClothsData.find(
                                              (cloth) =>
                                                cloth.id === product.id,
                                            )
                                            cloth.quantity = Number(
                                              e.target.previousElementSibling
                                                .value,
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
                                      <span
                                        className={`${styles.sizeText} fw-bold me-1 me-xl-3`}
                                      >
                                        Size:{" "}
                                      </span>
                                      <div
                                        className={`${styles.sizeBtnContainer}`}
                                      >
                                        <button
                                          className="border border-1 me-2 mb-2"
                                          style={{
                                            backgroundColor:
                                              product.size === "S"
                                                ? "green"
                                                : "",
                                            color:
                                              product.size === "S"
                                                ? "white"
                                                : "",
                                          }}
                                          onClick={async (e) => {
                                            // To stop Event Bubbling
                                            e.preventDefault()
                                            e.stopPropagation()

                                            // Update createOrder in Database
                                            product.size = "S"
                                            await updateAllItemsInCreateOrder(
                                              "http://localhost:3000/createOrder/updateItems",
                                              ProductsInCart,
                                            )

                                            // Update finalClothsData in memory
                                            const cloth = finalClothsData.find(
                                              (cloth) =>
                                                cloth.id === product.id,
                                            )
                                            cloth.size = "S"

                                            // Update user in Database
                                            const clothItem =
                                              user.addToCartItems.find(
                                                (item) =>
                                                  item.id === product.id,
                                              )
                                            clothItem.size = "S"
                                            await updateCartItemsInUser(
                                              user._id,
                                              user.addToCartItems,
                                            )

                                            // To update the variables present in this page
                                            setUpdated(true)

                                            // For interactivity
                                            const btn = e.target
                                            btn.innerHTML =
                                              '<i class="bi bi-check2"></i>'
                                            setTimeout(() => {
                                              btn.innerHTML = "S"
                                              btn.style.backgroundColor =
                                                "green"
                                              btn.style.color = "white"
                                              const parentElement =
                                                btn.parentElement
                                              const siblings =
                                                parentElement.children
                                              const arrayOfSiblings = [
                                                ...siblings,
                                              ]
                                              arrayOfSiblings.forEach(
                                                (sibling) => {
                                                  if (sibling !== btn) {
                                                    sibling.style.backgroundColor =
                                                      ""
                                                    sibling.style.color = ""
                                                  }
                                                },
                                              )
                                            }, 500)
                                          }}
                                        >
                                          S
                                        </button>
                                        <button
                                          className="border border-1 me-2 mb-2"
                                          style={{
                                            backgroundColor:
                                              product.size === "M"
                                                ? "green"
                                                : "",
                                            color:
                                              product.size === "M"
                                                ? "white"
                                                : "",
                                          }}
                                          onClick={async (e) => {
                                            // To stop Event Bubbling
                                            e.preventDefault()
                                            e.stopPropagation()

                                            // Update createOrder in Database
                                            product.size = "M"
                                            await updateAllItemsInCreateOrder(
                                              "http://localhost:3000/createOrder/updateItems",
                                              ProductsInCart,
                                            )

                                            // Update finalClothsData in memory
                                            const cloth = finalClothsData.find(
                                              (cloth) =>
                                                cloth.id === product.id,
                                            )
                                            cloth.size = "M"

                                            // Update user in Database
                                            const clothItem =
                                              user.addToCartItems.find(
                                                (item) =>
                                                  item.id === product.id,
                                              )
                                            clothItem.size = "M"
                                            await updateCartItemsInUser(
                                              user._id,
                                              user.addToCartItems,
                                            )

                                            // To update the variables present in this page
                                            setUpdated(true)

                                            // For interactivity
                                            const btn = e.target
                                            btn.innerHTML =
                                              '<i class="bi bi-check2"></i>'
                                            setTimeout(() => {
                                              btn.innerHTML = "M"
                                              btn.style.backgroundColor =
                                                "green"
                                              btn.style.color = "white"
                                              const parentElement =
                                                btn.parentElement
                                              const siblings =
                                                parentElement.children
                                              const arrayOfSiblings = [
                                                ...siblings,
                                              ]
                                              arrayOfSiblings.forEach(
                                                (sibling) => {
                                                  if (sibling !== btn) {
                                                    sibling.style.backgroundColor =
                                                      ""
                                                    sibling.style.color = ""
                                                  }
                                                },
                                              )
                                            }, 500)
                                          }}
                                        >
                                          M
                                        </button>
                                        <button
                                          className="border border-1 me-2 mb-2"
                                          style={{
                                            backgroundColor:
                                              product.size === "L"
                                                ? "green"
                                                : "",
                                            color:
                                              product.size === "L"
                                                ? "white"
                                                : "",
                                          }}
                                          onClick={async (e) => {
                                            // To stop Event Bubbling
                                            e.preventDefault()
                                            e.stopPropagation()

                                            // Update createOrder in Database
                                            product.size = "L"
                                            await updateAllItemsInCreateOrder(
                                              "http://localhost:3000/createOrder/updateItems",
                                              ProductsInCart,
                                            )

                                            // Update finalClothsData in memory
                                            const cloth = finalClothsData.find(
                                              (cloth) =>
                                                cloth.id === product.id,
                                            )
                                            cloth.size = "L"

                                            // Update user in Database
                                            const clothItem =
                                              user.addToCartItems.find(
                                                (item) =>
                                                  item.id === product.id,
                                              )
                                            clothItem.size = "L"
                                            await updateCartItemsInUser(
                                              user._id,
                                              user.addToCartItems,
                                            )

                                            // To update the variables present in this page
                                            setUpdated(true)

                                            // For interactivity
                                            const btn = e.target
                                            btn.innerHTML =
                                              '<i class="bi bi-check2"></i>'
                                            setTimeout(() => {
                                              btn.innerHTML = "L"
                                              btn.style.backgroundColor =
                                                "green"
                                              btn.style.color = "white"
                                              const parentElement =
                                                btn.parentElement
                                              const siblings =
                                                parentElement.children
                                              const arrayOfSiblings = [
                                                ...siblings,
                                              ]
                                              arrayOfSiblings.forEach(
                                                (sibling) => {
                                                  if (sibling !== btn) {
                                                    sibling.style.backgroundColor =
                                                      ""
                                                    sibling.style.color = ""
                                                  }
                                                },
                                              )
                                            }, 500)
                                          }}
                                        >
                                          L
                                        </button>
                                        <button
                                          className="border border-1 me-2 mb-2"
                                          style={{
                                            backgroundColor:
                                              product.size === "XL"
                                                ? "green"
                                                : "",
                                            color:
                                              product.size === "XL"
                                                ? "white"
                                                : "",
                                          }}
                                          onClick={async (e) => {
                                            // To stop Event Bubbling
                                            e.preventDefault()
                                            e.stopPropagation()

                                            // Update createOrder in Database
                                            product.size = "XL"
                                            await updateAllItemsInCreateOrder(
                                              "http://localhost:3000/createOrder/updateItems",
                                              ProductsInCart,
                                            )

                                            // Update finalClothsData in memory
                                            const cloth = finalClothsData.find(
                                              (cloth) =>
                                                cloth.id === product.id,
                                            )
                                            cloth.size = "XL"

                                            // Update user in Database
                                            const clothItem =
                                              user.addToCartItems.find(
                                                (item) =>
                                                  item.id === product.id,
                                              )
                                            clothItem.size = "XL"
                                            await updateCartItemsInUser(
                                              user._id,
                                              user.addToCartItems,
                                            )

                                            // To update the variables present in this page
                                            setUpdated(true)

                                            // For interactivity
                                            const btn = e.target
                                            btn.innerHTML =
                                              '<i class="bi bi-check2"></i>'
                                            setTimeout(() => {
                                              btn.innerHTML = "XL"
                                              btn.style.backgroundColor =
                                                "green"
                                              btn.style.color = "white"
                                              const parentElement =
                                                btn.parentElement
                                              const siblings =
                                                parentElement.children
                                              const arrayOfSiblings = [
                                                ...siblings,
                                              ]
                                              arrayOfSiblings.forEach(
                                                (sibling) => {
                                                  if (sibling !== btn) {
                                                    sibling.style.backgroundColor =
                                                      ""
                                                    sibling.style.color = ""
                                                  }
                                                },
                                              )
                                            }, 500)
                                          }}
                                        >
                                          XL
                                        </button>
                                        <button
                                          className="border border-1 mb-2"
                                          style={{
                                            backgroundColor:
                                              product.size === "XXL"
                                                ? "green"
                                                : "",
                                            color:
                                              product.size === "XXL"
                                                ? "white"
                                                : "",
                                          }}
                                          onClick={async (e) => {
                                            // To stop Event Bubbling
                                            e.preventDefault()
                                            e.stopPropagation()

                                            // Update createOrder in Database
                                            product.size = "XXL"
                                            await updateAllItemsInCreateOrder(
                                              "http://localhost:3000/createOrder/updateItems",
                                              ProductsInCart,
                                            )

                                            // Update finalClothsData in memory
                                            const cloth = finalClothsData.find(
                                              (cloth) =>
                                                cloth.id === product.id,
                                            )
                                            cloth.size = "XXL"

                                            // Update user in Database
                                            const clothItem =
                                              user.addToCartItems.find(
                                                (item) =>
                                                  item.id === product.id,
                                              )
                                            clothItem.size = "XXL"
                                            await updateCartItemsInUser(
                                              user._id,
                                              user.addToCartItems,
                                            )

                                            // To update the variables present in this page
                                            setUpdated(true)

                                            // For interactivity
                                            const btn = e.target
                                            btn.innerHTML =
                                              '<i class="bi bi-check2"></i>'
                                            setTimeout(() => {
                                              btn.innerHTML = "XXL"
                                              btn.style.backgroundColor =
                                                "green"
                                              btn.style.color = "white"
                                              const parentElement =
                                                btn.parentElement
                                              const siblings =
                                                parentElement.children
                                              const arrayOfSiblings = [
                                                ...siblings,
                                              ]
                                              arrayOfSiblings.forEach(
                                                (sibling) => {
                                                  if (sibling !== btn) {
                                                    sibling.style.backgroundColor =
                                                      ""
                                                    sibling.style.color = ""
                                                  }
                                                },
                                              )
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
                                      onClick={async (e) => {
                                        // To stop Event Bubbling
                                        e.preventDefault()
                                        e.stopPropagation()

                                        // Update finalClothsData in memory
                                        const item = finalClothsData.find(
                                          (Product) =>
                                            Product.id === product.id,
                                        )
                                        if (item) {
                                          item.addToCart = false
                                          delete item.quantity
                                          delete item.size
                                        }

                                        // Update user in Database
                                        const remainingCartItems =
                                          user.addToCartItems.filter(
                                            (item) => item.id !== product.id,
                                          )
                                        await updateCartItemsInUser(
                                          user._id,
                                          remainingCartItems,
                                        )

                                        // Update createOrder
                                        const remainingCreateOrderItems =
                                          createOrderInDatabase.item.filter(
                                            (item) => item.id !== product.id,
                                          )
                                        await updateAllItemsInCreateOrder(
                                          "http://localhost:3000/createOrder/updateItems",
                                          remainingCreateOrderItems,
                                        )

                                        setIsRemoveFromCart(true)
                                        setUpdated(true)

                                        toast("Product remove from cart")
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
                <section className={`bg-light px-5 py-4 ${styles.totalBill}`}>
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
                      <p className="d-inline-block w-50 m-0">
                        Delivery Charges
                      </p>
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
                  {!isOrderConfirmed && user && ProductsInCart.length && (
                    <button
                      className="btn btn-warning w-100 my-2"
                      onClick={async (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        await updateAllItemsInCreateOrder(
                          "http://localhost:3000/createOrder/updateItems",
                          createOrderInDatabase.item,
                        )
                        setConfirmOrder(true)
                        setUpdated(true)
                      }}
                    >
                      Proceed to Order
                    </button>
                  )}
                  {isOrderConfirmed && !user && (
                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toast("Please login to your account")
                      }}
                    >
                      Place Order
                    </button>
                  )}
                  {isOrderConfirmed && user && !user.address.length && (
                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toast("Please add your address")
                      }}
                    >
                      Place Order
                    </button>
                  )}
                  {isOrderConfirmed && user && user.address.length !== 0 && (
                    <div>
                      {ProductsInCart &&
                      createOrderInDatabase.item.filter(
                        (product) => product.size,
                      ).length === createOrderInDatabase.item.length ? (
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
                              ? toast(
                                  "Please select size of all the products present in the cart",
                                )
                              : toast("There is no item in cart")
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
      )}
    </>
  )
}

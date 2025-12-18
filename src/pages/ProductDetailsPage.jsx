import Header from "../components/Header"
import cashOnDelivery from "../assets/cash-on-delivery.png"
import { useParams } from "react-router-dom"
import GetClothsData from "../components/GetClothsData"
import { Link } from "react-router-dom"
import RatingBar from "../components/RatingBar"

export default function ProductDetailsPage() {
  const id = Number(useParams().id)
  console.log(id)
  const { clothsData, setClothsData } = GetClothsData()

  function increaseCount(e) {
    let inputElementValue = Number(e.target.previousElementSibling.value)
    e.target.previousElementSibling.value = ++inputElementValue
  }

  function decreaseCount(e) {
    let inputElementValue = Number(e.target.nextElementSibling.value)
    if (inputElementValue > 1) {
      e.target.nextElementSibling.value = --inputElementValue
    }
  }

  function addToCart(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToCart = product.addToCart === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  function addToWishlist(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToWishList = product.addToWishList === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  const product = clothsData.find((product) => product.id === id)
  console.log(product)
  return (
    <>
      <Header />
      <main className="bg-body-secondary py-3 px-4 py-sm-5 px-sm-5">
        <div className="bg-light-subtle py-3 px-3 productDetailsContainer">
          <section className="d-sm-flex gap-sm-4 gap-md-5 align-items-start">
            <div
              className="productDetailsImage top-0 start-0"
              style={{ minWidth: "200px" }}
            >
              <img
                src={product.url}
                alt=""
                className="img-fluid productImage"
              />
              <div className="btnContainer1">
                <Link
                  to={`/paymentMethods/${id}`}
                  className="btn btn-primary w-100 my-2  text-decoration-none"
                >
                  Buy Now{" "}
                </Link>
                <br />
                <button
                  className="btn btn-secondary w-100 mb-2"
                  value={product.id}
                  onClick={addToCart}
                >
                  Add To Cart
                </button>
                <button
                  className="btn btn-outline-secondary w-100 mb-2"
                  value={product.id}
                  onClick={addToWishlist}
                >
                  Add To Wishlist
                </button>
              </div>
            </div>
            <div className="me-sm-5">
              <small className="text-primary">{product.soldBy}</small>
              <p className="fw-bold lh-sm productDescription mb-1">
                {product.name}
              </p>
              <RatingBar rating={product.rating} />
              <span style={{ fontSize: "15px" }}> {product.rating}</span>
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
                  onClick={decreaseCount}
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
                  onClick={increaseCount}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div>
                <span className="fw-bold me-3">Size: </span>
                <button className="border border-1 me-2">S</button>
                <button className="border border-1 me-2">M</button>
                <button className="border border-1 me-2">XL</button>
                <button className="border border-1">XXL</button>
              </div>
              <hr />

              <div className="d-flex gap-3 gap-sm-4 gap-md-5 mx-sm-3">
                <div
                  className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                  style={{ width: "50px" }}
                >
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"
                    alt=""
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
                  style={{ width: "50px" }}
                >
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"
                    alt=""
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
                  style={{ width: "50px" }}
                >
                  <img
                    src={cashOnDelivery}
                    alt=""
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
                  style={{ width: "50px" }}
                >
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png"
                    alt=""
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
              <hr />
              <div>
                <h5>Description</h5>
                <ul>
                  {product.description.map((list) => (
                    <li>{list}</li>
                  ))}
                </ul>
              </div>
              <div className="btnContainer2">
                <button className="btn btn-primary w-100 mb-2">Buy Now</button>
                <button className="btn btn-secondary w-100">Add To Cart</button>
              </div>
            </div>
          </section>
          <hr />
          <section>
            <h3 className="my-3">More items you may like in apparel</h3>
            <div className="row row-gap-3">
              {product.similarProducts.map((product) => (
                <div className="col-md-4 col-sm-6 col-lg-3 col-xxl-2 py-2 bg-body-tertiary cardContainer">
                  <Link
                    className="text-decoration-none"
                    to={`/productDetails/${product.id}`}
                  >
                    <div className="card border border-0 similarCards">
                      <img
                        src={product.url}
                        alt=""
                        className="img-fluid"
                        style={{ minHeight: "250px", maxHeight: "250px" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between align-items-center">
                        <p className="text-center m-0 productName lh-sm listProductName">
                          {product.name.length > 61
                            ? product.name.slice(0, 60).concat("...")
                            : product.name}
                        </p>
                        <div>
                          <RatingBar rating={product.rating} />
                          <span style={{ fontSize: "14px" }}>
                            {" "}
                            {product.rating}
                          </span>
                        </div>
                        <div>
                          <p className="fw-bold my-2">
                            <b>₹</b>
                            {(
                              product.price -
                              (product.price *
                                Number(product.discount.replace("%", ""))) /
                                100
                            ).toFixed(1)}{" "}
                            (-{product.discount})
                          </p>
                          <p
                            id="M.R.P."
                            className="text-decoration-line-through text-center mt-0"
                          >
                            M.R.P. ₹{product.price}
                          </p>
                        </div>
                        <button
                          className="btn btn-secondary w-100"
                          value={product.id}
                          onClick={addToCart}
                        >
                          Add To Cart
                        </button>
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

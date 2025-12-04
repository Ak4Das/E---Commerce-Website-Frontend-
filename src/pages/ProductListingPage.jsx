import GetClothsData from "../components/GetClothsData"
import Header from "../components/Header"
import Offcanvas from "../components/OffCanvas"
import { useParams } from "react-router-dom"

export default function ProductListingPage() {
  const { category } = useParams()
  const { clothsData, setClothsData } = GetClothsData()
  function addToCart(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToCart = product.addToCart === false ? true : false
    // setClothsData(clothsData)
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }
  
  function addToWishlist(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToWishList = product.addToWishList === false ? true : false
    // setClothsData(clothsData)
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  const filteredData = clothsData.filter((data) => data.category === category)

  return (
    <>
      <Header />
      <main className="d-flex">
        <Offcanvas />
        <div className="mx-5 my-3">
          <form role="search" className="searchInApp">
            <input
              className="border border-0 p-2 bg-body-tertiary"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <h4 className="my-3">Showing All Products</h4>
          <div className="row">
            {filteredData.map((product) => (
              <div className="col-sm-6 col-xl-4 col-xxl-3 mb-3">
                <div className="card productCard">
                  <img
                    src={product.url}
                    className="img-fluid imgWidth"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <p id="name" className="my-0 lh-sm">
                        {product.name.length > 61
                          ? product.name.slice(0, 60).concat("...")
                          : product.name}
                      </p>
                      <p id="rating" className="my-2">
                        <b>Rating:</b> {product.rating}
                      </p>
                      <p id="discount" className="my-2">
                        <b>₹</b>
                        {(
                          (product.price *
                            Number(product.discount.replace("%", ""))) /
                          100
                        ).toFixed(1)}{" "}
                        (-{product.discount})
                      </p>
                      <small
                        id="M.R.P."
                        className="text-decoration-line-through"
                      >
                        M.R.P. ₹{product.price}
                      </small>
                    </div>
                    <div>
                      <button
                        value={product.id}
                        className="btn btn-secondary w-100 mb-1"
                        onClick={addToCart}
                      >
                        Add to cart
                      </button>
                      <button
                        value={product.id}
                        className="btn btn-outline-secondary w-100 saveToWishlist"
                        onClick={addToWishlist}
                      >
                        Save to wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

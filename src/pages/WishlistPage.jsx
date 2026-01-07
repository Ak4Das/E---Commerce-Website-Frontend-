import Header from "../components/Header"
import GetClothsData from "../components/GetClothsData"

export default function WishlistPage() {
  const { clothsData, setClothsData } = GetClothsData()

  function moveToCart(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToCart = product.addToCart === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }
  function removeFromWishlist(e) {
    const product = clothsData.find(
      (product) => product.id === Number(e.target.value)
    )
    product.addToWishList = product.addToWishList === false ? true : false
    localStorage.setItem("clothsData", JSON.stringify(clothsData))
    setClothsData(JSON.parse(localStorage.getItem("clothsData")))
  }

  const wishlistProducts = clothsData.filter(
    (product) => product.addToWishList === true
  )

  return (
    <>
      <Header />
      <main className="bg-body-secondary pb-3">
        <div className="container">
          <h3 className="py-3 text-center">My Wishlist</h3>
          <div className="row">
            {wishlistProducts.map((product) => (
              <div className="col-sm-6 col-md-4 col-xl-3 col-xxl-2 cardContainer">
                <div className="card  border border-0">
                  <img
                    src={product.url}
                    alt=""
                    className="img-fluid"
                    style={{ height: "250px" }}
                  />
                  <div className="card-body">
                    <p className="text-center">
                      {product.name.length > 41
                        ? product.name.slice(0, 40).concat("...")
                        : product.name}
                    </p>
                    <p className="text-center fw-bold">
                      <b>₹</b>
                      {(
                        product.price -
                        (product.price *
                          Number(product.discount.replace("%", ""))) /
                          100
                      ).toFixed(1)}{" "}
                      ({product.discount} off)
                    </p>
                    <button
                      className="btn btn-secondary w-100 my-2"
                      value={product.id}
                      onClick={moveToCart}
                    >
                      Move To Cart
                    </button>
                    <button
                      className="btn btn-outline-secondary w-100"
                      value={product.id}
                      onClick={removeFromWishlist}
                    >
                      Remove From Wishlist
                    </button>
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

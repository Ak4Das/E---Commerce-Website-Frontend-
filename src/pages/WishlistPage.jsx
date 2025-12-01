import Header from "../components/Header"

const array = [
  {
    id: 1,
    url: "https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180",
    name: "Lehenga",
    description:
      "Teal Colour Silk Fabric Lagenga Choli comes with a matching blouse",
    price: 100000,
  },
  {
    id: 2,
    url: "https://tse3.mm.bing.net/th/id/OIP.XbH1iGOIR3UiVE2Jff5KOQHaKU?pid=Api&P=0&h=180",
    name: "Lehenga",
    description:
      "Banglori Silk Wedding Lehenga Choli comes with a matching blouse",
    price: 105000,
  },
]

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="bg-body-secondary pb-3">
        <div className="container">
        <h3 className="py-3 text-center">My Wishlist</h3>
        <div className="row">
          {array.map((product) => (
            <div className="col-sm-6 col-md-4 col-xl-3 col-xxl-2 cardContainer">
              <div className="card  border border-0">
                <img
                  src={product.url}
                  alt=""
                  className="img-fluid"
                  style={{ height: "250px" }}
                />
                <div className="card-body">
                  <p className="text-center">{product.description}</p>
                  <p className="text-center fw-bold">₹{product.price}</p>
                  <button className="btn btn-secondary w-100">
                    Move To Cart
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

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header"

const imageUrl = [
  {
    id: 1,
    url: "https://tse2.mm.bing.net/th/id/OIP.fxxDwdsmAFTihRD89cK3jAHaJv?pid=Api&P=0&h=180",
    for: "Men",
    type: "Court",
  },
  {
    id: 2,
    url: "https://tse1.mm.bing.net/th/id/OIP.ESvManl1iB70CHO02ftKRAHaLF?pid=Api&P=0&h=180",
    for: "Men",
    type: "Pant",
  },
  {
    id: 3,
    url: "https://tse2.mm.bing.net/th/id/OIP.X0rcNRRNItEK06oq9-4lMwHaIw?pid=Api&P=0&h=180",
    for: "Men",
    type: "T-shirt",
  },
  {
    id: 4,
    url: "https://tse3.mm.bing.net/th/id/OIP.H1PnuQHpdk3zRB-W8GvjaAHaIh?pid=Api&P=0&h=180",
    for: "Men",
    type: "Bermuda",
  },
  {
    id: 5,
    url: "https://tse3.mm.bing.net/th/id/OIP.e3KVs0uQzVkK-hQfdnAYnQHaLH?pid=Api&P=0&h=180",
    for: "Men",
    type: "Panjabi",
  },
  {
    id: 6,
    url: "https://tse2.mm.bing.net/th/id/OIP.Hy451qA33wOkFOsQ1aBuwQHaJ4?pid=Api&P=0&h=180",
    for: "Men",
    type: "Jeans",
  },
  {
    id: 7,
    url: "https://tse4.mm.bing.net/th/id/OIP.vXF3D9onL5W6FyjDbTquLAHaHa?pid=Api&P=0&h=180",
    for: "Men",
    type: "Shoes",
  },
  {
    id: 8,
    url: "https://tse3.mm.bing.net/th/id/OIP.-mq_09B45XD30vSwH8ANAwHaJQ?pid=Api&P=0&h=180",
    for: "Women",
    type: "Saree",
  },
  {
    id: 9,
    url: "https://tse2.mm.bing.net/th/id/OIP.I0yJYhnRc2idKfKg6YzwLgHaJQ?pid=Api&P=0&h=180",
    for: "Women",
    type: "Lehenga",
  },
  {
    id: 10,
    url: "https://tse2.mm.bing.net/th/id/OIP.5qkn_JjkYuFiFiXPJuyAygHaJ4?pid=Api&P=0&h=180",
    for: "Women",
    type: "Jeans",
  },
  {
    id: 11,
    url: "https://tse1.mm.bing.net/th/id/OIP.XUj_HA8JzZG3iJoxZpU-9AHaJ4?pid=Api&P=0&h=180",
    for: "Women",
    type: "Gopi dress",
  },
  {
    id: 12,
    url: "https://tse4.mm.bing.net/th/id/OIP.-IewqRMBffA3JePcMZqEWgHaHa?pid=Api&P=0&h=180",
    for: "Women",
    type: "Shoes",
  },
  {
    id: 13,
    url: "https://tse2.mm.bing.net/th/id/OIP.XkdERq6aRK2G1GH2de_EjQHaJ2?pid=Api&P=0&h=180",
    for: "Girls",
    type: "Kids wear",
  },
  {
    id: 14,
    url: "https://tse3.mm.bing.net/th/id/OIP.R32cCCzgzMe1q0cp6TRnpQHaJR?pid=Api&P=0&h=180",
    for: "Boys",
    type: "Kids wear",
  },
  {
    id: 15,
    url: "https://tse3.mm.bing.net/th/id/OIP.BS9LGFaTUl2lIuB2rysnrQHaHa?pid=Api&P=0&h=180",
    for: "Girls",
    type: "Kids Shoes",
  },
  {
    id: 16,
    url: "https://tse4.mm.bing.net/th/id/OIP.jtSNiIHAXqZasGMtkKufZgHaHa?pid=Api&P=0&h=180",
    for: "Boys",
    type: "Kids Shoes",
  },
  {
    id: 17,
    url: "https://tse2.mm.bing.net/th/id/OIP.WYh-fY5eHGI4ETGYmtIpCAHaJ3?pid=Api&P=0&h=180",
    for: "Girls",
    type: "Cloths",
  },
  {
    id: 18,
    url: "https://tse2.mm.bing.net/th/id/OIP.j9ib99k_7rVUCopA5ACRJQHaLK?pid=Api&P=0&h=180",
    for: "Boys",
    type: "Cloths",
  },
]

function App() {
  return (
    <>
      <Header />
      <main className="mx-5 my-4">
        <div className="row">
          {imageUrl.map((category) => {
            return (
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mb-3">
                <div className="card position-relative">
                  <img src={category.url} alt="" className="img-fluid image" />
                  <p className="m-0 text-center bg-light position-absolute w-100 top-50">
                    {category.type} ({category.for})
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="bg-secondary my-4 festivalBanner">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.GFeDWGFyukqOSvVUO04kmAHaEK?pid=Api&P=0&h=180"
            alt=""
            className="w-100 h-100"
          />
        </div>
        <div className="row">
          <div className="col-md-6 my-3">
            <div className="card flex-xxl-row p-sm-5 p-3 bg-body-secondary">
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.jngCe7THF9RyUMqBs3Lw6gHaDt?pid=Api&P=0&h=180"
                alt=""
                className="bannerImage"
                style={{height:"200px"}}
              />
              <div className="card-body py-0 px-0 px-xxl-5 d-flex flex-column justify-content-between">
                <p className="fw-bold mt-2">New Arrival</p>
                <div style={{minWidth: "225px"}} className="description">
                  <h3>New Collection</h3>
                  <p className="m-0">
                    Checkout our new collection to live your diwali with style. hurry up don't miss this chance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 my-3">
            <div className="card flex-xxl-row p-sm-5 p-3 bg-body-secondary">
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.DZhMFCN8KQJup5G70IemgAHaDt?pid=Api&P=0&h=180"
                alt=""
                className="bannerImage"
                style={{height:"200px"}}
              />
              <div className="card-body py-0 px-0 px-xxl-5 d-flex flex-column justify-content-between">
                <p className="fw-bold mt-2">Diwali Sale</p>
                <div style={{minWidth: "225px"}} className="description">
                  <h3>Upto 50% off</h3>
                  <p className="m-0">
                    Diwali sale is launch now, sale is live till 31st November,
                    go and make your diwali stylish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App

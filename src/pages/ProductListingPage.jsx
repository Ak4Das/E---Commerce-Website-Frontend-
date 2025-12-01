import GetClothsData from "../components/GetClothsData"
import Header from "../components/Header"
import Offcanvas from "../components/OffCanvas"

export default function ProductListingPage() {
  const { clothsData, setClothsData } = GetClothsData()
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
            {clothsData.map((cloth) => (
              <div className="col-sm-6 col-xl-4 col-xxl-3 mb-3">
                <div className="card productCard">
                  <img
                    src={cloth.url}
                    className="img-fluid imgWidth"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <p id="name">
                        {cloth.name.length > 61
                          ? cloth.name.slice(0, 60).concat("...")
                          : cloth.name}
                      </p>
                      <p id="price">${cloth.price}</p>
                      <p id="discount">{cloth.discount}</p>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 mb-1">
                        Add to cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
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

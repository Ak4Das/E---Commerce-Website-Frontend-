import Header from "../components/Header"

export default function CartPage() {
  return (
    <>
      <Header />{" "}
      <main className="bg-body-secondary pb-3">
        <div className="container">
          <h3 className="py-4 text-center">My Cart</h3>
          <div className="d-md-flex d-inline-block justify-content-between align-items-start cartContainer">
            <section className="productsInCurt">
              <div className="row mb-3">
                <div className="col-sm-6 col-md-12 mb-3">
                <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="imageOnProductCurt"
                  />
                  <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                    <div>
                      <p className="fw-bold fs-5 m-0 mb-2">Lehenga</p>
                      <div>
                        <span className="fw-bold fs-5">₹3000</span>
                        <span className="text-decoration-line-through ms-2">
                          ₹6000
                        </span>
                      </div>
                      <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
                      <div className="mb-3">
                        <span className="fw-bold me-2">Quantity: </span>
                        <button
                          className="rounded-circle border border-1"
                          style={{ width: "30px", height: "30px" }}
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
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 my-2">
                        Remove From Cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <div className="col-sm-6 col-md-12 mb-3">
                <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="imageOnProductCurt"
                  />
                  <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                    <div>
                      <p className="fw-bold fs-5 m-0 mb-2">Lehenga</p>
                      <div>
                        <span className="fw-bold fs-5">₹3000</span>
                        <span className="text-decoration-line-through ms-2">
                          ₹6000
                        </span>
                      </div>
                      <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
                      <div className="mb-3">
                        <span className="fw-bold me-2">Quantity: </span>
                        <button
                          className="rounded-circle border border-1"
                          style={{ width: "30px", height: "30px" }}
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
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 my-2">
                        Remove From Cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <div className="col-sm-6 col-md-12 mb-3">
                <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="imageOnProductCurt"
                  />
                  <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                    <div>
                      <p className="fw-bold fs-5 m-0 mb-2">Lehenga</p>
                      <div>
                        <span className="fw-bold fs-5">₹3000</span>
                        <span className="text-decoration-line-through ms-2">
                          ₹6000
                        </span>
                      </div>
                      <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
                      <div className="mb-3">
                        <span className="fw-bold me-2">Quantity: </span>
                        <button
                          className="rounded-circle border border-1"
                          style={{ width: "30px", height: "30px" }}
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
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 my-2">
                        Remove From Cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <div className="col-sm-6 col-md-12 mb-3">
                <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="imageOnProductCurt"
                  />
                  <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                    <div>
                      <p className="fw-bold fs-5 m-0 mb-2">Lehenga</p>
                      <div>
                        <span className="fw-bold fs-5">₹3000</span>
                        <span className="text-decoration-line-through ms-2">
                          ₹6000
                        </span>
                      </div>
                      <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
                      <div className="mb-3">
                        <span className="fw-bold me-2">Quantity: </span>
                        <button
                          className="rounded-circle border border-1"
                          style={{ width: "30px", height: "30px" }}
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
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 my-2">
                        Remove From Cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <div className="col-sm-6 col-md-12 mb-3">
                <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="imageOnProductCurt"
                  />
                  <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                    <div>
                      <p className="fw-bold fs-5 m-0 mb-2">Lehenga</p>
                      <div>
                        <span className="fw-bold fs-5">₹3000</span>
                        <span className="text-decoration-line-through ms-2">
                          ₹6000
                        </span>
                      </div>
                      <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
                      <div className="mb-3">
                        <span className="fw-bold me-2">Quantity: </span>
                        <button
                          className="rounded-circle border border-1"
                          style={{ width: "30px", height: "30px" }}
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
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 my-2">
                        Remove From Cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <div className="col-sm-6 col-md-12 mb-3">
                <div className="card flex-lg-row gap-4 productCardInCart m-auto">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="imageOnProductCurt"
                  />
                  <div className="card-body d-flex flex-column justify-content-between pt-0 pt-lg-3">
                    <div>
                      <p className="fw-bold fs-5 m-0 mb-2">Lehenga</p>
                      <div>
                        <span className="fw-bold fs-5">₹3000</span>
                        <span className="text-decoration-line-through ms-2">
                          ₹6000
                        </span>
                      </div>
                      <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
                      <div className="mb-3">
                        <span className="fw-bold me-2">Quantity: </span>
                        <button
                          className="rounded-circle border border-1"
                          style={{ width: "30px", height: "30px" }}
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
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary w-100 my-2">
                        Remove From Cart
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </section>
            <section className="bg-light px-5 py-4 totalBill">
              <h3>Price Details</h3>
              <hr />
              <div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Price</p>
                  <p className="d-inline-block w-50 text-end m-0">₹3000</p>
                </div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Discount</p>
                  <p className="d-inline-block w-50 text-end m-0">- ₹1000</p>
                </div>
                <div className="my-3">
                  <p className="d-inline-block w-50 m-0">Delivery Charges</p>
                  <p className="d-inline-block w-50 text-end m-0">₹30</p>
                </div>
              </div>
              <hr />
              <div>
                <p className="d-inline-block w-50 m-0">Total Amount</p>
                <p className="d-inline-block w-50 text-end m-0">₹2030</p>
              </div>
              <hr />
              <p className="my-3">We will save ₹1000 on this order</p>
              <button className="btn btn-primary w-100">Place Order</button>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

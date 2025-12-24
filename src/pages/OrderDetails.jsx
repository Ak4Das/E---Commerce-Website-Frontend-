import Header from "../components/Header"

export default function OrderDetails() {
  return (
    <>
      <Header />
      <main className="bg-secondary-subtle py-3" style={{ fontSize: "15px" }}>
        <div
          className="mx-auto orderDetailsContainer"
          style={{ maxWidth: "960px" }}
        >
          <h1>Order Details</h1>
          <div className="d-md-flex gap-3">
            <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
              Order placed 23 December 2025{" "}
            </p>
            <span className="d-none d-md-inline"> | </span>
            <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
              Order number 408-8261706-6419528
            </p>
          </div>
          <div className="card p-3 mt-3 flex-lg-row gap-3 orderDetailsCard">
            <div style={{ maxWidth: "200px" }}>
              <p className="my-0 fw-bold">Ship to</p>
              <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
                Akash Das ward no. 16 Dakbanglo para Jalalpur road near Sita Ram
                Mandir, Birbhum DUBRAJPUR, WEST BENGAL 731123 India
              </p>
            </div>
            <div>
              <p className="my-0 fw-bold">Payment method</p>
              <p className="my-0 fw-medium">Pay on Delivery</p>
            </div>
            <div className="ms-lg-auto">
              <p className="my-0 fw-bold">Order Summary</p>
              <div className="orderDetailsBill" style={{ fontSize: "14px" }}>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Item(s) Subtotal:{" "}
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹192.00
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Shipping:{" "}
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹40.00
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Cash On Delivery Charge:{" "}
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹10.00
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">Total: </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹239.00
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Free Delivery:
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    -₹40.00
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Order Total:
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹199.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-secondary-subtle rounded bg-white p-3 mt-3">
            <p className="my-0 fs-5 fw-bold text-success">Arriving Saturday</p>
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-3">
              <div className="d-flex gap-2 align-items-center productOrderDetails">
                <img
                  src="https://m.media-amazon.com/images/I/71yjvVkZpaL._SS142_.jpg"
                  alt=""
                />
                <p className="my-0">
                  Happilo Premium Natural Californian Almonds 200g | Badam Giri,
                  Healthy Snacks, Dry Fruits | Crunchy Nuts | High in Fiber |
                  Rich in Protein | Magnesium | Phosphorus | Dietary Fibre |
                  Zero Cholesterol
                </p>
              </div>
              <div
                className="d-flex flex-column gap-2"
                style={{ minWidth: "200px" }}
              >
                <button className="btn btn-warning rounded-pill">
                  Track Package
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  View or edit order
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

import { Link } from "react-router-dom"
import Header from "../components/Header"

if (!JSON.parse(localStorage.getItem("orders"))) {
  const orders = []
  localStorage.setItem("orders", JSON.stringify(orders))
}

export default function YourOrders() {
  return (
    <>
      <Header />
      <main className="container mt-3">
        <h1>Your Orders</h1>
        <div className="ms-auto d-sm-none fw-medium">
          <div style={{ fontSize: "13px" }}>
            <span>ORDER ID </span>
            <span># 408-8261706-6419528</span>
          </div>
          <Link
            to="/orderDetails"
            className="text-decoration-none"
            style={{ fontSize: "14px" }}
          >
            View order details
          </Link>
        </div>
        <div className="shipTo fw-medium mt-2">
          <p className="my-0" style={{ fontSize: "13px" }}>
            SHIP TO
          </p>
          <p className="my-0 text-primary" style={{ fontSize: "14px" }}>
            Malaika Arora <i class="bi bi-chevron-down"></i>
          </p>
        </div>
        <div className="card mt-3">
          <div className="bg-light p-3 rounded d-flex gap-5">
            <div>
              <p className="my-0" style={{ fontSize: "13px" }}>
                ORDER PLACED
              </p>
              <p className="my-0" style={{ fontSize: "14px" }}>
                23 December 2025
              </p>
            </div>
            <div>
              <p className="my-0" style={{ fontSize: "13px" }}>
                TOTAL
              </p>
              <p className="my-0" style={{ fontSize: "14px" }}>
                ₹199
              </p>
            </div>
            <div className="shipToCard">
              <p className="my-0" style={{ fontSize: "13px" }}>
                SHIP TO
              </p>
              <p className="my-0 text-primary" style={{ fontSize: "14px" }}>
                Malaika Arora <i class="bi bi-chevron-down"></i>
              </p>
            </div>
            <div className="ms-auto d-none d-sm-block">
              <div style={{ fontSize: "13px" }}>
                <span>ORDER ID </span>
                <span># 408-8261706-6419528</span>
              </div>
              <Link
                to="/orderDetails"
                className="text-decoration-none"
                style={{ fontSize: "14px" }}
              >
                View order details
              </Link>
            </div>
          </div>
          <div className="p-3">
            <p className="my-0 fs-5 fw-bold text-success">Arriving Saturday</p>
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-3">
              <div className="d-flex gap-2 align-items-center productYourOrder">
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

import { Link } from "react-router-dom"
import Header from "../components/Header"
import RatingBar from "../components/RatingBar"
import { useState } from "react"

export default function YourOrders() {
  const [isClicked, setClicked] = useState(false)

  const orders = JSON.parse(localStorage.getItem("orders"))

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      <Header />
      <main className="container mt-3">
        {orders.map((order) => (
          <div key={order.id}>
            <h1>Your Orders</h1>
            <div className="ms-auto d-md-none fw-medium">
              <div style={{ fontSize: "13px" }}>
                <span>ORDER </span>
                <span># {order.id}</span>
              </div>
              <Link
                to="/orderDetails"
                className="text-decoration-none viewOrderDetailsYourOrders"
                style={{ fontSize: "14px" }}
              >
                View order details
              </Link>
            </div>
            <div className="shipTo fw-medium mt-2">
              <p className="my-0" style={{ fontSize: "13px" }}>
                SHIP TO
              </p>
              <p
                className="my-0 text-primary userAddressFloatingCard"
                style={{ fontSize: "14px" }}
                onClick={() => setClicked(isClicked ? false : true)}
              >
                {user.name} <i className="bi bi-chevron-down"></i>
              </p>
              {isClicked && (
                <div
                  className="bg-light p-2 border border-secondary-subtle position-absolute rounded"
                  style={{ width: "150px", fontSize: "13px", zIndex: 1 }}
                >
                  <p className="my-0">{order.address.localInfo}</p>
                  <p className="my-0">{order.address.area}</p>
                  <p className="my-0">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.pinCode}
                  </p>
                  <p className="my-0">{order.address.country}</p>
                </div>
              )}
            </div>
            <div className="card my-3">
              <div className="bg-light p-3 rounded d-flex gap-5">
                <div>
                  <p className="my-0 fw-medium" style={{ fontSize: "13px" }}>
                    ORDER PLACED
                  </p>
                  <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
                    {order.orderDate}
                  </p>
                </div>
                <div>
                  <p className="my-0 fw-medium" style={{ fontSize: "13px" }}>
                    TOTAL
                  </p>
                  <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
                    ₹{order.totalPrice}
                  </p>
                </div>
                <div className="shipToCard">
                  <p className="my-0 fw-medium" style={{ fontSize: "13px" }}>
                    SHIP TO
                  </p>
                  <p
                    className="my-0 text-primary fw-medium userAddressFloatingCard"
                    style={{ fontSize: "14px" }}
                    onClick={() => setClicked(isClicked ? false : true)}
                  >
                    {user.name} <i className="bi bi-chevron-down"></i>
                  </p>
                  {isClicked && (
                    <div
                      className="bg-light p-2 border border-secondary-subtle position-absolute rounded"
                      style={{ width: "150px", fontSize: "13px", zIndex: 1 }}
                    >
                      <p className="my-0">{order.address.localInfo}</p>
                      <p className="my-0">{order.address.area}</p>
                      <p className="my-0">
                        {order.address.city}, {order.address.state},{" "}
                        {order.address.pinCode}
                      </p>
                      <p className="my-0">{order.address.country}</p>
                    </div>
                  )}
                </div>
                <div className="ms-auto d-none d-md-block fw-medium">
                  <div style={{ fontSize: "13px" }}>
                    <span>ORDER </span>
                    <span># {order.id}</span>
                  </div>
                  <Link
                    to={`/orderDetails/${order.id}`}
                    className="text-decoration-none viewOrderDetailsYourOrders"
                    style={{ fontSize: "14px" }}
                  >
                    View order details
                  </Link>
                </div>
              </div>
              <div className="p-3">
                <p className="my-0 fs-5 fw-bold text-success">
                  Arriving {order.deliveryDay}
                </p>
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-3">
                  <div className="d-flex flex-column gap-4">
                    {order.item.map((product) => (
                      <div
                        key={product.id}
                        className="d-flex gap-3 align-items-start productYourOrder"
                      >
                        <img
                          src={product.url}
                          alt=""
                          className="img-fluid"
                          style={{ minWidth: "135px", maxWidth: "135px" }}
                        />
                        <div>
                          <p className="my-0 fw-medium">
                            {product.name.length > 61
                              ? product.name.slice(0, 60).concat("...")
                              : product.name}
                          </p>
                          <RatingBar rating={product.rating} />
                          <span> {product.rating}</span>
                          <p>
                            <b>Price:</b> ₹{product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="d-flex flex-column gap-2"
                    style={{ minWidth: "200px" }}
                  >
                    <button className="btn btn-warning rounded-pill">
                      View or edit order
                    </button>
                    <button className="btn btn-outline-danger rounded-pill">
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

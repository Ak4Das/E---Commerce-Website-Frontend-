import Header from "../components/Header"
import { useParams } from "react-router-dom"
import RatingBar from "../components/RatingBar"

export default function OrderDetails() {
  const id = Number(useParams().id)
  const orders = JSON.parse(localStorage.getItem("orders"))

  const order = orders.find((order) => order.id === id)

  const totalOrder = order.item.reduce(
    (acc, curr) =>
      acc +
      curr.price -
      (curr.price / 100) * Number(curr.discount.replace("%", "")),
    0
  )

  const deliveryCharge = Math.round(
    order.item.reduce((acc, curr) => acc + curr.deliveryCharge, 0) /
      order.item.length
  )

  const cashOnDeliveryCharge =
    order.paymentMethod === "Cash on Delivery/Pay on Delivery" ? 10 : 0

  return (
    <>
      <Header />
      <main className="py-3" style={{ fontSize: "15px" }}>
        <div
          className="mx-auto orderDetailsContainer"
          style={{ maxWidth: "960px" }}
        >
          <h1>Order Details</h1>
          <div className="d-md-flex gap-3">
            <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
              Order placed {order.orderDate}
            </p>
            <span className="d-none d-md-inline"> | </span>
            <p className="my-0 fw-medium" style={{ fontSize: "14px" }}>
              Order ID # {order.id}
            </p>
          </div>
          <div className="card p-3 mt-3 flex-lg-row gap-3 bg-light orderDetailsCard">
            <div style={{ maxWidth: "200px" }}>
              <p className="my-0 fw-bold">Ship to</p>
              <div className="my-0 fw-medium" style={{ fontSize: "14px" }}>
                <p className="my-0">{order.address.localInfo}</p>
                <p className="my-0">{order.address.area}</p>
                <p className="my-0">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.pinCode}
                </p>
                <p className="my-0">{order.address.country}</p>
              </div>
            </div>
            <div>
              <p className="my-0 fw-bold">Payment method</p>
              <p className="my-0 fw-medium">{order.paymentMethod}</p>
            </div>
            <div className="ms-lg-auto">
              <p className="my-0 fw-bold">Order Summary</p>
              <div className="orderDetailsBill" style={{ fontSize: "14px" }}>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Item(s) Subtotal:{" "}
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹{Math.round(totalOrder)}
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Shipping:{" "}
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹{deliveryCharge}
                  </p>
                </div>
                {cashOnDeliveryCharge ? (
                  <div>
                    <p className="my-0 w-75 fw-medium d-inline-block">
                      Cash On Delivery Charge:{" "}
                    </p>
                    <p className="my-0 w-25 fw-medium d-inline-block text-end">
                      ₹{cashOnDeliveryCharge}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">Total: </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹
                    {Math.round(
                      totalOrder + deliveryCharge + cashOnDeliveryCharge
                    )}
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block text-success">
                    Free Delivery:
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end text-success">
                    -₹0
                  </p>
                </div>
                <div>
                  <p className="my-0 w-50 fw-medium d-inline-block text-success">
                    Sale:
                  </p>
                  <p className="my-0 w-50 fw-medium d-inline-block text-end text-success">
                    -{order.sale ? order.sale : "0%"}
                  </p>
                </div>
                <div>
                  <p className="my-0 w-75 fw-medium d-inline-block">
                    Order Total:
                  </p>
                  <p className="my-0 w-25 fw-medium d-inline-block text-end">
                    ₹{Math.round(order.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-secondary-subtle rounded bg-white p-3 mt-3">
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
                      <p className="mt-0 mb-1">
                        <b>Price:</b> ₹{product.price}
                      </p>
                      <p className="my-0 text-secondary fs-6 fw-medium">
                        {product.discount} off
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
      </main>
    </>
  )
}

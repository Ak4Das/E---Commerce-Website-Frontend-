import Header from "./Header"
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
      </main>
    </>
  )
}

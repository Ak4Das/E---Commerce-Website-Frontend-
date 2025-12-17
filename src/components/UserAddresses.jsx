import Header from "./Header"
import Plus from "../assets/plus.png"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function UserAddresses() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  function removeAddress(e) {
    user.address = user.address.filter(
      (address) => address.id !== Number(e.target.value)
    )
    localStorage.setItem("user", JSON.stringify(user))
    setUser(JSON.parse(localStorage.getItem("user")))
  }

  return (
    <>
      <Header />
      <main className="container mt-3">
        <h2>Your Addresses</h2>
        <div className="row row-gap-4 mt-4">
          <div className="col-sm-6 col-lg-4">
            <Link
              to="/addAddress"
              className="card align-items-center justify-content-center text-decoration-none text-dark"
              style={{
                height: "300px",
                border: "3px dashed black",
              }}
            >
              <div className="text-center">
                <img src={Plus} alt="" style={{ width: "30px" }} />
                <h4 className="mt-2">Add Address</h4>
              </div>
            </Link>
          </div>
          {user.address.length !== 0 &&
            user.address.map((address) => (
              <Link
                to={`/paymentMethods/${address.id}`}
                key={address.id}
                className="col-sm-6 col-lg-4 text-decoration-none"
              >
                <div
                  className="card"
                  style={{
                    height: "300px",
                    border: "3px solid black",
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <p className="my-0 fw-bold">{address.fullName}</p>
                      <p className="my-0 fw-medium">{address.localInfo}</p>
                      <p className="my-0 fw-medium">{address.area}</p>
                      <p className="my-0 fw-medium">
                        {address.city.toUpperCase()}
                        {", "}
                        {address.state.toUpperCase()}{" "}
                        {address.pinCode.toUpperCase()}
                      </p>
                      <p className="my-0 fw-medium">
                        {address.country.toUpperCase()}
                      </p>
                      <p className="my-0 fw-medium">
                        Phone Number: {address.mobNo}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/editAddress/${address.id}`}
                        className="text-decoration-none border border-0 bg-white me-1 fw-medium text-primary addressEditOrRemove"
                        style={{ cursor: "pointer" }}
                      >
                        Edit
                      </Link>
                      <span className="fw-medium text-primary">|</span>
                      <button
                        className="border border-0 bg-white ms-1 fw-medium text-primary addressEditOrRemove"
                        style={{ cursor: "pointer" }}
                        value={address.id}
                        onClick={removeAddress}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <Link to="/user" className="btn btn-warning mt-5">View Profile</Link>
      </main>
    </>
  )
}

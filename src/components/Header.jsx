import { NavLink } from "react-router-dom"
import BharatVastra from "../assets/BharatVastra.png"

export default function Header({ position, top, zIndex }) {
  let userDetails = JSON.parse(localStorage.getItem("user"))
  function handleHamburgerMenu() {
    const element = document.querySelector(".secondUlContainer")
    // element.style.display = element.style.display ? "" : "none"
    // debugger
    const isNone = element.classList.contains("none")
    const oldDisplay = isNone ? "none" : "block"
    const newDisplay = isNone ? "block" : "none"
    element.classList.remove(oldDisplay)
    element.classList.add(newDisplay)
  }
  return (
    <header style={{ position, top, zIndex }}>
      <nav className="bg-body-tertiary py-2 px-3">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink className="navbar-brand" to="/">
            <img
              src={BharatVastra}
              alt=""
              style={{ width: "70px" }}
              className="BharatVastra"
            />
            <span className="navbarBrand fw-bold fs-5 text-secondary">
              BharatVastra
            </span>
          </NavLink>
          <div className="input-group searchInHeader justify-content-center">
            <input
              type="text"
              className="border border-1 w-75 p-2"
              style={{ outline: "none" }}
              placeholder="Search Product"
              aria-label="Search Product"
              aria-describedby="button-addon2"
            ></input>
            <button className="btn btn-warning w-25" type="button">
              Search
            </button>
          </div>
          <div className="hamburger">
            <div
              className="d-flex align-items-center gap-1"
              onClick={handleHamburgerMenu}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  overflow: "hidden",
                  borderRadius: "100%",
                }}
              >
                <img
                  src={userDetails.profileImage}
                  alt=""
                  className="w-100 img-fluid h-100"
                />
              </div>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          <div className="firstUlContainer">
            <ul
              className="navbar-nav d-flex flex-row justify-content-between align-items-center"
              style={{ width: "300px" }}
            >
              <li className="nav-item">
                {userDetails ? (
                  <NavLink
                    to="/user"
                    className="text-black"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{ height: "40px", fontSize: "14px" }}
                      className="lh-sm px-1 profileBtnInHeader"
                    >
                      <p className="my-0 fw-medium">
                        Hello, {userDetails.name.split(" ")[0]}
                      </p>
                      <p className="my-0 text-primary fw-bold">
                        Account <i className="bi bi-chevron-down"></i>
                      </p>
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    className="btn btn-secondary text-light"
                    aria-current="page"
                    to="/login"
                    style={{ width: "70px" }}
                  >
                    Login
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  <i className="bi bi-heart-fill text-danger fs-5"></i>
                  <span className="ms-1">Wishlist</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <i className="bi bi-cart3 fs-5"></i>
                  <span className="ms-1">Cart</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="secondUlContainer position-absolute none"
            style={{ zIndex: 3, top: "60px", right: "10px" }}
          >
            <ul
              className="d-flex flex-column  justify-content-between bg-body-tertiary p-3"
              style={{
                height: "200px",
                listStyleType: "none",
              }}
            >
              <li className="nav-item btn btn-warning">
                {userDetails ? (
                  <NavLink
                    to="/user"
                    className="text-black"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{ height: "40px", fontSize: "14px" }}
                      className="lh-sm px-1 profileBtnInHeader"
                    >
                      <p className="my-0 fw-medium">
                        Hello, {userDetails.name.split(" ")[0]}
                      </p>
                      <p className="my-0 text-primary fw-bold">
                        Account <i className="bi bi-chevron-down"></i>
                      </p>
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    className="btn btn-secondary text-light"
                    aria-current="page"
                    to="/login"
                    style={{ width: "70px" }}
                  >
                    Login
                  </NavLink>
                )}
              </li>
              <li className="nav-item btn btn-warning">
                <NavLink className="nav-link" to="/wishlist">
                  <i className="bi bi-heart-fill text-danger fs-5"></i>
                  <span className="ms-1">Wishlist</span>
                </NavLink>
              </li>
              <li className="nav-item btn btn-warning">
                <NavLink className="nav-link" to="/cart">
                  <i className="bi bi-cart3 fs-5"></i>
                  <span className="ms-1">Cart</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

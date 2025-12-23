import { NavLink } from "react-router-dom"
import wishlistLogo from "../assets/heart.png"
import shoppingCart from "../assets/shoppingCart.png"
import hamburgerIcon from "../assets/hamburgerIcon.png"
import BharatVastra from "../assets/BharatVastra.png"

export default function Header({ position, top, zIndex }) {
  let userDetails = JSON.parse(localStorage.getItem("user"))
  function handleHamburgerMenu(e) {
    const element = e.target.parentElement.nextElementSibling.nextElementSibling
    element.style.display = element.style.display ? "" : "none"
  }
  return (
    <header style={{ position, top, zIndex }}>
      <nav className="bg-body-tertiary mx-2 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink className="navbar-brand" to="/">
            <img
              src={BharatVastra}
              alt=""
              style={{ width: "70px" }}
              className="BharatVastra"
            />
            <span className="navbarBrand fw-medium fs-5">BharatVastra</span>
          </NavLink>
          <form role="search" className="searchInHeader">
            <input
              className="border border-0 p-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <button className="hamburger" onClick={handleHamburgerMenu}>
            <img src={hamburgerIcon} alt="" className="logo" />
          </button>
          <div className="firstUlContainer">
            <ul
              className="navbar-nav d-flex flex-row justify-content-between"
              style={{ width: "300px" }}
            >
              <li className="nav-item">
                {userDetails ? (
                  <NavLink to="/user" className="text-black" style={{textDecoration:"none"}}>
                    <div
                      style={{ height: "40px", fontSize: "14px" }}
                      className="lh-sm px-1 profileBtnInHeader"
                    >
                      <p className="my-0 fw-medium">Hello, {userDetails.name.split(" ")[0]}</p>
                      <p className="my-0 text-primary fw-bold">Account <i className="bi bi-chevron-down"></i></p>
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
                  <img src={wishlistLogo} className="logo" />
                  <span>Wishlist</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <img src={shoppingCart} className="logo" />
                  <span>Cart</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="secondUlContainer  position-absolute"
            style={{ display: "none", zIndex: 1, top: "60px", right: "10px" }}
          >
            <ul
              className="d-flex flex-column  justify-content-between bg-body-tertiary p-3"
              style={{
                height: "200px",
                listStyleType: "none",
              }}
            >
              <li className="nav-item btn btn-secondary">
                <NavLink
                  aria-current="page"
                  to="/"
                  className="text-light"
                  style={{ width: "70px", textDecoration: "none" }}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item  btn btn-secondary text-light">
                <NavLink className="nav-link" to="/wishlist">
                  <img src={wishlistLogo} className="logo" />
                  <span>Wishlist</span>
                </NavLink>
              </li>
              <li className="nav-item  btn btn-secondary text-light">
                <NavLink className="nav-link" to="/cart">
                  <img src={shoppingCart} className="logo" />
                  <span>Cart</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

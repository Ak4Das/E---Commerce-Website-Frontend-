import { NavLink } from "react-router-dom"
import wishlistLogo from "../assets/heart.png"
import shoppingCart from "../assets/shoppingCart.png"
import hamburgerIcon from "../assets/hamburgerIcon.png"
import myntraLogo from "../assets/myntraLogo.png"

export default function Header() {
  function handleHamburgerMenu(e) {
    const element = e.target.parentElement.nextElementSibling.nextElementSibling
    element.style.display = element.style.display ? "" : "none"
  }
  return (
    <header>
      <nav className="bg-body-tertiary mx-2 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink className="navbar-brand" to="/">
          <img src={myntraLogo} alt="" style={{width:"70px"}} className="myntraLogo"/>
            <span className="navbarBrand">MyShoppingSite</span>
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
                <NavLink
                  className="btn btn-secondary text-light"
                  aria-current="page"
                  to="/"
                  style={{ width: "70px" }}
                >
                  Login
                </NavLink>
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

import crossBtn from "../assets/close.png"
import { useState } from "react"

export default function Offcanvas({
  setPrice,
  setRating,
  setSortBy,
  setGender,
  productCategory,
  setProductCategory,
  setUpdate
}) {
  // open useState is used only to open or close Offcanvas
  const [open, setOpen] = useState(false)
  function filterWithPrice(e) {
    setPrice(e.target.value)
  }
  function filterByRating(e) {
    setRating(e.target.value)
  }
  function filterBySort(e) {
    setSortBy(e.target.value)
  }
  function filterByGender(e) {
    setGender(e.target.value)
  }
  function filterByCategory(e) {
    if (e.target.checked) {
      productCategory.push(e.target.value)
      setProductCategory(productCategory)
      setUpdate(true)
    } else {
      setProductCategory(
        productCategory.filter((category) => category !== e.target.value),
      )
    }
  }
  function resetFilters() {
    setPrice(0)
    setRating(0)
    setSortBy("")
    setGender("")
    setProductCategory("")
  }
  function handleClick(e) {
    const element = e.target
    const parentElement = element.parentElement
    parentElement.style.left =
      parentElement.style.left === "-305px" ? "" : "-305px"
    setOpen(open ? false : true)
  }
  return (
    <form
      style={{
        maxWidth: "30vw",
        minWidth: "350px",
        position: "fixed",
        left: "-305px",
        zIndex: 1,
      }}
      className="bg-light-subtle px-5 py-3 d-inline-block offcanvasFilterForm"
    >
      {open ? (
        <img
          src={crossBtn}
          alt="close button"
          className="logo"
          style={{
            position: "relative",
            left: "265px",
            top: "-5px",
            cursor: "pointer",
          }}
          onClick={handleClick}
          title="filter"
        />
      ) : (
        <button
          style={{
            position: "relative",
            left: "265px",
            top: "-5px",
            cursor: "pointer",
          }}
          className="rounded bi bi-list"
          type="button"
          onClick={handleClick}
          title="filter"
        ></button>
      )}
      <div className="d-flex justify-content-between my-3">
        <b>Filters</b>
        <button type="reset" onClick={resetFilters}>
          Clear
        </button>
      </div>
      <section className="my-3">
        <b>Price</b>
        <div className="d-flex justify-content-between">
          <span>0</span>
          <span>10000</span>
          <span>20000</span>
        </div>
        <input
          type="range"
          className="w-100"
          onChange={filterWithPrice}
          min={0}
          max={20000}
          defaultValue={0}
        />
      </section>
      <section className="my-3">
        <b>Gender</b>
        <div className="mt-2 form-check">
          <input
            type="radio"
            name="category"
            id="menClothing"
            value="male"
            className="form-check-input"
            onClick={filterByGender}
          />
          <label htmlFor="menClothing">Male</label>
          <br />
          <input
            type="radio"
            name="category"
            id="menClothing"
            value="female"
            className="form-check-input"
            onClick={filterByGender}
          />
          <label htmlFor="menClothing">Female</label>
        </div>
      </section>
      <section className="my-3">
        <b>Rating</b>
        <div className="mt-2">
          <input
            type="radio"
            name="rating"
            id="fourStarsAndAbove"
            value={4}
            onChange={filterByRating}
          />
          <label htmlFor="fourStarsAndAbove" className="ms-2">
            4 stars and above
          </label>
          <br />
          <input
            type="radio"
            name="rating"
            id="threeStarsAndAbove"
            value={3}
            onChange={filterByRating}
          />
          <label htmlFor="threeStarsAndAbove" className="ms-2">
            3 stars and above
          </label>
          <br />
          <input
            type="radio"
            name="rating"
            id="twoStarsAndAbove"
            value={2}
            onChange={filterByRating}
          />
          <label htmlFor="twoStarsAndAbove" className="ms-2">
            2 stars and above
          </label>
          <br />
          <input
            type="radio"
            name="rating"
            id="oneStarsAndAbove"
            value={1}
            onChange={filterByRating}
          />
          <label htmlFor="oneStarsAndAbove" className="ms-2">
            1 stars and above
          </label>
        </div>
      </section>
      <section className="my-3">
        <b>Sort by</b>
        <div className="mt-2">
          <input
            type="radio"
            name="sortBy"
            id="lowToHigh"
            value="lowToHigh"
            onChange={filterBySort}
          />
          <label htmlFor="lowToHigh" className="ms-2">
            Price - Low to High
          </label>
          <br />
          <input
            type="radio"
            name="sortBy"
            id="highToLow"
            value="highToLow"
            onChange={filterBySort}
          />
          <label htmlFor="highToLow" className="ms-2">
            Price - High to Low
          </label>
        </div>
      </section>
      <section className="my-3">
        <b>Category</b>
        <div className="mt-2">
          <input
            id="Suit"
            type="checkbox"
            value="suit"
            onChange={filterByCategory}
          />
          <label htmlFor="Suit" className="ms-2">
            Suit
          </label>
          <br />
          <input
            id="pant"
            type="checkbox"
            value="pant"
            onChange={filterByCategory}
          />
          <label htmlFor="pant" className="ms-2">
            Pant
          </label>
          <br />
          <input
            id="tShirt"
            type="checkbox"
            value="tShirt"
            onChange={filterByCategory}
          />
          <label htmlFor="tShirt" className="ms-2">
            T - Shirt
          </label>
          <br />
          <input
            id="bermuda"
            type="checkbox"
            value="bermuda"
            onChange={filterByCategory}
          />
          <label htmlFor="bermuda" className="ms-2">
            Bermuda
          </label>
          <br />
          <input
            id="panjabi"
            type="checkbox"
            value="panjabi"
            onChange={filterByCategory}
          />
          <label htmlFor="panjabi" className="ms-2">
            panjabi
          </label>
          <br />
          <input
            id="jeans"
            type="checkbox"
            value="jeans"
            onChange={filterByCategory}
          />
          <label htmlFor="jeans" className="ms-2">
            Jeans
          </label>
          <br />
          <input
            id="shoes"
            type="checkbox"
            value="shoes"
            onChange={filterByCategory}
          />
          <label htmlFor="shoes" className="ms-2">
            Shoes
          </label>
          <br />
          <input
            id="saree"
            type="checkbox"
            value="saree"
            onChange={filterByCategory}
          />
          <label htmlFor="saree" className="ms-2">
            Saree
          </label>
          <br />
          <input
            id="lehenga"
            type="checkbox"
            value="lehenga"
            onChange={filterByCategory}
          />
          <label htmlFor="lehenga" className="ms-2">
            Lehenga
          </label>
          <br />
          <input
            id="gopiDress"
            type="checkbox"
            value="gopiDress"
            onChange={filterByCategory}
          />
          <label htmlFor="gopiDress" className="ms-2">
            Gopi Dress
          </label>
          <br />
        </div>
      </section>
    </form>
  )
}

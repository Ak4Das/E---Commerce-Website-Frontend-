import crossBtn from "../assets/close.png"

export default function Offcanvas({
  setPrice,
  setRating,
  setSortBy,
  setCategory,
}) {
  function filterWithPrice(e) {
    setPrice(e.target.value)
  }
  function filterByRating(e) {
    setRating(e.target.value)
  }
  function filterBySort(e) {
    setSortBy(e.target.value)
  }
  function filterByCategory(e) {
    setCategory(e.target.value)
  }
  function resetFilters() {
    setPrice(0)
    setRating(0)
    setSortBy("")
  }
  function handleClick(e) {
    const element = e.target
    const parentElement = element.parentElement
    parentElement.style.left =
      parentElement.style.left === "-305px" ? "" : "-305px"
  }
  return (
    <form
      style={{
        height: "calc(100vh - 56px)",
        maxWidth: "30vw",
        minWidth: "350px",
        position: "fixed",
        top:"58px",
        left: "-305px",
        zIndex: 1,
      }}
      className="bg-light-subtle px-5 py-3 d-inline-block"
    >
      <img
        src={crossBtn}
        alt=""
        className="logo"
        style={{ position: "relative", left: "265px", top: "-5px" }}
        onClick={handleClick}
        title="filter"
      />
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
        <b>Category</b>
        <div className="mt-2 form-check">
          <input
            type="checkbox"
            id="menClothing"
            value="male"
            className="form-check-input"
            onClick={filterByCategory}
          />
          <label htmlFor="menClothing">Male Clothing</label>
          <br />
          <input
            type="checkbox"
            id="menClothing"
            value="female"
            className="form-check-input"
            onClick={filterByCategory}
          />
          <label htmlFor="menClothing">Female Clothing</label>
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
    </form>
  )
}

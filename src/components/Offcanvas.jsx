import crossBtn from "../assets/close.png"

export default function Offcanvas() {
  function onChange(e) {
    console.log(e.target.value)
  }
  function handleClick(e) {
    const element = e.target
    const parentElement = element.parentElement
    parentElement.style.left = parentElement.style.left === "-305px" ? "" : "-305px"
  }
  return (
    <div
      style={{
        height: "calc(100vh - 56px)",
        maxWidth: "30vw",
        minWidth: "350px",
        position:"absolute",
        left:"-305px",
        zIndex:1,
      }}
      className="bg-light-subtle px-5 py-3 d-inline-block"
    >
      <img src={crossBtn} alt="" className="logo" style={{position: "relative",left:"265px",top:"-5px"}} onClick={handleClick} title="filter"/>
      <div className="d-flex justify-content-between my-3">
        <b>Filters</b>
        <b>Clear</b>
      </div>
      <section className="my-3">
        <b>Price</b>
        <div className="d-flex justify-content-between">
          <span>50</span>
          <span>150</span>
          <span>200</span>
        </div>
        <input
          type="range"
          className="w-100"
          onChange={onChange}
          min={50}
          max={200}
        />
      </section>
      <section className="my-3">
        <b>Category</b>
        <div className="mt-2 form-check">
          <input
            type="checkbox"
            id="menClothing"
            className="form-check-input"
          />
          <label htmlFor="menClothing">Men Clothing</label>
          <br />
          <input
            type="checkbox"
            id="menClothing"
            className="form-check-input"
          />
          <label htmlFor="menClothing">Men Clothing</label>
        </div>
      </section>
      <section className="my-3">
        <b>Rating</b>
        <div className="mt-2">
          <input type="radio" name="rating" id="fourStarsAndAbove" />
          <label htmlFor="fourStarsAndAbove" className="ms-2">
            4 stars and above
          </label>
          <br />
          <input type="radio" name="rating" id="threeStarsAndAbove" />
          <label htmlFor="threeStarsAndAbove" className="ms-2">
            3 stars and above
          </label>
          <br />
          <input type="radio" name="rating" id="twoStarsAndAbove" />
          <label htmlFor="twoStarsAndAbove" className="ms-2">
            2 stars and above
          </label>
          <br />
          <input type="radio" name="rating" id="oneStarsAndAbove" />
          <label htmlFor="oneStarsAndAbove" className="ms-2">
            1 stars and above
          </label>
        </div>
      </section>
      <section className="my-3">
        <b>Sort by</b>
        <div className="mt-2">
          <input type="radio" name="sortBy" id="lowToHigh" />
          <label htmlFor="lowToHigh" className="ms-2">
            Price - Low to High
          </label>
          <br />
          <input type="radio" name="sortBy" id="highToLow" />
          <label htmlFor="highToLow" className="ms-2">
            Price - High to Low
          </label>
        </div>
      </section>
    </div>
  )
}

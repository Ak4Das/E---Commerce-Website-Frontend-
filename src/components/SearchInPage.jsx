export default function searchInPage({ margin }) {
  return (
    <div className={`input-group searchInPage ${margin} bg-light py-2`}>
      <input
        type="text"
        className="border border-1 p-2 searchInputInPage"
        style={{ outline: "none" }}
        placeholder="Search Product"
        aria-label="Search Product"
        aria-describedby="button-addon2"
      ></input>
      <button
        className="btn btn-warning searchBtnInPage1"
        style={{ zIndex: 0 }}
        type="button"
        id="button-addon2"
      >
        Search
      </button>
      <button
        className="btn btn-warning searchBtnInPage2"
        style={{ zIndex: 0 }}
        type="button"
        id="button-addon2"
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  )
}

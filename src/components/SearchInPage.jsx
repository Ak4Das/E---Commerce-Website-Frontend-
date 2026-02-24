import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function searchInPage({
  margin,
  setSearch,
  placeHolder = "Search",
  isSearchBarNeeded = true,
  page = "",
}) {
  const [input, setInput] = useState("")
  useEffect(() => {
    if (!input) {
      setSearch(input)
    }
  }, [input])
  function handleChange(e) {
    setInput(e.target.value)
  }
  function handleClick() {
    setSearch(input)
  }
  return (
    <>
      {isSearchBarNeeded && (
        <div className={`input-group searchInPage ${margin} bg-light py-2`}>
          <input
            type="text"
            className="border border-1 p-2 searchInputInPage"
            style={{ outline: "none" }}
            placeholder={placeHolder}
            aria-label={placeHolder}
            aria-describedby="button-addon2"
            onChange={handleChange}
          ></input>
          {!page ? (
            <button
              className="btn btn-warning searchBtnInPage1"
              style={{ zIndex: 0 }}
              type="button"
              id="button-addon2"
              onClick={handleClick}
            >
              Search
            </button>
          ) : (
            <Link
              to={`/products/${input}`}
              className="btn btn-warning searchBtnInPage1"
              style={{ zIndex: 0 }}
              id="button-addon2"
            >
              Search
            </Link>
          )}

          {!page ? (
            <button
              className="btn btn-warning searchBtnInPage2"
              style={{ zIndex: 0 }}
              type="button"
              id="button-addon2"
              onClick={handleClick}
            >
              <i className="bi bi-search"></i>
            </button>
          ) : (
            <Link
              to={`/products/${input}`}
              className="btn btn-warning searchBtnInPage2"
              style={{ zIndex: 0 }}
              id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

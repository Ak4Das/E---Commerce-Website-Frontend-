import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import GetClothsData from "./GetClothsData"
import { Search } from "./Search"

export default function searchInPage({
  margin,
  setSearch,
  placeHolder = "Search",
  isSearchBarNeeded = true,
  page = "",
  position = "position-static",
  top = "",
  zIndex = 0,
}) {
  const { clothsData, setClothsData } = GetClothsData()
  const [input, setInput] = useState("")

  const searchProducts = input ? Search(clothsData, input) : []

  useEffect(() => {
    if (!input) {
      setSearch(input)
    }
  }, [input])

  const isCloth = input !== "" ? (searchProducts.length ? true : false) : false

  function handleChange(e) {
    setInput(e.target.value)
  }

  function handleClick() {
    setSearch(input)
  }
  return (
    <>
      {isSearchBarNeeded && (
        <div
          className={`input-group searchInPage bg-light py-2 ${position}`}
          style={{ top: `${top}`, zIndex }}
        >
          <input
            type="text"
            className={`border border-1 ${margin} p-2 searchInputInPage`}
            style={{ outline: "none" }}
            placeholder={placeHolder}
            aria-label={placeHolder}
            aria-describedby="button-addon2"
            onChange={handleChange}
          ></input>
          {page && isCloth ? (
            <Link
              to={`/products/${searchProducts[0].commonCategory}`}
              className="btn btn-warning searchBtnInPage1"
              style={{ zIndex: 0 }}
              id="button-addon2"
            >
              Search
            </Link>
          ) : (
            <button
              className="btn btn-warning searchBtnInPage1"
              style={{ zIndex: 0 }}
              type="button"
              id="button-addon2"
              onClick={handleClick}
            >
              Search
            </button>
          )}
          {page && isCloth ? (
            <Link
              to={`/products/${searchProducts[0].commonCategory}`}
              className="btn btn-warning searchBtnInPage2"
              style={{ zIndex: 0 }}
              id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </Link>
          ) : (
            <button
              className="btn btn-warning searchBtnInPage2"
              style={{ zIndex: 0 }}
              type="button"
              id="button-addon2"
              onClick={handleClick}
            >
              <i className="bi bi-search"></i>
            </button>
          )}
        </div>
      )}
    </>
  )
}

import { useState } from "react"
import { useEffect } from "react"

export default function searchInPage({ margin, setSearch }) {
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
    <div className={`input-group searchInPage ${margin} bg-light py-2`}>
      <input
        type="text"
        className="border border-1 p-2 searchInputInPage"
        style={{ outline: "none" }}
        placeholder="Search Product"
        aria-label="Search Product"
        aria-describedby="button-addon2"
        onChange={handleChange}
      ></input>
      <button
        className="btn btn-warning searchBtnInPage1"
        style={{ zIndex: 0 }}
        type="button"
        id="button-addon2"
        onClick={handleClick}
      >
        Search
      </button>
      <button
        className="btn btn-warning searchBtnInPage2"
        style={{ zIndex: 0 }}
        type="button"
        id="button-addon2"
        onClick={handleClick}
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  )
}

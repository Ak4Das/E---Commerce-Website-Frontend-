import { useState } from "react"
import ClothsContext from "./ClothsContext"
import initialClothsData from "../components/InitialClothsData"

if (!localStorage.getItem("clothsData")) {
  localStorage.setItem("clothsData", JSON.stringify(initialClothsData))
}

export default function ClothsContextProvider({ children }) {
  const [clothsData, setClothsData] = useState(
    JSON.parse(localStorage.getItem("clothsData")),
  )

  return (
    <ClothsContext.Provider value={{ clothsData, setClothsData }}>
      {children}
    </ClothsContext.Provider>
  )
}

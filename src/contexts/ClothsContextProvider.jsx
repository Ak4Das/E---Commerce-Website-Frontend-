import { useState } from "react"
import ClothsContext from "./ClothsContext"

if (!localStorage.getItem("clothsData")) {
  localStorage.setItem("clothsData", JSON.stringify(initialClothsData))

  console.log(localStorage.clothsData)
}

export default function ClothsContextProvider({ children }) {
  const [clothsData, setClothsData] = useState(
    JSON.parse(localStorage.getItem("clothsData"))
  )

  return (
    <ClothsContext.Provider value={{ clothsData, setClothsData }}>
      {children}
    </ClothsContext.Provider>
  )
}

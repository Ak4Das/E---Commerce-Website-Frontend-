import { useState } from "react"
import ClothsContext from "./ClothsContext"
import { fetchAllCloths, setAllCloths } from "../components/FetchRequests.js"

let initialClothsData = await fetchAllCloths()

if (!initialClothsData.length) {
  await setAllCloths()
  initialClothsData = await fetchAllCloths()
}

export default function ClothsContextProvider({ children }) {
  const [clothsData, setClothsData] = useState(initialClothsData)

  return (
    <ClothsContext.Provider value={{ clothsData, setClothsData }}>
      {children}
    </ClothsContext.Provider>
  )
}

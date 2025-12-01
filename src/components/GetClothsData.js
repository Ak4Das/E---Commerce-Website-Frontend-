import ClothsContext from "../contexts/ClothsContext"
import { useContext } from "react"

export default function GetClothsData() {
  const { clothsData, setClothsData } = useContext(ClothsContext)
  return { clothsData, setClothsData }
}

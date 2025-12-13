import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function AddAddressForm() {
  const id = Number(useParams().id)
  const user = JSON.parse(localStorage.getItem("user"))
  const address = user.address[id]
  const [fullName, setFullName] = useState(address ? address.fullName : "")
  const [mobNo, setMobNo] = useState(address ? address.mobNo : "")
  const [pinCode, setPinCode] = useState(address ? address.pinCode : "")
  const [localInfo, setLocalInfo] = useState(address ? address.localInfo : "")
  const [area, setArea] = useState(address ? address.area : "")
  const [city, setCity] = useState(address ? address.city : "")
  const [state, setState] = useState(address ? address.state : "")
  function handleSubmit(e) {
    e.preventDefault()
    const Address = {
      country: "India",
      fullName,
      mobNo,
      pinCode,
      localInfo,
      area,
      city,
      state,
    }
    const user = JSON.parse(localStorage.getItem("user"))
    Address.id = address ? id : user.address.length
    address ? (user.address[id] = Address) : user.address.push(Address)
    localStorage.setItem("user", JSON.stringify(user))
  }
  return (
    <>
      <main className="container my-5">
        <h2>Add a new address</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <label htmlFor="country" className="form-label">
            Country/Region
          </label>
          <br />
          <input
            id="country"
            type="text"
            className="w-100 form-control"
            defaultValue="India"
          />
          <br />
          <label htmlFor="fullName" className="form-label">
            Full name (First and Last name)
          </label>
          <br />
          <input
            id="fullName"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.fullName : ""}
            onChange={(e) => setFullName(e.target.value)}
          />
          <br />
          <label htmlFor="mobileNo" className="form-label">
            Mobile number
          </label>
          <br />
          <input
            id="mobileNo"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.mobNo : ""}
            onChange={(e) => setMobNo(e.target.value)}
          />
          <br />
          <label htmlFor="pinCode" className="form-label">
            Pincode
          </label>
          <br />
          <input
            id="pinCode"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.pinCode : ""}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <br />
          <label htmlFor="localInfo" className="form-label">
            Flat, House no., Building, Company, Apartment
          </label>
          <br />
          <input
            id="localInfo"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.localInfo : ""}
            onChange={(e) => setLocalInfo(e.target.value)}
          />
          <br />
          <label htmlFor="area" className="form-label">
            Area, Street, Sector, Village
          </label>
          <br />
          <input
            id="area"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.area : ""}
            onChange={(e) => setArea(e.target.value)}
          />
          <br />
          <label htmlFor="city" className="form-label">
            Town/City
          </label>
          <br />
          <input
            id="city"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.city : ""}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <label htmlFor="state" className="form-label">
            State
          </label>
          <br />
          <input
            id="state"
            type="text"
            className="w-100 form-control"
            defaultValue={address ? address.state : ""}
            onChange={(e) => setState(e.target.value)}
          />
          <br />
          <button className="btn btn-warning rounded-pill mt-3" type="submit">
            Add Address
          </button>
        </form>
      </main>
    </>
  )
}

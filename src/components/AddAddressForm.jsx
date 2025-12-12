import { useState } from "react"

export default function AddAddressForm() {
  const [country, setCountry] = useState("")
  const [fullName, setFullName] = useState("")
  const [mobNo, setMobNo] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [localInfo, setLocalInfo] = useState("")
  const [area, setArea] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  function handleSubmit (e) {
    e.preventDefault()
    const address = {country,fullName,mobNo,pinCode,localInfo,area,city,state}
    const user = JSON.parse(localStorage.getItem("user"))
    address.id = user.address.length
    user.address.push(address)
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
            onChange={(e) => setCountry(e.target.value)}
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

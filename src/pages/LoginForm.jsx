import { useState } from "react"
import { Link } from "react-router-dom"
import { saveNewUser } from "../components/FetchRequests"

export default function LoginForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function handleSubmit() {
    const user = {
      name,
      email,
      password,
      profileImage: "",
      address: [],
      addToCartItems: [],
      addToWishlistItems: [],
    }
    const newUser = await saveNewUser(user)
    localStorage.setItem("userId", newUser._id)
  }
  return (
    <main
      className="card mx-auto my-5 loginForm"
      style={{ width: "50%", paddingInline: "48px", paddingBlock: "24px" }}
    >
      <h2 className="text-success">Login Form</h2>
      <form className="mt-4">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="text"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Link
          to="/userAddress"
          className="btn btn-warning"
          onClick={handleSubmit}
        >
          Submit
        </Link>
      </form>
    </main>
  )
}

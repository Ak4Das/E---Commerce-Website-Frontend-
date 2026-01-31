import { useState } from "react"
import { Link } from "react-router-dom"

export default function LoginForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  function handleSubmit(e) {
    const user = {
      name,
      email,
      password,
      profileImage: "",
      address: [],
      addToCartItems:[],
      addToWishlistItems:[]
    }
    console.log(user)
    localStorage.setItem("user", JSON.stringify(user))
  }
  return (
    <main className="card w-50 mx-auto px-5 py-4 my-5">
      <h2>Login Form</h2>
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
        <Link to="/userAddress" className="btn btn-warning" onClick={handleSubmit}>
          Submit
        </Link>
      </form>
    </main>
  )
}

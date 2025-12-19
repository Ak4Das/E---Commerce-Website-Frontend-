import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.jsx"
import ProductListingPage from "./pages/ProductListingPage.jsx"
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx"
import WishlistPage from "./pages/WishlistPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import UserAddresses from "./pages/UserAddresses.jsx"
import AddAddressForm from "./pages/AddAddressForm.jsx"
import YourOrders from "./pages/YourOrders.jsx"
import PaymentMethods from "./pages/PaymentMethod.jsx"
import LoginForm from "./pages/LoginForm.jsx"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/products/:category", element: <ProductListingPage /> },
  { path: "/productDetails/:id", element: <ProductDetailsPage /> },
  { path: "/wishlist", element: <WishlistPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/user", element: <UserProfile /> },
  { path: "/userAddress", element: <UserAddresses /> },
  { path: "/addAddress", element: <AddAddressForm /> },
  { path: "/editAddress/:id", element: <AddAddressForm /> },
  { path: "/yourOrders", element: <YourOrders /> },
  { path: "/paymentMethods", element: <PaymentMethods /> },
  { path: "/paymentMethods/:id", element: <PaymentMethods /> },
  { path: "/paymentMethods/cart", element: <PaymentMethods cart={true}/> },
  { path: "/login", element: <LoginForm /> },
])

import ClothsContextProvider from "./contexts/ClothsContextProvider.jsx"

createRoot(document.getElementById("root")).render(
  <ClothsContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ClothsContextProvider>
)

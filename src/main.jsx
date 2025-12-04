import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.jsx"
import ProductListingPage from "./pages/ProductListingPage.jsx"
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx"
import WishlistPage from "./pages/WishlistPage.jsx"
import CartPage from "./pages/CartPage.jsx"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/products/:category", element: <ProductListingPage /> },
  { path: "/productDetails", element: <ProductDetailsPage /> },
  { path: "/wishlist", element: <WishlistPage /> },
  { path: "/cart", element: <CartPage /> },
])

import ClothsContextProvider from "./contexts/ClothsContextProvider.jsx"

createRoot(document.getElementById("root")).render(
  <ClothsContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ClothsContextProvider>
)

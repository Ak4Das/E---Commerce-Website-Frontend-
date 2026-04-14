async function fetchAllCloths() {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/cloth/")
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function setAllCloths() {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/cloth/seedCloths", {
      method: "PUT",
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateClothById(id, clothData) {
  try {
    const response = await fetch(`https://e-commerce-website-backend-pi.vercel.app/cloth/update/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(clothData),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function fetchCreateOrder() {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/createOrder/")
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateAllItemsInCreateOrder(url, itemsData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(itemsData),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function deleteManyItemsInCreateOrder() {
  try {
    const response = await fetch(
      "https://e-commerce-website-backend-pi.vercel.app/createOrder/deleteMany",
      {
        method: "DELETE",
      },
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function fetchAllUsers() {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/user/")
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function fetchUserById(id) {
  try {
    const response = await fetch(`https://e-commerce-website-backend-pi.vercel.app/user/${id}`)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateUser(id, data) {
  try {
    const response = await fetch(
      `https://e-commerce-website-backend-pi.vercel.app/user/updateUser/${id}`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateAddressOfUser(id, addresses) {
  try {
    const response = await fetch(
      `https://e-commerce-website-backend-pi.vercel.app/user/updateUserAddress/${id}`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(addresses),
      },
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateWishlistItemsInUser(id, items) {
  try {
    const response = await fetch(
      `https://e-commerce-website-backend-pi.vercel.app/user/updateWishlistItems/${id}`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(items),
      },
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateCartItemsInUser(id, items) {
  try {
    const response = await fetch(
      `https://e-commerce-website-backend-pi.vercel.app/user/updateCartItems/${id}`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(items),
      },
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function saveNewUser(newUser) {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/user/saveUser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function saveNewOrder(newOrder) {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/order/saveOrder", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function fetchAllOrders() {
  try {
    const response = await fetch("https://e-commerce-website-backend-pi.vercel.app/order/")
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function deleteOrderById(id) {
  try {
    const response = await fetch(`https://e-commerce-website-backend-pi.vercel.app/order/delete/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

async function updateOrder(id, data) {
  try {
    const response = await fetch(`https://e-commerce-website-backend-pi.vercel.app/order/update/${id}`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("Request Failed")
    }
  } catch (error) {
    throw error
  }
}

export {
  fetchAllCloths,
  setAllCloths,
  updateClothById,
  fetchCreateOrder,
  updateAllItemsInCreateOrder,
  deleteManyItemsInCreateOrder,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  updateAddressOfUser,
  updateWishlistItemsInUser,
  updateCartItemsInUser,
  saveNewUser,
  saveNewOrder,
  fetchAllOrders,
  deleteOrderById,
  updateOrder,
}

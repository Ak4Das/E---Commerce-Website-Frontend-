async function fetchAllCloths() {
  try {
    const response = await fetch("http://localhost:3000/cloth/")
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
    const response = await fetch("http://localhost:3000/seedCloths", {
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

async function updateAllCloths(clothsData) {
  try {
    const response = await fetch("http://localhost:3000/cloth/updateCloths", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(clothsData),
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
    const response = await fetch(`http://localhost:3000/cloth/update/${id}`, {
      method: "POST",
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
    const response = await fetch("http://localhost:3000/createOrder/")
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
      "http://localhost:3000/createOrder/deleteMany",
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

export {
  fetchAllCloths,
  setAllCloths,
  updateAllCloths,
  updateClothById,
  fetchCreateOrder,
  updateAllItemsInCreateOrder,
  deleteManyItemsInCreateOrder,
}

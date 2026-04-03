import Header from "../components/Header"
import CameraIcon from "../assets/camera.png"
import crossBtn from "../assets/cross.png"
import { useState, useEffect } from "react"
import DeliveryBox from "../assets/deliveryBox.jpg"
import AddressIcon from "../assets/address.png"
import Support from "../assets/support.png"
import { Link } from "react-router-dom"
import SearchInPage from "../components/SearchInPage"
import { fetchUserById, updateUser } from "../components/FetchRequests"

export default function UserProfile() {
  const [search, setSearch] = useState("")
  console.log(search)

  /* visible useState is used to if user press change profile image btn then 
  the floating form to change profile image will open and if user will press the cross btn 
  on the floating page then the floating form will disappear from the page */
  const [visible, setVisible] = useState(false)

  const [profileImage, setProfileImage] = useState("")
  const [edit, setEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imagePath, setImagePath] = useState("")

  // file useState is used to store user's selected image file
  const [file, setFile] = useState({})

  const userId = localStorage.getItem("userId")
  const [user, setUser] = useState(null)
  const [isUpdated, setUpdated] = useState(false)


  // if (imagePath) {
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     user.profileImageFile = reader.result
  //     localStorage.setItem("user", JSON.stringify(user))
  //   }
  //   reader.readAsDataURL(file)
  // }

  async function updatePropertiesOfUser(userId, data) {
    try {
      await updateUser(userId, data)
      setUpdated(true)
    } catch (error) {
      throw error
    }
  }

  if (profileImage && !edit) {
    user.profileImage = profileImage
    updatePropertiesOfUser(userId, { profileImage: user.profileImage })
  }

  async function removeProfileImage() {
    user.profileImage = ""
    await updateUser(userId, { profileImage: user.profileImage })
    setEdit(false)
    setProfileImage("")
    setImageUrl("")
    setImagePath("")
  }

  function editProfileImage() {
    imageUrl && setProfileImage(imageUrl)
    imageUrl && setImagePath("")
    setEdit(edit ? false : true)
    const enterImgUrl = document.querySelector(".enterImgUrl")
    enterImgUrl.value = ""
    const enterImagePath = document.querySelector(".enterImagePath")
    enterImagePath.value = ""
  }

  function setVisibility() {
    setVisible(visible ? false : true)
    setEdit(false)
  }

  useEffect(() => {
    async function fetch() {
      const response = await fetchUserById(userId)
      setUser(response)
      if (isUpdated) {
        setUpdated(false)
      }
    }
    fetch()
  }, [isUpdated])

  return (
    <>
      <Header
        position="static"
        top="auto"
        zIndex="auto"
        setSearch={setSearch}
        isSearchBarNeeded={false}
        userDetails={user}
      />
      <SearchInPage
        margin="ms-3"
        setSearch={setSearch}
        isSearchBarNeeded={false}
      />
      <main className="container">
        <div className="d-flex flex-column align-items-center mt-5 position-relative">
          <div
            style={{ width: "100px", height: "100px" }}
            className="overflow-hidden rounded-circle"
          >
            {user && user.profileImage ? (
              imagePath ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="profileImage"
                  className="img-fluid w-100 h-100"
                />
              ) : (
                <img
                  src={user.profileImage}
                  alt="profileImage"
                  className="img-fluid w-100 h-100"
                />
              )
            ) : imagePath ? (
              <img
                src={URL.createObjectURL(file)}
                alt="profileImage"
                className="img-fluid w-100 h-100"
              />
            ) : (
              <div className="bg-info w-100 h-100 fs-1 d-flex align-items-center justify-content-center">
                {user && user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div
            style={{ width: "25px", height: "25px", top: "70px" }}
            className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center changeImage position-absolute"
            title="Change Profile Image"
          >
            <img
              src={CameraIcon}
              alt="CameraIcon"
              className="img-fluid w-100"
              onClick={setVisibility}
            />
          </div>
          <h2 className="mt-3">{user && user.name.toUpperCase()}</h2>
          <h6>{user && user.email}</h6>
          {visible && (
            <div
              className="card px-3 py-3 bg-light position-absolute top-50 start-50 floatingCard"
              style={{
                width: "400px",
                zIndex: 1,
                boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.4)",
              }}
            >
              <section className="position-relative">
                <h2 className="usrAccTextFloatingCard">User Account</h2>
                <button className="border border-0 position-absolute end-0 top-0 bg-light">
                  <img
                    src={crossBtn}
                    alt="crossBtn"
                    className="crossBtnFloatingCard"
                    style={{ width: "20px" }}
                    onClick={setVisibility}
                  />
                </button>
              </section>
              <section className="mt-3">
                <h4 className="profilePicTextFloatingCard">Profile picture</h4>
                <p className="floatingCardText">
                  A picture helps people recognize you and lets you know when
                  you’re signed in to your account
                </p>
                <div
                  className="overflow-hidden rounded-circle mx-auto my-5 floatingCardUserImage"
                  style={{ width: "350px", height: "350px" }}
                >
                  {user.profileImage ? (
                    imagePath ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="profileImage"
                        className="img-fluid w-100 h-100"
                      />
                    ) : (
                      <img
                        src={user.profileImage}
                        alt="profileImage"
                        className="img-fluid w-100 h-100"
                      />
                    )
                  ) : imagePath ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="profileImage"
                      className="img-fluid w-100 h-100"
                    />
                  ) : (
                    <div className="bg-info w-100 h-100 fs-1 d-flex align-items-center justify-content-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div style={{ display: `${edit ? "" : "none"}` }}>
                  <input
                    type="text"
                    placeholder="Enter Image Url"
                    className="form-control enterImgUrl"
                    onChange={(e) => {
                      setImageUrl(e.target.value)
                    }}
                  />
                  <p className="my-0 text-center text-warning my-2">---OR---</p>
                  <input
                    type="file"
                    className="form-control mb-4 enterImagePath"
                    onChange={(e) => {
                      const input = e.target
                      setImagePath(input.value)
                      setFile(e.target.files[0])
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center floatingCardBtns">
                  <button
                    className="btn floatingCardBtn border border-0 rounded-pill p-2 editImageUrl"
                    onClick={editProfileImage}
                  >
                    <i className="bi bi-pen"></i> {edit ? "Edit" : "Change"}
                  </button>
                  <button
                    className="btn floatingCardBtn border border-0 rounded-pill p-2 removeImageUrl"
                    onClick={removeProfileImage}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
        <div className="row mt-5">
          <Link
            to="/yourOrders"
            className="col-md-6 col-xl-4 mb-4 text-decoration-none"
          >
            <div className="card align-items-center gap-2 cardInUserProfilePage p-2">
              <img
                src={DeliveryBox}
                alt="deliveryBox"
                className=""
                style={{ width: "150px" }}
              />
              <div className="card-body">
                <h6>Your Orders</h6>
                <p>Track, Return and buy things again</p>
              </div>
            </div>
          </Link>
          <Link
            to="/userAddress/user"
            className="col-md-6 col-xl-4 mb-4 text-decoration-none"
          >
            <div className="card align-items-center gap-3 cardInUserProfilePage p-2">
              <img
                src={AddressIcon}
                alt="addressIcon"
                className=""
                style={{ width: "100px" }}
              />
              <div className="card-body">
                <h6>Your Addresses</h6>
                <p>Edit address for your orders and gifts</p>
              </div>
            </div>
          </Link>
          <div className="col-md-6 col-xl-4 mb-4">
            <div className="card align-items-center gap-3 cardInUserProfilePage p-2">
              <img
                src={Support}
                alt="support"
                className="ms-3"
                style={{ width: "80px" }}
              />
              <div className="card-body">
                <h6>Contact Us</h6>
                <p>Contact our customer service via phone or chart</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

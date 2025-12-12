import Header from "./Header"
import CameraIcon from "../assets/camera.png"
import crossBtn from "../assets/cross.png"
import { useState } from "react"
import DeliveryBox from "../assets/deliveryBox.jpg"
import AddressIcon from "../assets/address.png"
import Support from "../assets/support.png"

const user = {
  name: "Malika Arora",
  profileImage:
    "https://tse3.mm.bing.net/th/id/OIP.msa3ta2jVWH735uP_b3f-wHaJQ?pid=Api&P=0&h=180",
  email: "malikarora02052@gmail.com",
  phoneNumber: 9883620996,
  address: [],
}

export default function UserProfile() {
  const [visible, setVisible] = useState(false)

  function setVisibility() {
    setVisible(visible ? false : true)
  }
  return (
    <>
      <Header />
      <main className="container">
        <div className="d-flex flex-column align-items-center mt-5 position-relative">
          <div
            style={{ width: "100px", height: "100px" }}
            className="overflow-hidden rounded-circle"
          >
            <img
              src={user.profileImage}
              alt=""
              className="img-fluid w-100 h-100"
            />
          </div>
          <div
            style={{ width: "25px", height: "25px", top: "70px" }}
            className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center changeImage position-absolute"
          >
            <img
              src={CameraIcon}
              alt=""
              className="img-fluid w-100"
              onClick={setVisibility}
            />
          </div>
          <h2 className="mt-3">{user.name.toUpperCase()}</h2>
          <h6>{user.email}</h6>
          {visible && (
            <div
              className="card px-3 py-3 bg-light position-absolute top-50 start-50 floatingCard"
              style={{ width: "400px",zIndex:1 }}
            >
              <section className="position-relative">
                <h2>User Account</h2>
                <button className="border border-0 position-absolute end-0 top-0 bg-light">
                  <img
                    src={crossBtn}
                    alt=""
                    className=""
                    style={{ width: "20px" }}
                    onClick={setVisibility}
                  />
                </button>
              </section>
              <section className="mt-3">
                <h4>Profile picture</h4>
                <p>
                  A picture helps people recognize you and lets you know when
                  you’re signed in to your account
                </p>
                <div
                  className="overflow-hidden rounded-circle mx-auto my-5"
                  style={{ width: "350px", height: "350px" }}
                >
                  <img
                    src={user.profileImage}
                    alt=""
                    className="img-fluid w-100 h-100"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn floatingCardBtn border border-0 rounded-pill p-2">
                    <i class="bi bi-pen"></i> Change
                  </button>
                  <button className="btn floatingCardBtn border border-0 rounded-pill p-2">
                    <i class="bi bi-trash"></i> Remove
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
          <div className="row mt-5">
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="card flex-row gap-2" style={{height:"155px"}}>
                <img src={DeliveryBox} alt="" className="" style={{width:"150px"}} />
                <div className="card-body">
                <h6>Your Orders</h6>
                <p>Track, Return and buy things again</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="card flex-row align-items-center gap-3" style={{height:"155px"}}>
                <img src={AddressIcon} alt="" className="" style={{width:"100px"}} />
                <div className="card-body">
                <h6>Your Addresses</h6>
                <p>Edit address for your orders and gifts</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="card flex-row align-items-center gap-3" style={{height:"155px"}}>
                <img src={Support} alt="" className="ms-3" style={{width:"80px"}} />
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

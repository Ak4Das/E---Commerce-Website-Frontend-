import Header from "../components/Header"
import diwaliDecoration5 from "../assets/diwaliDecoration5.png"
import background from "../assets/background.png"
import background2 from "../assets/background2.png"
import saree1 from "../assets/saree1.png"
import offer2 from "../assets/offer2.png"
import menWearCoat2 from "../assets/menWearCoat2.png"
import womenWearLahenga3 from "../assets/womenWearLahenga3.png"
import shoe1 from "../assets/shoe1.png"
import menWearPanjabi1 from "../assets/menWearPanjabi1.png"
import menWearJeans from "../assets/menWearJeans.png"
import ganpati from "../assets/ganpati.png"
import lakshmiMata from "../assets/lakshmiMata.png"
import ghat from "../assets/ghat.png"
import girlHoldDiya1 from "../assets/girlHoldDiya1.png"
import diwaliDecoration11 from "../assets/diwaliDecoration11.png"
import diwaliDecoration12 from "../assets/diwaliDecoration12.png"
import diwaliDecoration13 from "../assets/diwaliDecoration13.png"

export default function DiwaliSale() {
  return (
    <>
      <Header />
      <main className="mx-5 my-4">
        <section
          className="diwaliSaleSection1"
          style={{
            backgroundImage: `url(${background2})`,
            backgroundSize: "contain",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center gap-3 gap-md-5"
            style={{ paddingBlock: "2vw" }}
          >
            <h1 className="" style={{ fontSize: "4vw", color: "#ff7440" }}>
              Happy
            </h1>
            <img
              src={diwaliDecoration5}
              className=""
              style={{ width: "5vw" }}
              alt=""
            />
            <h1 className="" style={{ fontSize: "4vw", color: "#ff7440" }}>
              Diwali
            </h1>
          </div>
          <div>
            <div className="row row-gap-3 row-gap-sm-4">
              <div className="col-12 col-xxl-6">
                <div
                  className="diwaliSaleCard card p-1 flex-row justify-content-around"
                  style={{
                    backgroundImage:
                      "linear-gradient(-250deg, #f5b7d4 40%, #e595b8 30%)",
                  }}
                >
                  <div className="w-25 d-flex flex-column justify-content-around">
                    <div className="">
                      <span
                        className="DiwaliSaleProductName1 d-inline-block bg-light px-1 px-sm-2 rounded-pill"
                        style={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          color: "#F5B7D4",
                        }}
                      >
                        Saree
                      </span>
                      <img
                        src={offer2}
                        className="diwaliSalePageOffer1 d-block img-fluid w-100"
                        alt=""
                      />
                    </div>
                    <button className="diwaliSaleCheckBtn btn btn-outline-primary rounded-pill">
                      Check
                    </button>
                  </div>
                  <img src={saree1} className="img-fluid h-100" alt="" />
                </div>
              </div>
              <div className="col-12 col-xxl-6">
                <div
                  className="diwaliSaleCard card p-1 flex-row justify-content-around"
                  style={{
                    backgroundImage:
                      "linear-gradient(-250deg, #384967 40%, #6a6561 30%)",
                  }}
                >
                  <div className="w-25 d-flex flex-column justify-content-around">
                    <div className="">
                      <span
                        className="DiwaliSaleProductName2 d-inline-block bg-light px-1 px-sm-2 rounded-pill"
                        style={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          color: "#384967",
                        }}
                      >
                        Suit Pant
                      </span>
                      <img
                        src={offer2}
                        className="diwaliSalePageOffer2 d-block img-fluid w-100"
                        alt=""
                      />
                    </div>
                    <button className="diwaliSaleCheckBtn diwaliSaleCheckBtn2 btn btn-outline-info rounded-pill">
                      Check
                    </button>
                  </div>
                  <img src={menWearCoat2} className="img-fluid h-100" alt="" />
                </div>
              </div>
              <div className="col-12 col-xxl-6">
                <div
                  className="diwaliSaleCard card p-1 flex-row justify-content-around"
                  style={{
                    backgroundImage:
                      "linear-gradient(-250deg, #EBD0A3 40%, #FAF398 30%)",
                  }}
                >
                  <div className="w-25 d-flex flex-column justify-content-around">
                    <div className="">
                      <span
                        className="DiwaliSaleProductName3 d-inline-block bg-light px-1 px-sm-2 rounded-pill"
                        style={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          color: "#EBD0A3",
                        }}
                      >
                        Lahenga
                      </span>
                      <img
                        src={offer2}
                        className="diwaliSalePageOffer3 d-block img-fluid w-100"
                        alt=""
                      />
                    </div>
                    <button className="diwaliSaleCheckBtn diwaliSaleCheckBtn3 btn btn-outline-primary rounded-pill">
                      Check
                    </button>
                  </div>
                  <img
                    src={womenWearLahenga3}
                    className="img-fluid h-100"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 col-xxl-6">
                <div
                  className="diwaliSaleCard card p-1 flex-row justify-content-around"
                  style={{
                    backgroundImage:
                      "linear-gradient(-250deg, #48484a 40%, #252324 30%)",
                  }}
                >
                  <div className="w-25 d-flex flex-column justify-content-around">
                    <div className="">
                      <span
                        className="DiwaliSaleProductName4 d-inline-block bg-light px-1 px-sm-2 rounded-pill"
                        style={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          color: "#48484A",
                        }}
                      >
                        Shoe
                      </span>
                      <img
                        src={offer2}
                        className="diwaliSalePageOffer4 d-block img-fluid w-100"
                        alt=""
                      />
                    </div>
                    <button className="diwaliSaleCheckBtn diwaliSaleCheckBtn4 btn btn-outline-info rounded-pill">
                      Check
                    </button>
                  </div>
                  <img src={shoe1} className="img-fluid h-100" alt="" />
                </div>
              </div>
              <div className="col-12 col-xxl-6">
                <div
                  className="diwaliSaleCard card p-1 flex-row justify-content-around"
                  style={{
                    backgroundImage:
                      "linear-gradient(-250deg, #f42b4e82 40%, #fda47898 30%)",
                  }}
                >
                  <div className="w-25 d-flex flex-column justify-content-around">
                    <div className="">
                      <span
                        className="DiwaliSaleProductName5 d-inline-block bg-light px-1 px-sm-2 rounded-pill"
                        style={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          color: "#F992A4",
                        }}
                      >
                        Panjabi
                      </span>
                      <img
                        src={offer2}
                        className="diwaliSalePageOffer5 d-block img-fluid w-100"
                        alt=""
                      />
                    </div>
                    <button className="diwaliSaleCheckBtn diwaliSaleCheckBtn5 btn btn-outline-primary rounded-pill">
                      Check
                    </button>
                  </div>
                  <img
                    src={menWearPanjabi1}
                    className="img-fluid h-100"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 col-xxl-6">
                <div
                  className="diwaliSaleCard card p-1 flex-row justify-content-around"
                  style={{
                    backgroundImage:
                      "linear-gradient(-250deg, #252424d6 40%, #c4bfbfb5 30%)",
                  }}
                >
                  <div className="w-25 d-flex flex-column justify-content-around">
                    <div className="">
                      <span
                        className="DiwaliSaleProductName6 d-inline-block bg-light px-1 px-sm-2 rounded-pill"
                        style={{
                          fontFamily: '"Lexend Deca", sans-serif',
                          color: "#484747",
                        }}
                      >
                        Jeans
                      </span>
                      <img
                        src={offer2}
                        className="diwaliSalePageOffer6 d-block img-fluid w-100"
                        alt=""
                      />
                    </div>
                    <button className="diwaliSaleCheckBtn diwaliSaleCheckBtn6 btn btn-outline-info rounded-pill">
                      Check
                    </button>
                  </div>
                  <img src={menWearJeans} className="img-fluid h-100" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="mt-4 mt-md-5 py-4"
          style={{
            backgroundImage:
              "radial-gradient(#FEEE02 20%, #F73A0A)",
          }}
        >
          <div className="w-50 d-flex flex-column mx-auto">
            <div className="d-flex">
              <div>
                <img src={ganpati} className="img-fluid w-100" alt="" />
              </div>
              <div>
                <img src={lakshmiMata} className="img-fluid w-100" alt="" />
              </div>
            </div>
            <div className="d-flex align-items-end">
              <div className="w-25">
                <img
                  src={diwaliDecoration11}
                  className="img-fluid w-100"
                  alt=""
                />
              </div>
              <div className="w-50">
                <img
                  src={ghat}
                  className="img-fluid d-block mx-auto w-50 position-relative"
                  style={{ marginBottom: "-5vw" }}
                  alt=""
                />
                <img
                  src={diwaliDecoration13}
                  className="img-fluid d-block mx-auto w-75"
                  alt=""
                />
              </div>
              <div className="w-25">
                <img
                  src={diwaliDecoration12}
                  className="img-fluid w-50"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-100">
            <img
              src={girlHoldDiya1}
              className="img-fluid d-block ms-auto w-25"
              alt=""
            />
          </div>
        </section>
      </main>
    </>
  )
}

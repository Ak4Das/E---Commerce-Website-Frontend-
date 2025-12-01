import Header from "../components/Header"
import cashOnDelivery from "../assets/cash-on-delivery.png"

export default function ProductDetailsPage() {
  return (
    <>
      <Header />
      <main className="bg-body-secondary py-3 px-4 py-sm-5 px-sm-5">
        <div className="bg-light-subtle py-3 px-3 productDetailsContainer">
          <section className="d-sm-flex gap-sm-4 gap-md-5">
            <div className="productDetailsImage" style={{ minWidth: "200px" }}>
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.ZyHsubcEdJwl53fF6D8OsgHaJ4?pid=Api&P=0&h=180"
                alt=""
                className="img-fluid productImage"
              />
              <div className="btnContainer1">
                <button className="btn btn-primary w-100 my-2">Buy Now </button>
                <br />
                <button className="btn btn-secondary w-100">Add To Cart</button>
              </div>
            </div>
            <div className="me-sm-5">
              <small className="text-primary">Brand: Jogmaya Fashion</small>
              <p className="fw-bold lh-sm productDescription">
                Silk Embroidery Designer Lehenga Choli Set For Women Party|
                latest Bridal Stylish Design Wedding Lehenga Choli For Women
                (Free Size)
              </p>
              <div>
                <i class="bi bi-star-fill text-warning" aria-hidden="true"></i>
                <i class="bi bi-star-fill text-warning" aria-hidden="true"></i>
                <i class="bi bi-star-fill text-warning" aria-hidden="true"></i>
                <i class="bi bi-star-fill text-warning" aria-hidden="true"></i>
                <i class="bi bi-star-half text-warning" aria-hidden="true"></i>
                <span class="sr-only"> 4.5</span>
              </div>
              <div>
                <span className="fw-bold fs-5">₹3000</span>
                <span className="text-decoration-line-through ms-2">₹6000</span>
              </div>
              <p className="fw-bold fs-5 text-body-tertiary">50% off</p>
              <div className="mb-3">
                <span className="fw-bold me-2">Quantity: </span>
                <button
                  className="rounded-circle border border-1"
                  style={{ width: "30px", height: "30px" }}
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  type="text"
                  value="1"
                  style={{ width: "30px" }}
                  className="mx-2"
                />
                <button
                  className="rounded-circle border border-1"
                  style={{ width: "30px", height: "30px" }}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div>
                <span className="fw-bold me-3">Size: </span>
                <button className="border border-1 me-2">S</button>
                <button className="border border-1 me-2">M</button>
                <button className="border border-1 me-2">XL</button>
                <button className="border border-1">XXL</button>
              </div>
              <hr />

              <div className="d-flex gap-3 gap-sm-4 gap-md-5 mx-sm-3">
                <div
                  className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                  style={{ width: "50px" }}
                >
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"
                    alt=""
                    className="w-100 img-fluid"
                  />
                  <p
                    className="lh-1 m-0 text-center"
                    style={{ fontSize: "10px" }}
                  >
                    10 days Return & Exchange
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                  style={{ width: "50px" }}
                >
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"
                    alt=""
                    className="w-100 img-fluid"
                  />
                  <p
                    className="lh-1 m-0 text-center"
                    style={{ fontSize: "10px" }}
                  >
                    Free Delivery
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                  style={{ width: "50px" }}
                >
                  <img
                    src={cashOnDelivery}
                    alt=""
                    className="bg-body-tertiary p-2 rounded-circle w-100 img-fluid"
                    style={{ width: "80px" }}
                  />
                  <p
                    className="lh-1 m-0 text-center"
                    style={{ fontSize: "10px" }}
                  >
                    Cash on Delivery
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center gap-1 buyingFeatures"
                  style={{ width: "50px" }}
                >
                  <img
                    src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png"
                    alt=""
                    className="w-100 img-fluid"
                  />
                  <p
                    className="lh-1 m-0 text-center"
                    style={{ fontSize: "10px" }}
                  >
                    Secure transaction
                  </p>
                </div>
              </div>
              <hr />
              {/* COMPLETE */}
              <div>
                <h5>Description</h5>
                <ul>
                  <li>
                    This embroidered lehenga set for women features high-quality
                    Silk fabric, delivering elegance and comfort.
                  </li>
                  <li>
                    Our semi-stitched lehenga set offers flexible fitting up to
                    44 inches, making it the ideal lehenga or festival outfit.
                  </li>
                  <li>
                    A versatile lehenga set for women – suitable for weddings,
                    receptions, Diwali, Navratri, and other grand celebrations.
                  </li>
                  <li>
                    The timeless Lehenga Choli combined with heavy embroidery
                    makes this lehenga set for women a must-have ethnic outfit.
                  </li>
                  <li>
                    This Indian Wedding Outfit is a versatile choice for many
                    occasions. For weddings and receptions, pair it with Kundan
                    jewelry and heels for a royal finish. During festivals like
                    Diwali, Navratri, or Eid, style it with jhumkas and flats or
                    juttis for ease and elegance. For daytime poojas or intimate
                    family gatherings, keep it light with temple jewelry and
                    soft makeup. Whether styled minimally or richly layered,
                    this Festive Wear Lehenga effortlessly adapts to your mood
                    and event, making it a repeat favorite in your ethnic
                    collection.
                  </li>
                  <li>
                    Jogmaya Fashion is trusted for its blend of heritage
                    craftsmanship and contemporary design. Our lehengas are made
                    in India, supporting over 200 women-led artisan teams. To
                    offer an adjustable fit, high-quality embroidery, and
                    affordable luxury, this Lehenga Choli for Women offers
                    premium value. Whether you're a bride, bridesmaid, or guest,
                    you’ll feel confident and beautiful. With thousands of happy
                    customers and top ratings, this lehenga choli guarantees
                    compliments and comfort—making it the perfect outfit for
                    weddings, festive events, and everything in between.
                  </li>
                </ul>
              </div>
              <div className="btnContainer2">
                <button className="btn btn-primary w-100 mb-2">Buy Now</button>
                <button className="btn btn-secondary w-100">Add To Cart</button>
              </div>
            </div>
          </section>
          <hr />
          <section>
            <h3 className="my-3">More items you may like in apparel</h3>
            <div className="row row-gap-3">
              <div className="col-md-4 col-sm-6 col-lg-3 col-xxl-2 py-2 bg-body-tertiary cardContainer">
                <div className="card border border-0">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.HLBsZflTTFBIqeJiweukhgHaLG?pid=Api&P=0&h=180"
                    alt=""
                    className="img-fluid"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <p className="text-center m-0" style={{ fontSize: "15px" }}>
                      Teal Colour Silk Fabric Lagenga Choli comes with a 
                      matching blouse
                    </p>
                    <p className="fw-bold text-center mt-2">₹100000</p>
                    <button className="btn btn-secondary w-100">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-lg-3 col-xxl-2 py-2 bg-body-tertiary cardContainer">
                <div className="card border border-0">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.XbH1iGOIR3UiVE2Jff5KOQHaKU?pid=Api&P=0&h=180"
                    alt=""
                    className="img-fluid"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <p className="text-center m-0" style={{ fontSize: "15px" }}>
                      Banglori Silk Wedding Lehenga Choli comes with a 
                      matching blouse
                    </p>
                    <p className="fw-bold text-center mt-2">₹105000</p>
                    <button className="btn btn-secondary w-100">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-lg-3 col-xxl-2 py-2 bg-body-tertiary cardContainer">
                <div className="card border border-0">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.lbytqlvwLrdhTC7m78KLMQHaHa?pid=Api&P=0&h=180"
                    alt=""
                    className="img-fluid"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <p className="text-center m-0" style={{ fontSize: "15px" }}>
                      Top Silk Fabric Green Lehenaga Choli comes with a 
                      matching blouse
                    </p>
                    <p className="fw-bold text-center mt-2">₹102000</p>
                    <button className="btn btn-secondary w-100">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-lg-3 col-xxl-2 py-2 bg-body-tertiary cardContainer">
                <div className="card border border-0">
                  <img
                    src="https://tse4.mm.bing.net/th/id/OIP.f20dI0jBl54s1e93-6ZIAgHaJQ?pid=Api&P=0&h=180"
                    alt=""
                    className="img-fluid"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <p className="text-center m-0" style={{ fontSize: "15px" }}>
                      Velvet Lehenga Perfect for winter Bride comes with a 
                      matching blouse
                    </p>
                    <p className="fw-bold text-center mt-2">₹104000</p>
                    <button className="btn btn-secondary w-100">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

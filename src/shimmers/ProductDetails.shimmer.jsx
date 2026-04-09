import { HeaderShimmer } from "./styled.components"
import styles from "../style_modules/ProductDetailsShimmer.module.css"

export default function ProductDetailsShimmer() {
  return (
    <>
      <HeaderShimmer />
      <main
        className={`bg-body-secondary py-3 px-4 py-sm-5 px-sm-5 ${styles.main}`}
      >
        <div
          className={`bg-light-subtle py-3 px-3 productDetailsContainer ${styles.productDetailsContainer}`}
        >
          <section className="d-sm-flex gap-sm-4 gap-xl-5 productDetailsContainerFirstSection">
            <div className="productDetailsImage top-0 start-0">
              <img
                src="https://placehold.co/250x300?text=Loading..."
                alt=""
                className="productImage"
              />
              <div className="btnContainer1">
                <button className={`btn w-100 mt-2 ${styles.btn}`}>Buy</button>
                <button className={`btn w-100 mt-2 ${styles.btn}`}>Cart</button>
                <button className={`btn w-100 mt-2 ${styles.btn}`}>
                  Wishlist
                </button>
              </div>
            </div>
            <div className={`${styles.boxContainer}`}>
              <div className={`${styles.box1}`}></div>
              <div className={`mt-3 ${styles.box2}`}></div>
              <div className={`mt-3 ${styles.box3}`}></div>
              <div className={`mt-3 ${styles.box4}`}></div>
              <div className={`mt-3 ${styles.box5}`}></div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

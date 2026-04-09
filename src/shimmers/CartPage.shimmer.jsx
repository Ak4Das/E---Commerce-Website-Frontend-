import { HeaderShimmer } from "./styled.components"
import styles from "../style_modules/CartPageShimmer.module.css"

export default function CartPageShimmer() {
  return (
    <>
      <HeaderShimmer/>
      <main className="bg-body-secondary pb-3">
        <div className="container">
            <h3 className="py-4 text-center">My Cart</h3>
            <div className="d-md-flex justify-content-between align-items-start cartContainer">
                <section className={`productsInCurt ${styles.section1}`}>
                    <div className="row mb-3">
                        <div className="col-sm-12 col-md-12 mb-3">
                            <div className={`card productCardInCart ${styles.card}`}>
                                <div className="card-body"></div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 mb-3">
                            <div className={`card productCardInCart ${styles.card}`}>
                                <div className="card-body"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`px-5 py-4 totalBill ${styles.section2}`}>
                </section>
            </div>
        </div>
      </main>
    </>
  )
}

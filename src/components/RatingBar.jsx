export default function RatingBar({ rating }) {
  const percent = (100 / 5) * rating
  return (
    <div className="star-bottom position-relative d-flex" style={{gap:"1px"}}>
      <i className="bi bi-star-fill" style={{fontSize:"20px",color:"rgb(150, 147, 147)"}}></i>
      <i className="bi bi-star-fill" style={{fontSize:"20px",color:"rgb(150, 147, 147)"}}></i>
      <i className="bi bi-star-fill" style={{fontSize:"20px",color:"rgb(150, 147, 147)"}}></i>
      <i className="bi bi-star-fill" style={{fontSize:"20px",color:"rgb(150, 147, 147)"}}></i>
      <i className="bi bi-star-fill" style={{fontSize:"20px",color:"rgb(150, 147, 147)"}}></i>
      <div
        className="star-top-container position-absolute top-0 start-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        <div className="star-top d-flex" style={{gap:"1px"}}>
          <i className="bi bi-star-fill" style={{fontSize:"20px",color:"gold"}}></i>
          <i className="bi bi-star-fill" style={{fontSize:"20px",color:"gold"}}></i>
          <i className="bi bi-star-fill" style={{fontSize:"20px",color:"gold"}}></i>
          <i className="bi bi-star-fill" style={{fontSize:"20px",color:"gold"}}></i>
          <i className="bi bi-star-fill" style={{fontSize:"20px",color:"gold"}}></i>
        </div>
      </div>
    </div>
  )
}

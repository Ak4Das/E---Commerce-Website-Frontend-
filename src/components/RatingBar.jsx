export default function RatingBar({ rating }) {
  const percent = (100 / 5) * rating
  return (
    <div className="star-bottom position-relative d-inline-block">
      <div
        className="star-top-container position-absolute top-0 start-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        <div className="star-top"></div>
      </div>
    </div>
  )
}

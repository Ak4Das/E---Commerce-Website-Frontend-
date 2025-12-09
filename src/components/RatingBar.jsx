export default function RatingBar({ rating }) {
  console.log(rating)
  const percent = (100 / 5) * rating
  return (
    <div className="star-outer position-relative d-inline-block">
      <div
        className="star-inner position-absolute top-0 start-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  )
}

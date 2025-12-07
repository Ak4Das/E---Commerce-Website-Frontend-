export default function RatingBar({ rating }) {
  console.log(rating)
  const percent = (100 / 5) * rating
  return (
    <div className="star-outer">
      <div className="star-inner" style={{ width: `${percent}%` }}></div>
    </div>
  )
}

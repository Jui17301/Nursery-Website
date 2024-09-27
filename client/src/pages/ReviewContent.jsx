import React from 'react'

const ReviewContent = () => {
  return (
    <div>
      
      {reviews.map((review, index) => (
        <div key={index}>
        
          <img src={review.img} alt={review.title} style={{ width: '150px', height: '150px' }} />
          <h3>{review.title}</h3>
          <p><strong>{review.name}:</strong> {review.comment}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewContent

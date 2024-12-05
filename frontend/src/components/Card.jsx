import React from 'react'
import '../style/card.css'

function Card({name, price, rating}) {
  return (
    <div className='card'>
        <img src="" alt="" />
        <h4>{name}</h4>
        <p> Rs. {price}</p>
        <p className="rating">{rating}</p>
    </div>
  )
}

export default Card
import React from 'react'
import FavoriteIcon from '../../components/common/FavoriteIcon'
import { Link } from 'react-router-dom'

const ProductCard = ({ id, title, description, price, discount, rating, brand, thumbnail, slug }) => {
  return (
    <div className="flex flex-col hover:scale-105 relative">
      <Link to={`/product/${slug}`}>
        <img
          src={thumbnail}
          className="h-[320px] 
        ] w-[280px] 
        border rounded-lg object-cover cursor-pointer"
          alt={title}></img></Link>
      <button onClick={() => { console.log('click button') }} className='absolute top-0 right-0 pt-2 pr-2'><FavoriteIcon /></button>
      <div className="flex justify-between items-center">
        <div className="flex flex-col pt-2">
          <p className="text-[16px] p-1">{title}</p>
          {description && (
            <p className="text-[12px] px-1 text-gray-600">{brand}</p>
          )}
        </div>
        <div>
          <p>{price}</p>
        </div>

      </div>
    </div>
  )
}

export default ProductCard
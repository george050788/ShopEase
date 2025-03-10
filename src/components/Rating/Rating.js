import React, { useMemo } from 'react'
import StarIcon from '../common/StarIcon'
import EmptyStar from '../common/EmptyStar'

const Rating = ({ rating }) => {
  const ratingNumber = useMemo(() => {
    return Array(Math.floor(Number(rating))).fill()
  }, [rating])
  return (
    <div className='flex items-center'>
      {ratingNumber?.map((_, index) =>
        <StarIcon key={index} />
      )}
      {
        Array(5 - ratingNumber?.length).fill().map((_, index) =>
          <EmptyStar key={'empty-' + index} />)
      }
      <p className='px-2 text-gray-500'>{rating}</p>
    </div>
  )
}

export default Rating
import React, { useState } from 'react'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import './PriceFilter.css'

const PriceFilter = () => {
  const [range, setRange] = useState({
    min: 10,
    max: 250
  })

  return (
    <div><p className='text-[16px] text-black mt-5 mb-5'>Price</p>
      <RangeSlider className={'custom-range-slider'} min={0} max={400} defaultValue={[range.min, range.max]} onInput={(values) => setRange({
        min: values[0],
        max: values[1]
      })} />
      <div className='flex justify-between mb-5'>
        <div className='max-w-[50%] h-8 border rounded-lg w-[40%] mt-4 flex items-center'><p className='pl-4'>$</p><input type="number" value={range?.min} className='outline-none px-4 bg-white' min={0} max='400' disabled /></div>
        <div className='max-w-[50%] h-8 border rounded-lg w-[40%] mt-4 flex items-center'><p className='pl-4'>$</p><input type="number" value={range?.max} className='outline-none px-4 bg-white' min={0} max='500' disabled /></div>

      </div>
    </div>
  )
}

export default PriceFilter
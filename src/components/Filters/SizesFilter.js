import React, { useState, useCallback, useEffect } from 'react'

const SizesFilter = ({ sizes, hidleTitle, multi = true, onChange }) => {
  const [appliedSizes, setAppliedSizes] = useState([])
  const sizesSelected = useCallback((item) => {

    if (appliedSizes?.indexOf(item) > -1) {
      setAppliedSizes(appliedSizes?.filter(size => size !== item))

    } else {
      if (multi) {

        setAppliedSizes([...appliedSizes, item])
      } else {
        setAppliedSizes([item])
      }
    } onChange && onChange(item)
  }, [appliedSizes, multi])

  useEffect(() => {
    onChange && onChange(appliedSizes)
  }, [appliedSizes, onChange])
  return (
    <div className={`flex flex-col ${hidleTitle ? '' : 'mb-4'}`}>
      {!hidleTitle && <p className='text-[16px] text-black mt-5 mb-5'>Size</p>}
      <div className='flex flex-wrap px-2'>
        {sizes?.map(item => {
          return <div className='flex flex-col  mr-2'>
            <div className='w-[50px] h-7 text-gray-400 text-center border rounded-lg mr-4 mb-4 cursor-pointer 
            hover:outline-2 hover:scale-110 bg-white border-black'
              style={appliedSizes?.includes(item) ? { backgroundColor: 'black', color: 'white' } : {}} onClick={() => { sizesSelected(item) }}>{item}</div>


          </div>
        })}
      </div>
    </div>
  )
}

export default SizesFilter
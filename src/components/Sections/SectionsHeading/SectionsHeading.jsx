import React from 'react'

const SectionsHeading = ({ title }) => {
  return (
    <div className="flex flex-wrap px-10 my-5">
      <div className="border rounded border-1 bg-black w-2 h-10"></div>
      <p className="text-2xl ml-3">{title}</p>
    </div>
  )
}

SectionsHeading.defaultProps = {}

SectionsHeading.prototye = {
  title: String,
}

export default SectionsHeading

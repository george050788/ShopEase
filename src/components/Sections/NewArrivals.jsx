import React from 'react'
import SectionsHeading from './SectionsHeading/SectionsHeading'
import Card from '../Card/Card'
import Jeans from '../../assets/img/jeans.jpg'
import Tshirt from '../../assets/img/tshirts.jpeg'
import shirts from '../../assets/img/shirts.jpg'
import dresses from '../../assets/img/dresses.jpg'
import kurtis from '../../assets/img/kurtis.jpg'
import joggers from '../../assets/img/joggers.jpg'
import Carousel from 'react-multi-carousel'
import { responsive } from '../../utils/Section.constants'
import './NewArrivals.css'

const NewArrivals = () => {
  const items = [
    {
      title: 'Jeans',
      imagePath: Jeans,
    },
    {
      title: 'Shirts',
      imagePath: shirts,
    },
    {
      title: 'T-Shirts',
      imagePath: Tshirt,
    },
    {
      title: 'Dresses',
      imagePath: dresses,
    },
    {
      title: 'Joggers',
      imagePath: joggers,
    },
    {
      title: 'Kurtis',
      imagePath: kurtis,
    },
  ]

  return (
    <div>
      <SectionsHeading title={'New Arrivals'} />
      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        itemClass={'react-slider-custom-item'}
        className="px-8">
        {items &&
          items?.map((item, index) => (
            <Card
              key={item?.title + index}
              title={item.title}
              imagePath={item.imagePath}
            />
          ))}
      </Carousel>
    </div>
  )
}

export default NewArrivals

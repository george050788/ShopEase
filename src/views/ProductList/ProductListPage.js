import React, { useEffect, useMemo, useState } from 'react'
import content from '../../data/content.json'
import FilterIcon from '../../components/common/FilterIcon'
import Categories from '../../components/Filters/Categories'
import PriceFilter from '../../components/Filters/PriceFilter'
import ColorsFilter from '../../components/Filters/ColorsFilter'
import SizesFilter from '../../components/Filters/SizesFilter'
import ProductCard from './ProductCard'
import { getAllProducts } from '../../api/fetchProduct'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/features/common'

const categories = content?.categories

const ProductListPage = ({ categoryType }) => {

  const categoryData = useSelector((state) => state?.categoryState?.categories)
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType)
  }, [categoryType])

  const productListItems = useMemo(() => {
    return content?.products?.filter((product) => product?.category_id === categoryContent?.id)
  }, [categoryContent])

  const category = useMemo(() => {
    return categoryData?.find(element => element?.code === categoryType)
  }, [categoryData, categoryType])

  useEffect(() => {
    dispatch(setLoading(true))
    getAllProducts(category?.id).then(res => {
      setProducts(res)
    }).catch(err => {

    }).finally(() => {
      dispatch(setLoading(false))
    })
  }, [category?.id, dispatch])
  return (
    <div>

      <div className='flex'>
        <div className='w-[20%] p-[20px] border rounded-lg m-[20px]'>
          {/* filter */}
          <div className='flex justify-between'>
            <p className='text-[16px] text-gray-600'>Filter</p>
            <FilterIcon />
          </div>
          <div>
            <p className='text-[16px] text-black mt-5'>Categories</p>
            <Categories types={categoryContent?.types} />
            <PriceFilter />
            <hr />
            {/* colors */}
            <ColorsFilter colors={categoryContent?.meta_data?.colors} />
            <hr />
            {/* Sizes */}
            <SizesFilter sizes={categoryContent?.meta_data?.sizes} />
          </div>
        </div>
        <div className='p-[15px]'>
          {/* products */}
          <p className='text-black text-lg '>{category?.description}</p>
          <div className='pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 px-2 gap-8 pb-10'>
            {products?.map((item, index) =>
              <ProductCard key={item?.id + "_" + index}{...item} title={item?.name} />
            )}

          </div>
        </div>

      </div>

    </div>
  )
}

export default ProductListPage
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
// import content from '../../data/content.json'
import Rating from '../../components/Rating/Rating'
import SizesFilter from '../../components/Filters/SizesFilter'
import ProductColors from './ProductColors'
import { CartIcon } from '../../components/common/CartIcon'
import SvgCreditCard from '../../components/common/SvgCreditCard'
import SvgCloth from '../../components/common/SvgCloth'
import SvgShipping from '../../components/common/SvgShipping'
import SvgReturn from '../../components/common/SvgReturn'
import SectionHeading from '../../components/Sections/SectionsHeading/SectionsHeading'
import ProductCard from '../ProductList/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { getAllProducts } from '../../api/fetchProduct'
import { addItemToCartAction } from '../../store/actions/cartAction'

// const categories = content?.categories

const extraSections = [
  {
    icon: <SvgCreditCard />,
    label: 'Secure payment'
  }, {
    icon: <SvgCloth />,
    label: 'Size & Fit'
  },
  {
    icon: <SvgShipping />,
    label: 'Free shipping'
  },
  {
    icon: <SvgReturn />,
    label: 'Free Shipping & Returns'
  }
]

const ProductDetails = () => {


  const { product } = useLoaderData()

  const [image, setImage] = useState()
  const [breadCrumbLinks, setBreadCrumbLinks] = useState([])
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartState?.cart)
  const [similarProducts, setSimilarProducts] = useState()
  const categories = useSelector((state) => state?.categoryState?.categories)
  const [selectedSized, setSelectedSized] = useState('')
  const [error, setError] = useState('')

  // const similarProducts = useMemo(() => {
  //   return content?.products?.filter((item) => product?.type_id === item?.type_id && item?.id !== product?.id)
  // }, [product])

  const productCateogry = useMemo(() => {
    return categories?.find((category) => category?.id === product?.categoryId)
  }, [product, categories])

  useEffect(() => {
    getAllProducts(product?.categoryId, product?.categoryTypeId).then(res => {
      const excludedProduct = res?.filter((item) => item?.id !== product?.id)
      setSimilarProducts(excludedProduct)
    }).catch(() => [

    ])
  }, [product?.categoryId, product?.categoryTypeId])

  useEffect(() => {
    setImage(product?.thumbnail)
    setBreadCrumbLinks([])
    const arrayLink = [{ title: 'Shop', path: '/' },
    {
      title: productCateogry?.name,
      path: productCateogry?.name
    }]
    const productType = productCateogry?.categoryTypes?.find((item) => item?.id === product?.categoryTypeId)
    if (productType) {
      arrayLink?.push(
        {
          title: productType?.name,
          path: productType?.name
        })
    }

    setBreadCrumbLinks(arrayLink)
  }, [productCateogry, product])

  const addItemToCart = useCallback(() => {
    console.log('size', selectedSized)
    if (!selectedSized) {
      setError('Please select size')
    }
    else {
      const selectedVariant = product?.variants?.filter((variant) => variant?.size === selectedSized)?.[0]
      console.log("selected ", selectedVariant)
      if (selectedVariant?.stockQuantity > 0) {
        dispatch(addItemToCartAction({
          productId: product?.id,
          thumbnail: product?.thumbnail,
          name: product?.name,
          variant: selectedVariant,
          quantity: 1,
          subTotal: product?.price,
          price: product?.price
        }))
      } else {
        setError('Out of Stock')
      }
    }
  }, [dispatch, product, selectedSized])

  const colors = useMemo(() => {
    const colorSet = _.uniq(_.map(product?.variants, 'color'))
    return colorSet
  }, [product])

  const sizes = useMemo(() => {
    const sizeSet = _.uniq(_.map(product?.variants, 'size'))
    return sizeSet
  }, [product])
  if (!product) {
    return <p>Product not found. Please check the URL or try again later.</p>
  }

  return (
    <>
      <div className='flex flex-col  md:flex-row px-10'>
        <div className='w-[40%] lg:w-[50%] md:w-[40%]'>
          {/* Image */}
          <div className='flex flex-col md:flex-row'>
            <div className='w-[100%] md:w-[20%] justify-center h-[40px] md:h-[420px]'>
              {/* stack image */}
              <div className='flex flex-row md:flex-col justify-center h-full'>
                {
                  product?.productResources?.map((item, index) => (
                    <button onClick={() => setImage(item?.url)} className='rounded-lg w-fit p-2 mb-2'><img src={item?.url} className='h-[60px] w-[60px] bg-cover
                   bg-center rounded-lg hover:scale-105'
                      key={index} alt={'sample' + index} /></button>
                  ))
                }
              </div>
            </div>
            <div className='w-full md:w-[80%] justify-center md:pt-0 pt-10'>
              <img src={image} alt={product?.name} className='h-full w-full max-h-[520px] border rounded-lg 
            cursor-pointer object-cover' />
            </div>
          </div>
        </div>
        <div className='w-[60%] px-10'>
          {/* Product Des */}
          <Breadcrumb links={breadCrumbLinks} />
          <p className='text-3xl pt-2'>{product?.name}</p>
          <Rating rating={product?.rating} />
          <p className='text-xl bold py-2'>{product?.price}</p>
          <div className='flex flex-col'>
            <div className='flex gap-2'>
              <p className='text-sm bold'>Select Size</p>
              <Link to={'https://en.wikipedia.org/wiki/Clothing_sizes'} target='_blank' className='text-sm text-gray-500 hover:text-gray-900'>{'Size Guide ->'}</Link>
            </div>
          </div>
          <div className='mt-2'><SizesFilter onChange={(values) => setSelectedSized(values?.[0])} sizes={sizes} hidleTitle multi={false} /></div>
          <div>
            <p className='text-lg bold'>Colors Avaliable</p>
            <ProductColors colors={colors} />
          </div>
          <div className='flex py-4'>
            <button onClick={addItemToCart} className='bg-black rounded-lg w-[150px] px-2'><div className='flex items-center bg-black text-white'><CartIcon bgColor={'black'} />Add to cart</div></button>
          </div>
          {error && <p className='text-lg text-red-600'>{error}</p>}
          <div className='grid grid-cols-2 gap-4 pt-4'>
            {
              extraSections?.map((section) => (
                <div className='flex  items-center'>
                  {section?.icon}
                  <p>{section?.label}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div >
      <SectionHeading title={'Product Description'} />
      <div className='md:w-[50%] w-full p-2'>
        <p className='px-8'>{product?.description}</p>
      </div>
      <SectionHeading title={'Similar Products'} />
      <div className='flex px-10'>
        <div className='pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 px-2 gap-8 pb-10'>
          {similarProducts?.map((item, index) =>
            <ProductCard key={index}{...item} />
          )}
          {!similarProducts?.length && <p>No Products Found!</p>}

        </div>
      </div>
    </>
  )
}

export default ProductDetails
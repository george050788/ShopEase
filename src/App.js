import React, { useEffect } from 'react'
import Navigation from './components/Navigation/Navigation'
import HeroSection from './components/HeroSection/HeroSection'
import NewArrivals from './components/Sections/NewArrivals'
import Category from './components/Sections/Category/Category'
import content from './data/content.json'
import Footer from './components/Footer/Footer'
import { fetchCategories } from './api/fetchCategories'
import { useDispatch } from 'react-redux'
import { loadCategories } from './store/features/category'
import { setLoading } from './store/features/common'

function App () {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    fetchCategories().then(res => {
      dispatch(loadCategories(res))
    }).catch(err => {

    }).finally(() => {
      dispatch(setLoading(false))
    })

  }, [])
  return (
    <div className="App">

      <HeroSection />
      <NewArrivals />
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections?.map((item, index) => <Category key={item?.title + index} {...item} />)}
      <Footer content={content?.footer} />

    </div>
  )
}

export default App

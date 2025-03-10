import { getProductBySlug } from '../api/fetchProduct'
// import content from '../data/content.json'
import { setLoading } from '../store/features/common'
import store from '../store/store'

export const loadProductBySlug = async ({ params }) => {
  try {
    store.dispatch(setLoading(true))
    const product = await getProductBySlug(params?.slug)
    store.dispatch(setLoading(false))
    return { product }
  }
  catch (err) {
    console.error(err)
  }
}
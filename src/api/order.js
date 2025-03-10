import { API_BASE_URL, getHeaders } from "./constant"
import axios from "axios"

export const placeOrderAPI = async (data) => {
  const url = API_BASE_URL + '/api/order'
  try {
    const response = await axios(url, {
      method: "POST",
      data: data,
      headers: getHeaders()
    })
    return response?.data
  }
  catch (err) {

    throw new Error(err)
  }
}

export const confirmPaymentAPI = async (data) => {
  const url = API_BASE_URL + '/api/order/uodate-payment'
  try {
    const response = await axios(url, {
      method: "POST",
      data: data,
      headers: getHeaders()
    })
    return response?.data
  }
  catch (err) {

    throw new Error(err)
  }
}
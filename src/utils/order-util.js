

export const createOrderRequest = (cartItems, userId, addressId) => {
  let request = {}
  request.userId = userId
  request.addressId = addressId
  request.orderDate = new Date().toISOString
  let orderItems = []
  let amount = 0
  cartItems?.map((item) => {
    amount += item?.subTotal
    orderItems?.push({
      productId: item.productId,
      productVariantId: item?.variant?.id,
      discount: 0,
      quantity: item?.quantity
    })
  })
  request.orderItemRequest = orderItems
  request.totalAmount = amount?.toFixed(2)
  request.discount = 50
  request.paymentMethod = "CARD"
  request.expectedDeliveryDate = "2025-01-24T05:13:24.674Z"
  request.currency = 'usd'
  return request


}

export const getStepCount = {
  'PENDING': 1,
  'IN_PROGRESS': 2,
  'SHIPPED': 3,
  'DELIVERED': 4
}
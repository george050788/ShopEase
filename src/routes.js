import { createBrowserRouter } from "react-router-dom"
import ProductListPage from "./views/ProductList/ProductListPage"
import App from './App'
import ShopApplicationWrapper from "./views/ShopApplicationWrapper"
import ProductDetails from "./views/ProductDetail/ProductDetails"
import { loadProductBySlug } from "./routes/products"
import AuthenticationWrapper from "./views/AuthenticationWrapper"
import Login from "./views/Login/Login"
import Register from "./views/Register/Register"
import OAuth2LoginCallback from "./views/OAuth2LoginCallback"
import Cart from "./views/Cart/Cart"
import Account from "./views/Account/Account"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Checkout from "./views/Checkout/Checkout"
import PaymentPage from "./views/PaymentPage/PaymentPage"
import ConfirmPayment from "./views/ConfirmPayment/ConfirmPayment"
import OrderConfirmed from "./views/OrderConfirmed/OrderConfirmed"
import Profile from "./views/Account/Profile"

import Orders from "./views/Account/Orders"
import Settings from "./views/Account/Settings"
import AdminPanel from "./views/AdminPanel/AdminPanel"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopApplicationWrapper />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/women',
        element: <ProductListPage categoryType={'WOMEN'} />
      },
      {
        path: '/men',
        element: <ProductListPage categoryType={'MEN'} />
      },
      {
        path: '/product/:slug',
        loader: loadProductBySlug,
        element: <ProductDetails />
      },
      {
        path: 'cart-items',
        element: <Cart />
      },
      {
        path: '/account-details',
        element: <ProtectedRoute><Account /></ProtectedRoute>,
        children: [
          {
            path: 'profile',
            element: <ProtectedRoute><Profile /></ProtectedRoute>
          },
          {
            path: 'orders',
            element: <ProtectedRoute><Orders /></ProtectedRoute>
          }, {
            path: 'settings',
            element: <ProtectedRoute><Settings /></ProtectedRoute>
          },
        ]
      },
      {
        path: '/checkout',
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
      },
      {
        path: '/orderConfirmed',
        element: <OrderConfirmed />
      }
    ]
  },
  {
    path: '/v1',
    element: <AuthenticationWrapper />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/oauth2/callback',
    element: <OAuth2LoginCallback />
  },
  {
    path: '/confirmPayment',
    element: <ConfirmPayment />
  },
  {
    path: '/admin/*',
    element: <ProtectedRoute><AdminPanel /></ProtectedRoute>
  }
])
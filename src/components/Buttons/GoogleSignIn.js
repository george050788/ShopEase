import React, { useCallback } from 'react'
import GoogleIcon from '../../assets/img/Google.png'
import { API_BASE_URL } from '../../api/constant'


const GoogleSignIn = () => {
  const handleClick = useCallback(() => {
    window.location.href = API_BASE_URL + "/oauth2/authorization/google"
  }, [])


  return (
    <button onClick={handleClick} className='flex justify-center items-center border rounded w-full border-gray-600 h-[48px] bg-slate-50'>
      <img src={GoogleIcon} alt="google-icon" />
      <p className='px-2 text-gray-500'>Continue With Google</p>
    </button>
  )
}

export default GoogleSignIn
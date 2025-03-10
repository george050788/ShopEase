import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/features/common'

import { verifyAPI } from '../../api/authentication'

const VerifyCode = ({ email }) => {

  const [values, setValues] = useState({
    userName: '',
    code: ''
  })
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    setError('')
    dispatch(setLoading(true))
    verifyAPI(values).then(res => {
      setMessage('Thank you! Your email has been successfully verified. You can now login in to your account.')
    }).catch(err => {
      setError('The verification code you entered is incorrect or has expired.')
    }).finally(() => {
      dispatch(setLoading(false))
    })

  }, [dispatch, values])

  const handleOnChange = useCallback((e) => {
    e.persist()
    setValues(values => ({
      ...values,
      [e.target.name]: e.target?.value,
    }))
  }, [])
  return (
    <div className='p-4'>
      {!message && <>
        <p className='text-lg text-blue-900'>Registration successful! Please check your email for the verification code to complete your registration.</p>
        <p className='text-lg text-gray-600 pt-4 font-bold'>Please enter the 6-digit verification code sent to your email to verify your account.</p>

        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <input type="text" name='code' value={values?.code} maxLength={6} onChange={handleOnChange} placeholder='6 digit code' className='h-[48px] border rounded border-gray-600 p-2 mt-4' required />
          <button className='border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Verify</button>
        </form>
        {error && <p className='text-lg text-red-700'>{error}</p>}
      </>}
      {message && <p className='text-lg'>{message}</p>}
    </div>
  )
}

export default VerifyCode
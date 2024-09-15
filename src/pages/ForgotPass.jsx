import React, { useState } from 'react'
import { useResetPass } from '../hooks/useResetPass'

const ForgotPass = () => {
  const [email, setEmail] = useState("")
  const { loading, resetPass } = useResetPass();

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    await resetPass(email)
  }

  return (
    <div className='lg:min-h-screen flex justify-center items-center'>
      <div className="mx-auto max-w-md w-full">
      <form onSubmit={handleResetSubmit} className='w-full flex flex-col justify-center items-center space-y-5'>
        <h1 className='text-xl'>Password Recovery</h1>
      <label htmlFor="forgotPass" className='flex flex-col w-full'>
            Please enter your email *
            <input type="email" id='forgotPass' value={email} onChange={(e) => setEmail(e.target.value)} className='border-[1.5px] border-zinc-400 rounded-md px-3 py-2'/>
        </label>
        <button type='submit' className='mx-auto w-[max-content] px-6 py-2 rounded-md bg-zinc-600 text-zinc-300'>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      </div>
    </div>
  )
}

export default ForgotPass

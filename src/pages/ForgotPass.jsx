import React, { useState } from 'react'
import { useResetPass } from '../hooks/useResetPass'

const ForgotPass = () => {
  const [email, setEmail] = useState("")
  const { loading, resetPass, error, setError } = useResetPass();

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    await resetPass(email)
  }

  return (
    <div className='mt-20 flex justify-center items-center p-4'>
      {error && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center min-h-screen w-full z-50">
          <div className="px-20 py-7 bg-white border border-orange-600 flex flex-col gap-y-3">
            <p className='text-orange-500 text-lg w-48 text-center'>
              {error}
            </p>
            <button onClick={() => setError(null)} className='px-4 py-1 border border-orange-600 text-orange-500 w-[max-content] mx-auto'>OK</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-orange-600 p-8 w-full max-w-md">
        <form onSubmit={handleResetSubmit} className='w-full flex flex-col space-y-6'>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-zinc-800">Password Recovery</h1>
            <p className="text-zinc-500 mt-2">Enter your email to reset your password</p>
          </div>

          <label htmlFor="forgotPass" className='block'>
            <span className="text-sm font-medium text-zinc-700">Email Address</span>
            <input 
              type="email"  
              id='forgotPass' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className='mt-1 block w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm shadow-sm placeholder-zinc-400
              focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
              placeholder="Enter your email"
            />
          </label>

          <button 
            type='submit' 
            className='w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Reset Password'}
          </button>

          <a 
            href="/" 
            className='text-sm text-orange-600 hover:text-orange-800 transition-colors duration-200 text-center'
          >
            Back to Login
          </a>
        </form>
      </div>
    </div>
  )
}

export default ForgotPass

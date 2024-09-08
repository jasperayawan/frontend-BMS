import React from 'react'

const ForgotPass = () => {
  return (
    <div className='lg:min-h-screen flex justify-center items-center'>
      <div className="mx-auto max-w-md w-full">
      <form className='w-full flex flex-col justify-center items-center space-y-5'>
        <h1 className='text-xl'>Password Recovery</h1>
      <label htmlFor="forgotPass" className='flex flex-col w-full'>
            Please enter your email *
            <input type="text" id='forgotPass' className='border-[1.5px] border-zinc-400 rounded-md px-3 py-2'/>
        </label>
        <button className='mx-auto w-[max-content] px-6 py-2 rounded-md bg-zinc-600 text-zinc-300'>Submit</button>
      </form>
      </div>
    </div>
  )
}

export default ForgotPass

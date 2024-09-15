import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNewPass } from '../hooks/useNewPass';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading, newPass } = useNewPass();
    const query = useQuery();
    const token = query.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await newPass(token, newPassword)
    }

  return (
    <div className='min-h-screen flex justify-center items-center flex-col space-y-4 px-4 lg:px-0'>
            <h2 className='text-white text-2xl'>Reset Password</h2>
            <div className="mx-auto max-w-md w-full">
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='px-4 py-2 rounded-md border-[1px] border-zinc-300'
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='px-4 py-2 rounded-md border-[1px] border-zinc-300'
                        required
                    />
                    <button type="submit" className='bg-yellow-600 px-5 py-2 rounded-md'>
                        {loading ? 'loading...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
  )
}

export default ResetPassword

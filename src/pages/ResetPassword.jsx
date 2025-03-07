import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNewPass } from '../hooks/useNewPass';
import { set } from 'date-fns';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading, newPass } = useNewPass();
    const [err, setErr] = useState(null);
    const query = useQuery();
    const token = query.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newPassword !== confirmPassword) {
            setErr('Password does not match');
            return;
        }

        await newPass(token, newPassword)
    }

  return (
    <div className='flex justify-center items-center flex-col space-y-4 px-4 lg:px-0 mt-20'>
        {err && (
            <div className="fixed inset-0 bg-black/20 flex justify-center items-center min-h-screen w-full z-50">
                <div className="px-20 py-7 w-[430px] bg-white border border-orange-600 flex justify-center items-center flex-col gap-y-3">
                    <h2 className='text-orange-500 text-lg font-semibold text-center'>
                    {err}
                    </h2>
                    <button onClick={() => {
                    setErr(null);
                    setNewPassword('');
                    setConfirmPassword('');
                    }} className='px-4 py-1 border border-orange-600 text-orange-500 w-[max-content] mx-auto'>OK</button>
                </div>
            </div>
        )}

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
                    <button type="submit" className='w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'>
                        {loading ? 'loading...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
  )
}

export default ResetPassword

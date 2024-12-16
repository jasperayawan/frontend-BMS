import React, { useEffect, useState } from 'react'
import Parse from 'parse/dist/parse.min.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { UserIcon } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null);
  const [seePass, setSeePass] = useState("password")
  const navigate = useNavigate()

  const validateInputs = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try{
      const emailExists = new Parse.Cloud.run("checkEmailExists", { email })
      const checkEmailIfExist = await emailExists;

      if (!checkEmailIfExist) {
        const errorHtml = `
          <h3 class="text-orange-500 text-lg font-semibold text-center">
            Your email address is not registered and you are unable to log in at this time.
          </h3>
          <p class="text-gray-700 text-sm text-center">
            To access our services, please visit your local Barangay office to create an account.
          </p>
        `;

        
        
        setError(errorHtml);
        setLoading(false);
        return;
      }
      
      const loggedInUser = await Parse.User.logIn(email, password);

      setSuccess("YOU HAVE LOGGED IN SUCCESSFULLY!")
      localStorage.setItem('sessionToken', loggedInUser.getSessionToken());

      
    } catch (error) {
      setError("Incorrect Username or Password");
    } finally {
      setLoading(false);
    }
  }


  const handleSeepassword = (e, data) => {
    e.preventDefault();

    setSeePass(data)
  }


  useEffect(() => {
    const checkUser = async () => {
      const isAuthenticated = await Parse.User.current();
      const unregisteredUser = localStorage.getItem("unregisteredUser")

      if(isAuthenticated){
        navigate('/')
      } else {
        if(unregisteredUser){
          navigate('/home')
        } 
    }
    }
    checkUser()
  },[])

  const handleUnregisteredUser = () => {
    localStorage.setItem('unregisteredUser', "unregistered")
    navigate('/home')
  }


  return (
    <div className='flex justify-center items-center p-4 pt-10'>
      {error && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center min-h-screen w-full z-50">
          <div className="px-20 py-7 w-[430px] bg-white border border-orange-600 flex justify-center items-center flex-col gap-y-3">
            <div dangerouslySetInnerHTML={{ __html: error }} />
            <button onClick={() => setError(null)} className='px-4 py-1 border border-orange-600 text-orange-500 w-[max-content] mx-auto'>OK</button>
          </div>
        </div>
      )}

    {success && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center min-h-screen w-full z-50">
          <div className="px-20 py-7 w-[430px] bg-white border border-orange-600 flex justify-center items-center flex-col gap-y-3">
            <h2 className='text-orange-500 text-lg font-semibold text-center'>
            {success}
            </h2>
            <button onClick={() => {
              setSuccess(null);
              navigate('/')
              window.location.reload()
            }} className='px-4 py-1 border border-orange-600 text-orange-500 w-[max-content] mx-auto'>OK</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleLogin} className='w-full flex flex-col space-y-6 border border-orange-600 p-6 rounded-3xl'>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-orange-500">USER LOG IN</h1>
          </div>

          <div className="space-y-4">
            <label htmlFor="email" className='block relative'>
              <span className="text-sm font-medium text-zinc-700">Email:</span>
              <div className="mt-1 flex items-center">
                <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  id='email' 
                  className='block w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm shadow-sm placeholder-zinc-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10'
                  placeholder="email"
                />
                <UserIcon className="h-5 w-5 text-zinc-400 absolute right-3" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </label>

            <label htmlFor="password" className='block relative'>
              <span className="text-sm font-medium text-zinc-700">Password</span>
              <input 
                type={seePass} 
                onChange={(e) => setPassword(e.target.value)} 
                id='password' 
                className='mt-1 block w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm shadow-sm placeholder-zinc-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                placeholder="password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              {seePass === 'password' ? (
                <FaRegEyeSlash 
                  onClick={(e) => handleSeepassword(e, "text")} 
                  className='absolute right-3 top-[35px] text-zinc-400 cursor-pointer hover:text-zinc-600'
                />
              ) : (
                <FaEye 
                  onClick={(e) => handleSeepassword(e, "password")} 
                  className='absolute right-3 top-[35px] text-zinc-400 cursor-pointer hover:text-zinc-600'
                />
              )}
            </label>
          </div>

          <a 
            href="/forgot" 
            className='text-sm text-orange-600 hover:text-orange-800 transition-colors duration-200 self-end'
          >
            Forgot Password?
          </a>

          <button 
            type='submit' 
            disabled={loading} 
            className='w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : 'Login'}
          </button>
          <button onClick={handleUnregisteredUser} className='underline'>VIEW AS UNREGISTED USER</button>
        </form>
      </div>
    </div>
  )
}

export default Login

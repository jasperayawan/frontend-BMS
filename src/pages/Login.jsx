import React, { useEffect, useState } from 'react'
import Parse from 'parse/dist/parse.min.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
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
      const loggedInUser = await Parse.User.logIn(email, password);

      const query = new Parse.Query(Parse.Role);
      query.equalTo('users', loggedInUser);
      const roles = await query.find();
  
      // const userRoles = roles.map(role => role.get('name')); 
      toast.success('login successfully!');
      localStorage.setItem('sessionToken', loggedInUser.getSessionToken());
      window.location.reload();
      navigate('/')
      
      // console.log({
      //   message: 'Login successful',
      //   username: loggedInUser.get('username'),
      //   sessionToken: loggedInUser.getSessionToken(),
      //   roles: userRoles 
      // });
      
    } catch (error){
      toast.error("error", error);
      setErrors(prevErrors => ({
        ...prevErrors,
        form: 'Login failed. Please check your credentials.'
      }));
    } finally {
      setLoading(false)
    }
  }


  const handleSeepassword = (e, data) => {
    e.preventDefault();

    setSeePass(data)
  }


  useEffect(() => {
    const checkUser = async () => {
      const isAuthenticated = await Parse.User.current();

      if(isAuthenticated){
        navigate('/home')
      } else {
        navigate('/')
      }
    }
    checkUser()
  },[])


  return (
    <div className='lg:min-h-screen flex justify-center items-center'>
      <div className="mx-auto max-w-md w-full">
        <form onSubmit={handleLogin} className='w-full flex flex-col justify-center items-center space-y-5'>
            <h1>USER LOG IN</h1>
            <label htmlFor="email" className='flex flex-col w-full'>
                Email *
                <input type="email" onChange={(e) => setEmail(e.target.value)} id='email' className='border-[1.5px] border-zinc-400 rounded-md px-3 py-2'/>
                {errors.email && <p className="text-red-500 text-sm text-start w-full mt-1">{errors.email}</p>}
            </label>
            <label htmlFor="password" className='flex flex-col w-full relative'>
                Password *
                <input type={seePass} onChange={(e) => setPassword(e.target.value)} id='password' className='border-[1.5px] border-zinc-400 rounded-md px-3 py-2'/>
                {errors.password && <p className="text-red-500 text-sm text-start w-full mt-1">{errors.password}</p>}
                {seePass === 'password' ? (
                  <FaRegEyeSlash onClick={(e) => handleSeepassword(e, "text")} className='absolute top-9 right-2 cursor-pointer'/>
                ) : (
                  <FaEye onClick={(e) => handleSeepassword(e, "password")} className='absolute top-9 right-2 cursor-pointer'/>
                )}
            </label>
            <a href="/forgot" className='underline ms-auto'>Forgot Password?</a>
            <button type='submit' disabled={loading} className='mx-auto w-[max-content] px-6 py-2 rounded-md bg-zinc-600 text-zinc-300'>
              {loading ? 'loading...' : 'LOGIN'}
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login

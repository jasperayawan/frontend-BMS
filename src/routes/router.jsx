import { Routes, Route } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ForgotPass from "../pages/ForgotPass"
import ResetPassword from "../pages/ResetPassword"
import ProtectedRoute from "../middleware/ProtectedRoute"
import Parse from 'parse/dist/parse.min.js';
import Patient from "../pages/Patient"
import Employee from "../pages/Employee"
import Services from "../pages/Services"
import Gallery from "../pages/Gallery"
import ContactUs from "../pages/ContactUs"
import AboutUs from "../pages/AboutUs"
import Users from "../pages/Users"
import MyAccount from "../pages/MyAccount"

const router = () => {
  const user = Parse.User.current();

  return (
    <Routes>
        <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route path="/" element={<ProtectedRoute element={user ? <Home /> : <Login />}/>}/>
            <Route path="/signup" element={<ProtectedRoute element={<Signup />}/>}/>
            <Route path="/forgot" element={<ProtectedRoute element={<ForgotPass />}/>}/>
            <Route path="/reset-password" element={<ResetPassword />}/>

            <Route path="/patient" element={<Patient />}/>
            <Route path="/employee" element={<Employee />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/gallery" element={<Gallery />}/>
            <Route path="/contact-us" element={<ContactUs />}/>
            <Route path="/about-us" element={<AboutUs />}/>
            <Route path="/users" element={<Users />}/>
            <Route path="/myaccount" element={<MyAccount />}/>
        </Route>
    </Routes>
  )
}

export default router

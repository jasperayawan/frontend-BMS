import { Routes, Route } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ForgotPass from "../pages/ForgotPass"
import ResetPassword from "../pages/ResetPassword"
import ProtectedRoute from "../middleware/ProtectedRoute"

const router = () => {
  return (
    <Routes>
        <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route path="/" element={<ProtectedRoute element={<Login />}/>}/>
            <Route path="/signup" element={<ProtectedRoute element={<Signup />}/>}/>
            <Route path="/forgot" element={<ProtectedRoute element={<ForgotPass />}/>}/>
            <Route path="/reset-password" element={<ResetPassword />}/>

            {/* Protected Route */}
            <Route path="/home" element={<ProtectedRoute element={<Home />}/>}/>
        </Route>
    </Routes>
  )
}

export default router

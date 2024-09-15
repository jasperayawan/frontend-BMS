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
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<ProtectedRoute element={<Home />}/>}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/forgot" element={<ForgotPass />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
        </Route>
    </Routes>
  )
}

export default router

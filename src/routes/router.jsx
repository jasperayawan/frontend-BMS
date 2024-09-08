import { Routes, Route } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ForgotPass from "../pages/ForgotPass"

const router = () => {
  return (
    <Routes>
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/forgot" element={<ForgotPass />}/>
        </Route>
    </Routes>
  )
}

export default router

import { Routes, Route } from "react-router-dom"
import Home from "./Home"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
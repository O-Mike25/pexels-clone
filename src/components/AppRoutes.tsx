import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import SearchResults from "./SearchResults"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<SearchResults/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
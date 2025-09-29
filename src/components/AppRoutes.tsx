import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import SearchResults from "./SearchResults"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="search">
        <Route index element={<SearchResults />} />
        <Route path="videos" element={<SearchResults />} />
        <Route path="users" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

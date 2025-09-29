import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import SearchResults from "./SearchResults"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="videos" element={<Home />} />
      </Route>
      <Route path="search">
        <Route index element={<SearchResults />} />
        <Route path="videos" element={<SearchResults />} />
        <Route path="users" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

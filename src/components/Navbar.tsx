import { useLocation } from "react-router-dom";
import chevron from "../assets/images/chevron.png";
import Search from "./Search";
import menu from "../assets/images/menu.png"

const Navbar = () => {
  const location = useLocation();
  const onHomePage = location.pathname === "/"; 
  return (
    <nav className={`mt-2 w-full text-sm flex items-center justify-between`}>
      <span className="text-2xl font-[SuperJoyful]">pexels</span>
      {!onHomePage && <Search className="mx-10 hidden md:flex flex-row flex-1"/>}
      <div className="flex flex-row gap-5  items-center justify-center">
        <div className="hidden md:flex gap-5 flex-row items-center justify-center">
          <button className="group flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-2xl p-2">
            <span className="font-medium">Explore</span>
            <img className="group-hover:rotate-180" width={8} src={chevron} alt="" />
          </button>
          <a className="font-medium cursor-pointer hover:bg-gray-100 rounded-2xl p-2">Licence</a>
          <span className="font-medium flex items-center cursor-pointer hover:bg-gray-100 rounded-2xl p-2">...</span>
        </div>
        <div className="flex flex-row gap-3">
          <button className="cursor-pointer px-4 py-2 bg-black rounded-lg text-white font-medium p">Join</button>
          <button className="cursor-pointer hover:bg-gray-100 p-3 rounded-full md:hidden inline">
            <img width={18} src={menu} alt="" />
          </button>
        </div>
      </div>
    </nav>
  )
}
//0000003B
export default Navbar
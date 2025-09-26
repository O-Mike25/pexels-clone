import { Link, useLocation } from "react-router-dom";
import chevron from "../assets/images/chevron.png";
import Search from "./Search";
import menu from "../assets/images/menu.png"
import glass from "../assets/images/magnifying-glass.png"
import close from "../assets/images/close.png";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const onHomePage = location.pathname === "/"; 
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return (
    <nav className={`mt-2 w-full text-md flex items-center justify-between`}>
      <Link to="/"><span className={`${showMobileSearch ? "hidden" : "inline"} mdz:inline text-3xl font-[SuperJoyful]`}>pexels</span></Link>
      
      {!onHomePage && <div className={`min-w-0 relative  ${showMobileSearch ? "flex" : "hidden"} md:hidden flex-1`}>
        <Search/>
        {
          <div 
            className="top-1/2 -translate-y-1/2 right-10 absolute p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={()=>{
              setShowMobileSearch(false);
            }}
          >
            <img width={13} src={close} alt="" />
          </div>
        }
      </div>}
      {!onHomePage && <div className="min-w-0 mx-10 hidden md:flex flex-1">
        <Search/>
      </div>}
      <div className={`${showMobileSearch ? "hidden" : "flex"} md:flex flex-row gap-5  items-center justify-center`}>
        <div className="hidden md:flex gap-5 flex-row items-center justify-center">
          <button className="group flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-2xl p-2">
            <span className="font-medium">Explore</span>
            <img className="group-hover:rotate-180" width={8} src={chevron} alt="" />
          </button>
          <a className="font-medium cursor-pointer hover:bg-gray-100 rounded-2xl p-2">Licence</a>
          <span className="font-medium flex items-center cursor-pointer hover:bg-gray-100 rounded-2xl p-2">...</span>
        </div>
        <div className="flex flex-row gap-2">
          <div 
            className="p-3 hover:bg-gray-200 rounded-full cursor-pointer md:hidden inline" 
            onClick={()=>{
              setShowMobileSearch(true);
            }}
          >
            <img  width={15} src={glass} alt="" />
          </div>
          <button className="cursor-pointer px-4 py-2 bg-black rounded-lg text-white font-medium">Join</button>
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
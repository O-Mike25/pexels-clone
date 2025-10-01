import instagram from "../assets/images/instagram.png";
import threads from "../assets/images/threads.png";
import youtube from "../assets/images/youtube.png";
import tiktok from "../assets/images/tik-tok.png";
import linkedin from "../assets/images/linkedin.png";
import twitter from "../assets/images/twitter.png";
import copyright from "../assets/images/copyright.png";
import globe from "../assets/images/globe.png";

const Footer = () => {
  return (
    <div className="mt-auto w-full flex flex-col gap-10 container-custom md:container-custom-md">
      <div className="w-full flex flex-row flex-wrap justify-between gap-10 ">
        <div className="flex flex-col gap-8">
          <span className="font-medium text-3xl">Where stories come together.</span>
          <div className="flex flex-row flex-wrap gap-2">
            <a
              href="https://apps.apple.com/app/pexels/id1434330413" 
              className="mr-3 rounded-lg px-6 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download on IOS
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.pexels.app" 
              className="mr-3 rounded-lg px-6 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download on Android
            </a>
          </div>
          <div className="flex flex-row gap-4 mt-5">
            <a
              href="https://www.instagram.com/pexels/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Instagram" className="w-8 h-8" />
            </a>

            <a
              href="https://www.threads.net/@pexels"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={threads} alt="Threads" className="w-8 h-8" />
            </a>

            <a
              href="https://www.youtube.com/c/pexels"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtube} alt="YouTube" className="w-8 h-8" />
            </a>

            <a
              href="https://www.tiktok.com/@pexels"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktok} alt="TikTok" className="w-8 h-8" />
            </a>

            <a
              href="https://www.linkedin.com/company/pexels"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>

            <a
              href="https://twitter.com/pexels"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" className="w-8 h-8" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="mb-1 font-extralight">PEXELS</span>
          <a className="text-medium" href="">Free Stock Photos</a>
          <a className="text-medium" href="">Free videos</a>
          <a className="text-medium" href="">Popular searches</a>
          <a className="text-medium" href="">Collections</a>
          <a className="text-medium" href="">Challenges</a>
          <a className="text-medium" href="">Leaderboard</a>
          <a className="text-medium" href="">ther plugins & apps</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="mb-1 font-extralight">Company</span>
          <a className="text-medium" href="">About</a>
          <a className="text-medium" href="">Blog</a>
          <a className="text-medium" href="">Help Center</a>
          <a className="text-medium" href="">Report content</a>
          <a className="text-medium" href="">Become a Hero</a>
          <a className="text-medium" href="">Partner with Pexels</a>
          <a className="text-medium" href="">Image & Video API</a>
        </div>
        <div className="xl:w-96 w-fit">
          <span className="font-extralight">FREE STOCK PHOTOS</span>
          <div className="mt-3 flex flex-row flex-wrap gap-2">
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Black and white photography</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Happy birthday images</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Free business videos</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Happy new year images</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Cool wallpapers</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Best HD wallpapers</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Galaxy wallpaper</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Lock screen wallpaper</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">iPhone wallpaper</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">4K wallpaper</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Samsung wallpaper</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Love wallpaper</a>
            <a className="text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 " href="">Mobile wallpaper</a>
          </div>
        </div>
      </div>
      <div 
        className="pt-5 relative w-full flex flex-row flex-wrap gap-4 justify-between items-center" 
        style={{borderTop: "1px solid #f9fafb"}}
      >
        <span className="font-medium">
          <img className="inline w-4 mr-2" src={copyright} alt="" />
          2025 Pexels
        </span>
        <div className="flex flex-row justify-center flex-1 gap-4">
          <span className="font-medium">Terms of Use</span>
          <span className="font-medium">Privacy Policy</span>
          <span className="font-medium">Licence</span>
          <span className="font-medium">Imprint</span>
          <span className="font-medium">Cookies Policy</span>
        </div>
        <span className="cursor-pointer text-medium rounded-lg px-4 py-2 border border-gray-50 hover:bg-gray-50 font-medium ">
          <img className="inline w-4 mr-2" src={globe} alt="" />
          English
        </span>
      </div>
    </div>
  )
}

export default Footer
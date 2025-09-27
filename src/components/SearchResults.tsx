import { useEffect, useState } from "react";

const SearchResults = () => {
  const [open, setOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // const images = Array.from({ length: 60 }, (_, i) => ({
  //   id: i,
  //   src: `https://picsum.photos/seed/${i}/400/300`,
  //   alt: `Random ${i}`,
  // })); 

  const getWindowSize = () => {
    setWindowSize(window.innerWidth);
  }

  useEffect(()=>{
    window.addEventListener("resize", getWindowSize);
    return (()=>{
      window.removeEventListener("resize", getWindowSize);
    })
  },[]);

  useEffect(()=>{
    if(open && windowSize<=768) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [open])

  return (
    <div className="relative container-custom md:container-custom-md w-full flex flex-row">
      <div className={`absolute left-0 top-0 z-20 overflow-y-auto pt-8 md:sticky md:top-16 md:h-[calc(100vh-60px)] h-[calc(100vh-50px)] ${open ? "mr-4 w-2/5" : "w-0"} transition-all duration-300 bg-gray-500` } >
        Orientation
      </div>
      {open && windowSize<=768 && <div onClick={() => setOpen(!open)} className="z-10 absolute left-0 top-0 bg-black opacity-50 w-full h-[calc(100vh-50px)]"></div>}
      <div className="font-medium w-full flex flex-col items-start">
        <div className={`${windowSize<=768 ? "fixed p-0 w-fit top-[calc(100vh-100px)] right-[30px]" : "pt-8 pb-4 sticky top-12.5 w-full bg-white"}   `}>
          <button 
            className={`bg-white cursor-pointer px-4 py-2 rounded-lg border  flex flex-row items-center gap-1 hover:bg-gray-50 ${open ? "border-black" : "border-gray-100"}`}
            onClick={() => setOpen(!open)}  
          >
            <div className="flex flex-col items-center gap-0.5 w-4">
              <span
                className={`block h-[2px] bg-black rounded transition-all duration-300
                  ${open ? "rotate-[-45deg] -translate-x-[5px] translate-y-[2px] w-2" : "w-4"}`}
              ></span>
              <span
                className={`block h-[2px] bg-black rounded transition-all duration-300
                  ${open ? " -translate-x-[2px] w-2" : "w-3"}`}
              ></span>
              <span
                className={`block h-[2px] bg-black rounded transition-all duration-300
                  ${open ? "rotate-[45deg] -translate-x-[5px] -translate-y-[1.5px] w-2" : "w-1"}`}
              ></span>
            </div>
            <span> Filters </span>
          </button>
        </div>
        {/* <div className="flex flex-wrap gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5rem)] lg:w-[calc(20%-0.5rem)] overflow-hidden rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div> */}
        <div></div>
      </div>
    </div>
  );
};
export default SearchResults;
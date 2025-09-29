import chevron from "../assets/images/chevron.png";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { type GetMediasParams, type Photo, type Video } from "../Controller/PexelTypes";
import PexelController from "../Controller/PexelController";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium">{title}</span>
        <img
          width={10}
          className={`opacity-50 hover:opacity-100 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          src={chevron}
          alt="Toggle accordion"
        />
      </div>
      <div className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? "" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
};

const SearchResults = () => {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState<[Photo[], number]>([[], 0]);
  const [videos, setVideos] = useState<[Video[], number]>([[], 0]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [mediasFilters, setMediasFilters] = useState<GetMediasParams>({
    query:query!,
    page:1
  })
  const loader = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const pexelCtrl = new PexelController(import.meta.env.VITE_PEXEL_API_KEY); 

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

  useEffect(() => {
    if(query && query !== mediasFilters.query) setMediasFilters(prev => ({...prev, query, page:1}))
  }, [query]);

  useEffect(() => {
    const fetchMedias = async () => {
      setIsLoading(true);
      const [pictures, vids] = await Promise.all([
        pexelCtrl.getPhotos(mediasFilters),
        pexelCtrl.getVideos(mediasFilters)
      ]);
      setPhotos(prev => [[...prev[0], ...pictures.photos], pictures.total_results]);
      setVideos(prev => [[...prev[0], ...vids.videos], vids.total_results]);
      setIsLoading(false);
    };

    fetchMedias();
  }, [mediasFilters]);

  useEffect(() => {
    if(!loader.current) return;
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if(target.isIntersecting && !isLoading) setMediasFilters(prev => ({...prev, page: prev.page! + 1}));
    })
    observer.observe(loader.current);
    return () => {
      if(loader.current) observer.unobserve(loader.current);
    };
  },[isLoading])

  useEffect(() => {
    console.log("PHOTOS updated", photos);
  }, [photos]);

  const renderContent = () => {
    switch (true) {
      case location.pathname.includes("/videos"):
        return (
          <div className="w-full flex flex-col gap-4 items-start">
            <span className="text-3xl font-bold">Free {query} Videos</span>
            <div>
              <Link to={`/search?query=${query}`}>
                <button className="mr-2 bg-white px-4 py-3 rounded-full cursor-pointer">Photos {photos[1]}</button>
              </Link>
              <Link to={`/search/videos?query=${query}`}>
                <button className="hover:bg-gray-100 bg-black text-white px-4 py-3 rounded-full cursor-pointer">Videos {videos[1]}</button>
              </Link>
            </div>
            <div className="w-full py-8">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {videos[0].map((video) => {
                  const sdFile = video.video_files.find(
                    (file) => file.quality === "sd" && file.file_type === "video/mp4"
                  );
                  if (!sdFile) return null;
                  return (
                    <div key={video.id} className="break-inside-avoid mb-4">
                      <video
                        src={sdFile.link}
                        controls
                        preload="metadata"       
                        className="w-full rounded-lg shadow-md hover:opacity-90 transition"
                      >
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </div>
                  );
                })}
              </div>
            </div> 
          </div>
        );

      default:
        return (
          <div className="w-full flex flex-col gap-4 items-start">
            <span className="text-3xl font-bold">Free {query} Photos</span>
            <div>
              <Link to={`/search?query=${query}`}>
                <button className="mr-2 bg-black text-white px-4 py-3 rounded-full cursor-pointer">Photos {photos[1]}</button>
              </Link>
              <Link to={`/search/videos?query=${query}`}>
                <button className="hover:bg-gray-100 bg-white px-4 py-3 rounded-full cursor-pointer">Videos {videos[1]}</button>
              </Link>
            </div>
            <div className="w-full py-8">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {photos[0].map((photo)=>{
                  return (
                    <div key={photo.id} className="break-inside-avoid mb-4">
                      <img 
                        src={photo.src.medium} 
                        alt={"photos"}
                        className="w-full rounded-lg shadow-md hover:opacity-90 transition" 
                      />  
                    </div>
                  )
                })}      
              </div>
            </div>              
          </div>
        );
    }
  };

  return (
    <div className="relative container-custom md:container-custom-md w-full flex flex-row">
      <div className={`pr-2 absolute left-0 top-0 z-20 overflow-y-auto pt-8 md:sticky md:top-16 md:h-[calc(100vh-60px)] h-[calc(100vh-50px)] ${open ? "mr-4 w-2/6" : "w-0 overflow-hidden"} transition-all duration-300 bg-white` } >
        {open && 
          <Accordion title="Orientation">
            <div className="flex flex-row gap-2 flex-wrap">
              <button className="rounded-full bg-white hover:bg-gray-50 border border-gray-50 px-3 py-2">Any</button>
            </div>
          </Accordion>
        } 
      </div>
      {open && windowSize<=768 && <div onClick={() => setOpen(!open)} className="z-10 absolute left-0 top-0 bg-black opacity-50 w-full h-[calc(100vh-50px)]"></div>}
      <div className="font-medium w-full flex flex-col items-start">
        {!location.pathname.includes("users") && <div className={`${windowSize<=768 ? "fixed p-0 w-fit top-[calc(100vh-100px)] right-[30px]" : "pt-8 pb-4 sticky top-12.5 w-full bg-white"}   `}>
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
        </div>}
        {photos?.length>0 && videos?.length>0 ? renderContent() : ""}
        {isLoading && <p>Loading ...</p>}     
        <div ref={loader} className="h-10"></div>
      </div>
    </div>
  );
};
export default SearchResults;
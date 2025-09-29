import { useEffect, useRef, useState } from "react";
import PexelController from "../Controller/PexelController"
import Search from "./Search"
import type { Photo, Video } from "../Controller/PexelTypes";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const loader = useRef<HTMLDivElement | null>(null);

  const pexelCtrl = new PexelController(import.meta.env.VITE_PEXEL_API_KEY); 
  useEffect(() => {
    const fetchMedias = async () => {
      setIsLoading(true);
      const [pictures, vids] = await Promise.all([
        pexelCtrl.getCuratedPhotos(page),
        pexelCtrl.getPopularVideos({page})
      ]);
      setPhotos(prev => [...prev, ...pictures.photos]);
      setVideos(prev => [...prev, ...vids.videos]);
      setIsLoading(false);
    };
    fetchMedias();
  }, [page]);

  useEffect(() => {
    if(!loader.current) return;
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if(target.isIntersecting && !isLoading) setPage(page + 1);
    })
    observer.observe(loader.current);
    return () => {
      if(loader.current) observer.unobserve(loader.current);
    };
  },[isLoading])

  const renderContent = () => {
    switch (true) {
      case location.pathname.includes("/videos"):
        return (
          <div className="w-full flex flex-col gap-4 items-start">
            <div className="w-full flex flex-row justify-center gap-2">
              <Link to={`/`}>
                <button className="mr-2 bg-white px-4 py-3 rounded-full cursor-pointer">Photos</button>
              </Link>
              <Link to={`/videos`}>
                <button className="hover:bg-gray-100 bg-black text-white px-4 py-3 rounded-full cursor-pointer">Videos</button>
              </Link>
            </div>
            <div className="w-full py-8">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {videos.map((video) => {
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
            <div className="w-full flex flex-row justify-center gap-2">
              <Link to={`/`}>
                <button className=" bg-black text-white px-4 py-3 rounded-full cursor-pointer">Photos</button>
              </Link>
              <Link to={`/videos`}>
                <button className="hover:bg-gray-100 bg-white px-4 py-3 rounded-full cursor-pointer">Videos</button>
              </Link>
            </div>
            <div className="w-full py-8">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {photos.map((photo)=>{
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
    <div className="container-custom md:container-custom-md w-full mt-10 flex flex-col gap-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="min-w-0 flex-1">
            <p className="mb-3 font-bold text-3xl">The best free stock photos, royalty free images & videos shared by creators.</p>
            <Search/>
          </div>
          {photos?.length >0 && <div className="flex flex-row gap-3 w-full max-w-2xl h-72">
            <div
              className="flex-1 bg-center bg-cover rounded-lg"
              style={{ backgroundImage: `url(${photos[0].src.medium})` }}
            />
            <div
              className="flex-1 bg-center bg-cover rounded-lg"
              style={{ backgroundImage: `url(${photos[1].src.medium})` }}
            />
          </div>}
      </div>
      <div className="font-medium w-full flex flex-col items-start">
        {photos?.length>0 && videos?.length>0 ? renderContent() : ""}
        {isLoading && <p>Loading ...</p>}     
        <div ref={loader} className="h-10"></div>
      </div>
    </div>
  )
}

export default Home
import image from "../assets/images/image.png";
import glass from "../assets/images/magnifying-glass.png";
import chevron from "../assets/images/chevron.png";
import play from "../assets/images/play.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuerySuggestionsController from "../Controller/QuerySuggestionsController";
import PexelController from "../Controller/PexelController";
import type { Collection, Photo } from "../Controller/PexelTypes";

const Search = () => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("Photos")
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();
  
  const queryCtrl = new QuerySuggestionsController(import.meta.env.VITE_SEARCH_SUGGESTIONS_API_KEY);
  const pexelCtrl = new PexelController(import.meta.env.VITE_PEXEL_API_KEY);

  const updateRecentSearches = (searchTerm: string) => {
    if(searchTerm.length == 0)
        return;
    let updated = [searchTerm, ...recentSearches.filter((term)=>(term!=searchTerm))];
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
  },[searchTerm])

  useEffect(() => {
    const fetchCollections = async () => {
      const randomCollections = await pexelCtrl.getRandomCollectionsWithMedias({collectionsCount:4, mediaCount:3, mediaType:"photos"});
      setCollections(randomCollections.filter((collection)=>{
        return collection.photos_count>=3;
      }));
    }
    fetchCollections();
  }, [searchTerm])

  return (
    <div
      className={
        "relative flex flex-row w-full min-w-0 bg-gray-50 border-1 border-gray-50 p-1 rounded-lg"
      }
    >
      <div className="group relative">
        <button className="cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg bg-white flex items-center gap-2">
          <img width={18} src={searchCategory=="Photos" ? image : play} alt="image" />
          <span className="font-medium">{searchCategory}</span>
          <img
            className="group-hover:rotate-180"
            width={8}
            src={chevron}
            alt=""
          />
        </button>
        <div className="absolute -top-100 group-hover:top-10 transition-all duration-100 flex flex-col px-4 py-2 w-full  border border-gray-100 rounded-lg bg-white">
          <div 
            className="flex flex-row gap-2 hover:bg-gray-100 rounded-lg w-full text-center py-1 cursor-pointer"
            onClick={()=>setSearchCategory("Photos")}
          >
            <img width={18} src={image} alt="image" />
            <span>Photos</span>
          </div>
          <div 
            className="flex flex-row gap-2 hover:bg-gray-100 rounded-lg w-full text-center py-1 cursor-pointer"
            onClick={()=>setSearchCategory("Videos")}
          >
            <img width={18} src={play} alt="image" />
            <span>Videos</span>
          </div>
        </div>
      </div>
      <input
        value={searchTerm}
        className="min-w-0 outline-none mx-2 flex-1 p-2"
        type="text"
        placeholder={`Search for free ${searchCategory.toLowerCase()}`}
        onFocus={() => {
          setShowSearchMenu(true);
        }}
        onBlur={() => {
          setShowSearchMenu(false);
        }}
        onChange={async (e) => {
          try {
            setSearchTerm(e.target.value);
            let suggestions = await queryCtrl.getQuerySuggestions(searchTerm);
            setSearchSuggestions(suggestions);
          } catch (error) {
            console.log(error.message);
          }
        }}
      />
      <Link to={searchCategory=="Photos" ? `/search?query=${searchTerm}` : `/search/videos?query=${searchTerm}`}>
        <div 
            className="p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={()=>{
                updateRecentSearches(searchTerm);
            }}
        >
            <img width={15} src={glass} alt="" />
        </div>
      </Link>
      
      {showSearchMenu && searchTerm.length>0 && (
        <div className="absolute top-14 w-full bg-white border border-gray-50 rounded-lg py-2">
          <div className="flex flex-col w-full overflow-y-auto max-h-32">
            {searchSuggestions.map((text, index) => {
              const lowerText = text.toLowerCase();
              const lowerTerm = searchTerm.toLowerCase();

              const isMatch = lowerText.startsWith(lowerTerm);

              return (
                <div
                    key={index}
                    className="hover:bg-gray-100 w-full px-4 py-1 cursor-pointer"
                    onMouseDown={() => {
                        setSearchTerm(text);
                        updateRecentSearches(text);
                        navigate(`/search?query=${text}`);
                    }}
                >
                {isMatch ? (
                    <div className="w-full flex flex-row justify-start">
                      <span className="font-bold">
                          {text.substring(0, searchTerm.length)}
                      </span>
                      <span className="font-light">
                          {text.substring(searchTerm.length)}
                      </span>
                    </div>
                ) : (
                    <p className="w-full text-left">{text}</p>
                )}
                </div>
              );
            })}
          </div>
          {recentSearches.length>0 && <div className="w-full mt-5 px-4">
            <div className="flex flex-row justify-between w-full">
              <span className="text-xl font-bold">Recent searches</span>
              <button 
                className="font-extralight hover:font-medium cursor-pointer"
                onMouseDown={()=>{
                  localStorage.setItem("recentSearches", JSON.stringify([]));
                  setRecentSearches([]);
                  console.log(localStorage.getItem("recentSearches"));
                }}
              >
                clear
              </button>
            </div>
            <div className="w-full flex flex-wrap gap-2 flex-row justify-start mt-2">
              {recentSearches.map((term, index)=>{
                return (
                  <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg hover:border hover:border-black">
                    <span key={index} className="">{term}</span>
                    <img width={15} src={glass} alt="" />
                  </div>
                )
              })}
            </div>
          </div>}

          <div className="px-4 w-full mt-5">
            <p className="w-full text-left font-medium text-xl">Collections</p>
            <div className="flex flex-row flex-wrap gap-6">
              {collections.map((collection, index) => 
                {
                  const photos = collection.medias?.media.filter(
                    (m): m is { type: "Photo" } & Photo => m.type === "Photo"
                  );

                  return (
                    <div 
                      key={index} 
                      className="flex flex-row items-center gap-4 w-56 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
                    >
                      <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-lg overflow-hidden w-20 h-20">
                        <img
                          src={
                            collection.medias?.media[0]?.type === "Photo"
                              ? collection.medias.media[0].src.original
                              : ""
                          }
                          alt=""
                          className="col-span-2 w-full h-full object-cover"
                        />

                        <img
                          src={
                            collection.medias?.media[1]?.type === "Photo"
                              ? collection.medias.media[1].src.original
                              : ""
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />

                        <img
                          src={
                            collection.medias?.media[2]?.type === "Photo"
                              ? collection.medias.media[2].src.original
                              : ""
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Infos de la collection */}
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-gray-900">{collection.title}</span>
                        <span className="text-sm text-gray-500">{collection.photos_count} Photos</span>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Search;

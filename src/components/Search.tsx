import image from "../assets/images/image.png"
import glass from "../assets/images/magnifying-glass.png"
import chevron from "../assets/images/chevron.png"
import play from "../assets/images/play.png";

type SearchProps = {
    className: string
}

const Search:React.FC<SearchProps> = ({className}) => {
  return (
    <div className={className + " min-w-0 bg-gray-50 border-1 border-gray-50 p-1 rounded-lg"}>
        <div className="group relative">
            <button className="cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg bg-white flex items-center gap-2">
                <img width={18} src={image} alt="image"/>
                <span className="font-medium">Photos</span>
                <img className="group-hover:rotate-180" width={8} src={chevron} alt="" />
            </button>
            <div className="absolute -top-100 group-hover:top-10 transition-all duration-100 flex flex-col px-4 py-2 w-full  border border-gray-100 rounded-lg bg-white">
                <div className="flex flex-row gap-2 hover:bg-gray-100 rounded-lg w-full text-center py-1 cursor-pointer">
                    <img width={18} src={image} alt="image"/>
                    <span >Photos</span>
                </div>
                <div className="flex flex-row gap-2 hover:bg-gray-100 rounded-lg w-full text-center py-1 cursor-pointer">
                    <img width={18} src={play} alt="image"/>
                    <span >Videos</span>
                </div>
                
            </div>
        </div>
        <input className="min-w-0 outline-none mx-2 flex-1 p-2" type="text" placeholder="Search for free photos" />
        <div className="p-3 hover:bg-gray-200 rounded-lg cursor-pointer mr-2">
            <img  width={15} src={glass} alt="" />
        </div>
        
    </div>
  );
};

export default Search;

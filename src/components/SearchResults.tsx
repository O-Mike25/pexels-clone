const SearchResults = () => {
  const images = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/${i}/400/300`,
    alt: `Random ${i}`,
  }));

  return (
    
    <div className="mt-10 container-custom container-custom-md w-full flex flex-row gap-4">
      <div className="sticky top-25 h-[calc(100vh-100px)] w-1/4 bg-black">
        sss
      </div>
      <div className="font-medium w-full flex flex-col items-start">
        <div className="sticky top-25 w-full bg-white">
          <button className="cursor-pointer px-4 py-2 rounded-lg border border-gray-100 flex flex-row gap-2 hover:bg-gray-50">
            <img src="" alt="" />
            <span>Filters</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
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
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
import React from "react";

interface SearchHistoryProps {
  searchHistory: { 
    postcode: string; 
    address: string; 
    distanceKm: number; 
    distanceMiles: number; 
  }[];
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchHistory }) => {
  return (
    <div className='mt-2 h-80'>
      <h2 className="text-2xl font-semibold">Your recent searches:</h2>
      <div className="flex flex-col md:flex-row justify-around mt-12">

        {searchHistory.map((entry, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-4 mb-4 md:mb-0">
            <p>Postcode: {entry.postcode}</p>
            <p>Address: {entry.address}</p>
            <p>Distance (km): {entry.distanceKm ? entry.distanceKm.toFixed(2) : ""}</p>
            <p>Distance (miles): {entry.distanceMiles ? entry.distanceMiles.toFixed(2) : ""}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;

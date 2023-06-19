import React from "react";
import { PostcodeData } from "../page";

interface CurrentSearch {
  address: string;
  distanceKm: number;
  distanceMiles: number;
  longitude: number;
  latitude: number;
}

interface ResponseContainerProps {
  data: PostcodeData | null;
  currentSearch: CurrentSearch | null;
}

const ResponseContainer: React.FC<ResponseContainerProps> = ({ data, currentSearch }) => {
  
  if (data?.error) {
    return (
      <div className="w-2/3 p-9 border-4 border-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-xl font-bold">{data.error}</p>
      </div>
    );
  } else if (currentSearch) {
    return (
      <div className="w-2/3 p-9 border-4 border-gray-700 rounded-lg">
        <p className="text-xl font-bold mb-4">
          Distance in a straight line from {currentSearch.address} to Heathrow Airport:
        </p>
        <p className="text-sm text-gray-400 mb-4">
          (Latitude: {currentSearch.latitude.toFixed(4)}, Longitude: {currentSearch.longitude.toFixed(4)})
        </p>
        <p className="text-4xl text-gray-400">
          {`${currentSearch.distanceKm.toFixed(2)} kilometers`}
        </p>
        <p className="text-4xl text-gray-400">
          {`${currentSearch.distanceMiles.toFixed(2)} miles`}
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-2/3 p-9 border-4 border-gray-700 rounded-lg">
        <p className="text-xl font-bold text-center">
        Distance in a straight line from _____ to Heathrow Airport:
        </p>
      </div>
    );
  }
};

export default ResponseContainer;

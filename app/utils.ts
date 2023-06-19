import { Dispatch, SetStateAction } from 'react';
import { SearchEntry } from './page';

export const getDistanceToAirport = (lat: number, lon: number) => {
  
  // Results of calling this function were compared to Google's map data.
  // Check "DATA COMPARISON" image file in the root of the project

    const R = 6371; //Earth's radius
    const latHeathrow = 51.4700223; 
    const lonHeathrow = -0.4542955;
  
    const dLat = deg2rad(latHeathrow-lat);  
    const dLon = deg2rad(lonHeathrow-lon); 
  
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat)) * Math.cos(deg2rad(latHeathrow)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  
    const distanceKm = R * c; 
    const distanceMiles = distanceKm * 0.621371;
  
    return { distanceKm, distanceMiles };
  }
  
  function deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }

export const addToSearchHistory = (
  prevState: SearchEntry[], 
  newSearch: SearchEntry, 
  setSearchHistory: Dispatch<SetStateAction<SearchEntry[]>>
) => {
  setSearchHistory(prevState => [newSearch, ...prevState.slice(0, 2)]);
}

export const saveToLocalStorage = ( key: string, data: any ) => {
  localStorage.setItem(key, JSON.stringify(data));
}

  
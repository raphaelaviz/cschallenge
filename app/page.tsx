'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import SearchForm from './components/SearchForm';
import ResponseContainer from './components/ResponseContainer';
import SearchHistory from './components/SearchHistory';
import { addToSearchHistory, saveToLocalStorage, getDistanceToAirport } from './utils';


export interface PostcodeData {
  error?: string,  
  result?: {
    longitude: number;
    latitude: number;
    admin_district: string;
    postcode: string;
    country: string;
  }
}

export interface SearchEntry {
  postcode: string;
  address: string;
  distanceKm: number;
  distanceMiles: number;
  longitude: number;
  latitude: number;
}


const Home = () => {

  const [postcodeData, setPostcodeData] = useState<PostcodeData | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchEntry[]>([]);
  const [currentSearch, setCurrentSearch] = useState<SearchEntry | null>(null);

  const getPostcodeData = async (postcode: string) => {
    try {
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      setPostcodeData(response.data);

      if (response.data.result) {
        const { longitude, latitude, admin_district, postcode, country } = response.data.result;
        const { distanceKm, distanceMiles } = getDistanceToAirport(Number(latitude), Number(longitude));
        
        // Formats the relevant data before passing it to other components

        const address = `${admin_district}, ${postcode}, ${country}`;
        const newSearch = {
          postcode, 
          address, 
          distanceKm, 
          distanceMiles, 
          longitude: Number(longitude), 
          latitude: Number(latitude)
        };

        addToSearchHistory(searchHistory, newSearch, setSearchHistory);
        setCurrentSearch(newSearch);
      }

    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        setPostcodeData({ error: "Postcode not found." });
      } else {
        console.error(error);
      }
    }
  };
  // Loads the saved history from local storage when the component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem('postcodeHistory');

    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Saves the search history to local storage whenever it changes
  useEffect(() => {
    saveToLocalStorage('postcodeHistory', searchHistory);
  }, [searchHistory]);

  return (
    <div className="w-full mt-14">
      <div className="mb-4 flex flex-col md:flex-row w-full items-center px-10">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 mb-6 md:mb-0">
          <p className="text-5xl md:text-6xl lg:text-6xl mb-10 text-center">How far from Heathrow?</p>
          <SearchForm onSubmit={getPostcodeData} />
        </div>
          <ResponseContainer data={postcodeData} currentSearch={currentSearch} />
      </div>
        <SearchHistory searchHistory={searchHistory} />
    </div>
);
};

export default Home;

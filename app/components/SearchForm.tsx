'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import AutocompleteList from "./AutocompleteList";

interface SearchFormProps {
  onSubmit: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  
  const [postcodeInput, setPostcodeInput] = useState("");
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [isDropdownMenuBlurred, setIsDropdownMenuBlurred] = useState(false);

  useEffect(() => {
    const fetchAutocompleteSuggestions = async (input: string) => {
      try {
        const response = await axios.get(`https://api.postcodes.io/postcodes/${input}/autocomplete`);
        setAutocompleteSuggestions(response.data.result || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (postcodeInput && postcodeInput.length <= 5) fetchAutocompleteSuggestions(postcodeInput);
  }, [postcodeInput]);
  
 // Handles the closing of the AutocompleteList component when the user clicks outside of it.
  useEffect(() => {
    if (isDropdownMenuBlurred) {
      setAutocompleteSuggestions([]);
    }
}, [isDropdownMenuBlurred]);

  const selectAutocompleteOption = (postcode: string) => {

    // Deletes the empty space in the postcode to facilitate character count for the form validation below.
    const formattedPostcode = postcode.replace(/\s/g, '');
    setPostcodeInput(formattedPostcode);
    setAutocompleteSuggestions([]);
    setIsDropdownMenuBlurred(false);
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[a-zA-Z][a-zA-Z0-9\s]{4,6}$/.test(postcodeInput)) {
      // The rule below was taken from official government documentation an analysis from valid postcodes.
      // Check https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/611951/Appendix_C_ILR_2017_to_2018_v1_Published_28April17.pdf 

      setValidationErrorMessage("The postcode must start with a letter and have from 5 to 7 alphanumeric characters.");
    } else {
      setValidationErrorMessage("");
      onSubmit(postcodeInput);
    }
    setPostcodeInput("")
  };

  return (

    <form 
      onSubmit={handleSubmit}
      className=" w-full flex flex-col items-center justify-center relative"
      onBlur={() => setTimeout(() => setIsDropdownMenuBlurred(true), 100)}
      onFocus={() => setIsDropdownMenuBlurred(false)}
    >
      <input
        type="text"
        placeholder="Enter postcode here"
        className="mt-2 px-4 py-2 w-5/6 border-2 rounded-md"
        value={postcodeInput}
        onChange={e => setPostcodeInput(e.target.value)}
      />

      {validationErrorMessage && <div className="mt-2 text-red-500">{validationErrorMessage}</div>}

      {autocompleteSuggestions.length > 0 && (
         <AutocompleteList suggestions={autocompleteSuggestions} selectSuggestion={selectAutocompleteOption} />
      )}

      <button
        type="submit"
        className="mt-4 px-4 py-2 w-5/6 bg-gray-700 text-white rounded-md"
      >
        Calculate distance
      </button>
    </form>
  );
};

export default SearchForm;



import React from "react";

interface AutocompleteListProps {
  suggestions: string[];
  selectSuggestion: (suggestion: string) => void;
}

const AutocompleteList: React.FC<AutocompleteListProps> = ({ suggestions, selectSuggestion }) => {
  return (
    <div className="absolute right-0 mt-1 w-3/4 border border-gray-200 bg-white rounded-md shadow-lg">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => selectSuggestion(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteList;

"use client";

import { useState } from "react";
import { useImageStore } from "@/store/useImageStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
  const { query, setQuery } = useImageStore();
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = () => {
    setQuery(inputValue);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 mt-10">
      <div className="w-full max-w-6xl flex items-center bg-white p-1 sm:p-2 rounded-md shadow-lg border border-gray-200 focus:ring-primary">
        <input
          type="text"
          className="flex-grow p-2 text-md sm:text-xl border-none outline-none bg-transparent w-full sm:w-auto"
          placeholder="Type a keyword"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-primary text-white px-3 py-2 sm:px-5 rounded-md hover:bg-primary-dark transition text-sm sm:text-base flex items-center gap-2"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6" /> 
          Search
        </button>
      </div>
    </div>
  );
}

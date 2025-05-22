"use client";

import { useImageStore } from "@/store/useImageStore";

export default function SortOptions() {
  const { selectedOption, sortImages } = useImageStore();

  return (
    <div className="flex items-center gap-1 sm:gap-2 pt-4 pr-7 sm:pt-2 sm:pb-2 sm:pr-8 text-sm sm:text-base">
    <span className="text-gray-700 font-medium">Order By:</span>
    <select
      value={selectedOption}
      onChange={(e) => sortImages(e.target.value as "date" | "likes")}
      className="border border-gray-300 rounded-md px-2 py-1 sm:px-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
    >
      <option value="likes">Most Likes</option>
      <option value="date">Most Recent</option>
    </select>
  </div>
  
  );
}

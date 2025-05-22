"use client";

import { useImageStore } from "@/store/useImageStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination() {
  const nextPage = useImageStore((state) => state.nextPage);
  const prevPage = useImageStore((state) => state.prevPage);
  const { currentPage } = useImageStore();

  return (
    <div className="flex justify-center mt-6">
      { currentPage > 1 &&
      <button
        onClick={prevPage}
        className="flex items-center gap-2 px-4 py-2 mx-2 bg-primary rounded-md text-white  hover:bg-primary-dark"
      >
         <ChevronLeftIcon className="w-5 h-5" />
        Before
      </button>
        }
      <span className="px-4 py-2 mx-2  text-gray-500 font-bold">Page {currentPage}</span>
      <button
        onClick={nextPage}
        className="flex items-center gap-2 px-4 py-2 mx-2 bg-primary rounded-md hover:bg-primary-dark text-white"
      >
        Next
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

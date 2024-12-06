"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
interface AdvancedSearchProps {
  onSearch: (query: string, location: string) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handling search ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleSearch = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      onSearch(searchQuery, locationQuery);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handling key press ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-[1032px] ">
      <div className="w-full bg-white border rounded-lg px-6 py-4 md:px-2 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
          <div className="flex w-full lg:w-2/5 items-center gap-3">
            <Image alt="search" src="/search.svg" width={24} height={24} />
            <input
              type="text"
              placeholder="Search by: Job title, Position, Keyword..."
              className="w-full p-2 text-sm focus:outline-none truncate"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:w-3/5 gap-4 justify-between">
            <div className="flex items-center w-full lg:w-3/5 gap-3">
              <div className="hidden lg:block">
                <Image
                  alt="divider"
                  src="/Divider.svg"
                  width={72}
                  height={1}
                  style={{ height: "60px" }}
                />
              </div>
              <Image alt="mappin" src="/Mappin.svg" width={24} height={24}  className="cursor-pointer"/>
              <input
                type="text"
                placeholder="City, state or country"
                className="w-full p-2 text-sm focus:outline-none"
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            {/* Find Job Button */}
            <div className="flex gap-4 items-center justify-center w-full lg:w-auto">
              <Image
                alt="crosshair"
                src="/crosshair.svg"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <Button
                className="w-full lg:w-32"
                variant={"blue"}
                size={"custom"}
                onClick={handleSearch}
              >
                Find Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;

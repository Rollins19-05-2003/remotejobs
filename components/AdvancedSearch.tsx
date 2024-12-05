"use client"
import { Button } from './ui/button'; 
import Image from 'next/image';
import { useState } from 'react';
interface AdvancedSearchProps {
  onSearch: (query: string, location: string) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handling search ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleSearch = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      onSearch(searchQuery, locationQuery);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handling key press ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex md:w-full sm:w-full lg:w-3/4 px-4 md:px-0 flex-wrap max-w-5xl'>
      <div className='w-full lg:h-16 h-auto border rounded-sm p-3 md:p-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-6'>
        <div className='flex w-full lg:w-2/5 justify-start'>
          <Image alt="search" src="/search.svg" width={24} height={24}/>
          <input 
            type='text' 
            placeholder='Search by: Job title, Position, Keyword...' 
            className='flex-grow p-2 text-sm truncate'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className='flex flex-col lg:flex-row w-full lg:w-3/5 gap-4 items-center justify-between'>
          <div className='flex items-center w-full lg:w-auto'>
            <div className='hidden lg:block'>
              <Image alt="divider" src="/Divider.svg" width={72} height={1} style={{height: '60px'}}/>
            </div>
            <Image alt="mappin" src="/Mappin.svg" width={24} height={24}/>
            <input 
              type='text' 
              placeholder='City, state or country' 
              className='p-2 text-sm flex-grow lg:flex-grow-0'
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className='flex gap-4 items-center justify-center w-full lg:w-auto'>
            <Image alt="crosshair" src="/crosshair.svg" width={24} height={24}/>
            <Button className='w-full lg:w-32' variant={'blue'} size={'custom'} onClick={handleSearch}>
              Find Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;

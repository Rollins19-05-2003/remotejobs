'use client';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Job } from '../types/job';
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMemo, useState, useEffect } from 'react';
import CardSkeleton from "../components/CardSkeleton";
import { useInView } from 'react-intersection-observer';
import AdvancedSearch from "../components/AdvancedSearch";
import { useInfiniteJobs } from '../hooks/useInfiniteJobs';
import { getUserLocation } from '../utils/userLocation';


export default function Home() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [visibleCards, setVisibleCards] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useInfiniteJobs({ 
    query: searchQuery, 
    location: locationQuery 
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Flattening the jobs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const allJobs = useMemo(() => {
    return data?.pages.flatMap((page) => page.jobs) || [];
  }, [data?.pages]);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fetching user location ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    const fetchUserLocation = async () => {
      const country = await getUserLocation();
      setUserCountry(country);
    };
  
  fetchUserLocation();
}, []);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Sorting based on location and salary ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const sortedJobs = useMemo(() => {
  if (!allJobs.length) return [];
  
  return [...allJobs].sort((a, b) => {
    const aLocation = a.location ? a.location.toLowerCase() : '';
    const bLocation = b.location ? b.location.toLowerCase() : '';
    const aSalary = getMaxSalary(a.salary);
    const bSalary = getMaxSalary(b.salary);
    
    // Only apply location-based sorting if user's country is available
    if (userCountry) {
      const aIsLocal = aLocation.includes(userCountry.toLowerCase());
      const bIsLocal = bLocation.includes(userCountry.toLowerCase());
      
      if (aIsLocal !== bIsLocal) {
        return aIsLocal ? -1 : 1;
      }
    }
    
    // If no user country or locations are the same, sort by salary in descending order
    return bSalary - aSalary;
  });
}, [allJobs, userCountry]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Loading more jobs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    if (inView && sortedJobs.length > visibleCards && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCards(prev => prev + 12);
        setIsLoadingMore(false);
      }, 1000);
    }
  }, [inView, sortedJobs.length, visibleCards, isLoadingMore]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Displaying the jobs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const visibleJobs = sortedJobs.slice(0, visibleCards);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Filtering jobs based on bookmarks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getFilteredJobs = useMemo(() => {
    if (!showBookmarkedOnly) return visibleJobs;
    
    const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    const bookmarkedIds = new Set(bookmarkedJobs.map((job: Job) => job.id));
    
    return visibleJobs.filter((job: Job) => bookmarkedIds.has(job.id));
  }, [visibleJobs, showBookmarkedOnly]);

  useEffect(() => {
    if (getFilteredJobs.length === 0) {
      const timer = setTimeout(() => setShowNoJobsMessage(true), 300); // 300ms delay
      return () => clearTimeout(timer);
    } else {
      setShowNoJobsMessage(false);
    }
  }, [getFilteredJobs]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 lg:px-[5rem] py-12">
        <div className="max-w-[1440px] space-y-12">
          <div className="w-full space-y-6 px-4 md:px-8 lg:px-[3.5rem]">
            <AdvancedSearch 
              onSearch={(query, location) => {
                setSearchQuery(query);
                setLocationQuery(location);
              }}
              />
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Show only bookmarks jobs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <div className="flex gap-2 px-1">
              <input
                type="checkbox"
                id="bookmarkFilter"
                checked={showBookmarkedOnly}
                onChange={(e) => setShowBookmarkedOnly(e.target.checked)}
                className="rounded text-[#0ba02c]"
              />
              <label htmlFor="bookmarkFilter" className="text-gray-700 font-medium text-sm">
                Show bookmarked jobs only
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 max-w-[1440px] justify-center px-4 md:px-8 lg:px-[32px]">
            {isLoading ? (
              Array(12).fill(0).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : isError ? (
              <div className="col-span-full text-center text-red-500">
                Error: {error?.message}
              </div>
            ) : showNoJobsMessage ? (
              <div className="col-span-full text-center text-gray-500 fade-enter fade-enter-active">
                {showBookmarkedOnly ? 'No bookmarked jobs found' : 'No jobs found'}
              </div>
            ) : (
              getFilteredJobs.map((job: Job) => (
                <Card 
                  key={job.id} 
                  job={job}
                  showBookmarkedOnly={showBookmarkedOnly}
                />
              ))
            )}
          </div>

          <div ref={ref} className="mt-12 text-center">
            {isLoadingMore ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500">
                {sortedJobs.length > visibleCards ? 
                  'Scroll for more jobs...' : 
                  'No more jobs to load'}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Helper function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getMaxSalary = (salary: string): number => {
  // Extract all numbers from the salary string
  const numbers = salary.match(/\d+/g);
  if (!numbers) return 0;
  
  // Convert all found numbers to integers and get the maximum
  const salaryNumbers = numbers.map(num => parseInt(num));
  return Math.max(...salaryNumbers);
};
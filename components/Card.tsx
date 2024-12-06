import React from 'react';
import Image from 'next/image';
import { Job } from '../types/job';
import toast from 'react-hot-toast';

interface CardProps {
  job: Job;
  showBookmarkedOnly?: boolean;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Card component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Card: React.FC<CardProps> = ({ job, showBookmarkedOnly = false }) => {
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    React.useEffect(() => {
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Checking if job is bookmarked ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
        setIsBookmarked(existingBookmarks.some((bookmark: Job) => bookmark.id === job.id));
      }, [job.id]);
  const handleBookmark = (e: React.MouseEvent) => {
    console.log('Bookmark clicked');
    e.stopPropagation(); // Prevent event bubbling
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Setting bookmarks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    if (isBookmarked) {
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Removing from bookmarks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const updatedBookmarks = existingBookmarks.filter((bookmark: Job) => bookmark.id !== job.id);
      setIsBookmarked(false);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      toast.success('Job removed from bookmarks!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#F44336',
          color: '#fff',
        },
      });
    } else {
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Adding to bookmarks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const updatedBookmarks = [...existingBookmarks, job];
      setIsBookmarked(true);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      toast.success('Job added to bookmarks!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#0ba02c',
          color: '#fff',
        },
      });
    }
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ If we're only showing bookmarked items and this isn't bookmarked, don't render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  if (showBookmarkedOnly && !isBookmarked) {
    return null; 
  }

  return (
    <div className="w-[20rem] md:w-[23rem] h-44 bg-white shadow-sm rounded-lg border hover:bg-gradient-to-r from-[#fff7e7] to-[#ffffff] hover:cursor-pointer">
      <div className="flex flex-col gap-4 px-6 py-4 justify-between">
        <div className="heading flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <div className='flex items-center gap-2'>
            <span className="bg-[#e7f6ea] text-[#0ba02c] text-xs font-bold px-2 py-1 rounded">
              REMOTE
            </span>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tags ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* {job.tags.map((tag, index) => (
              <span key={index} className="bg-[#e7f6ea] text-[#0ba02c] text-xs font-bold px-2 py-1 rounded">
                {tag}
              </span>
            ))} */}
            <span className="text-[#767f8c] text-sm">
              Salary: {formatSalary(job.salary)}
            </span>
          </div>
        </div>

        <div className="company flex justify-between items-center">
          <div className="rounded-full flex gap-2">
            <div className='flex justify-center items-center'>
              {job.companyLogo ? (
                <Image src={job.companyLogo} alt="Employer Logo" width={40} height={40} />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-800 font-semibold">{getInitials(job.company)}</span>
                </div>
              )}
            </div>
            <div className='flex flex-col'>
              <p className="text-gray-800 font-semibold">{job.company}</p>
              <div className='flex items-center gap-1'>
                <Image src="/mappin-grey.svg" alt="Location" width={18} height={18} />
                <p className="text-gray-500 text-sm">{formatLocation(job.location)}</p>
              </div>
            </div>
          </div>

          <div className="ml-3">
            <div onClick={handleBookmark} className="cursor-pointer">
              <Image 
                src={isBookmarked ? "/bookmark-filled.svg" : "/bookmark.svg"} 
                alt="Bookmark" 
                width={24} 
                height={24} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Formatting salary ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const formatSalary = (salary: string | null | undefined): string => {
    if (!salary) return 'Not Specified';
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Checking if the string contains any numbers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const hasNumbers = /\d/.test(salary);
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Checking for currency symbols (£, $, €, etc.) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const hasCurrency = /[$£€¥]/.test(salary);
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ If no numbers or currency symbols found, it's probably not a valid salary ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (!hasNumbers || !hasCurrency) {
      return 'Not Specified';
    }
    
    return salary;
  };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Formatting location ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const formatLocation = (location: string | null | undefined): string => {
  if (!location) return 'Worldwide';
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Checking if the string contains salary indicators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const hasSalaryIndicators = /(?:salary|\$|£|€|¥|\d{3,})/i.test(location);
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Checking if it's just a number or currency ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  const isOnlyNumbersOrCurrency = /^[\d\s$£€¥.,]+$/.test(location.trim());
  
  if (hasSalaryIndicators || isOnlyNumbersOrCurrency) {
    return 'Worldwide';
  }
  
  return location;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Getting initials of company name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};
import React from 'react'

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Card skeleton ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const CardSkeleton = () => {
  return (
    <div className="w-80 h-44 bg-white shadow-sm rounded-lg border animate-pulse">
      <div className="flex flex-col gap-4 p-6 justify-between">
        <div className="heading flex flex-col gap-2">
          <div className="h-6 bg-gray-200 rounded w-2/4"></div>
          <div className='flex items-center gap-2'>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        <div className="company flex justify-between items-center">
          <div className=" flex gap-2">
            <div className='flex justify-center items-center'>
              <div className='h-10 w-10 bg-gray-200'></div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className='flex items-center gap-1'>
                <div className='h-6 bg-gray-200 rounded w-6'></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
          </div>

          <div className="ml-3">
            <div className='h-6 w-6 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
import { Job } from '../types/job';
import { useInfiniteQuery } from '@tanstack/react-query';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fetching jobs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fetchInfiniteJobs = async ({ pageParam = 1, query = '', location = '' }) => {
  const params = new URLSearchParams({ 
    offset: pageParam.toString(), 
    query, 
    location 
  });
  const response = await fetch(`/api/jobs?${params}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

interface Pagination {
  hasMore: boolean;
  currentOffset: number;
}

interface JobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Hook for infinite jobs using useInfiniteQuery from @tanstack/react-query ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function useInfiniteJobs({ query = '', location = '' }) {
  return useInfiniteQuery<JobsResponse>({
    queryKey: ['infiniteJobs', query, location],
    queryFn: ({ pageParam }) => fetchInfiniteJobs({ pageParam: pageParam as number, query, location }),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.currentOffset + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5000,
  });
} 
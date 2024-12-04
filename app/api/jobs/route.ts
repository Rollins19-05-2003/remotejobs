import { parseJobsHtml } from '@/utils/htmlParser';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  console.log('=== API Route Started ===');
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fetching query parameters ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get('offset') || '1';
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';

  console.log('Received request:', { offset, query, location });

  try {
    console.log('Making request to remote API...');
    const response = await axios.get(
      `https://remote-jobs.remote-jobs-legacy.workers.dev/jobs?offset=${offset}`
    );
    console.log('Remote API response status:', response.status);
    
    const htmlContent = response.data;
    console.log('Received HTML content length:', htmlContent.length);
    let jobs = parseJobsHtml(htmlContent);
    console.log('Parsed jobs:', jobs.length);

    // Apply filters if query parameters exist
    if (query || location) {
      jobs = jobs.filter(job => {
        const searchString = `${job.title} ${job.company} ${job.tags.join(' ')} ${job.searchKeywords}`.toLowerCase();
        const locationString = job.location.toLowerCase();
        
        const matchesQuery = !query || searchString.includes(query.toLowerCase());
        const matchesLocation = !location || locationString.includes(location.toLowerCase());
        
        return matchesQuery && matchesLocation;
      });
    }
    console.log('=== API Route Completed ===');
    return NextResponse.json({
      jobs,
      pagination: {
        currentOffset: parseInt(offset),
        hasMore: jobs.length === 20
      }
    });
    
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', message: error.message },
      { status: 500 }
    );
  }
}
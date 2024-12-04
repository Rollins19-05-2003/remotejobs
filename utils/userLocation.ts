import axios from 'axios';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Getting user location ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getUserLocation = async (): Promise<string> => {
  try {
    const response = await axios.get('/api/location');
    console.log(response);
    return response.data.country;
  } catch (error) {
    console.error('Error getting user location:', error);
    return 'india';  // Default fallback
  }
}; 
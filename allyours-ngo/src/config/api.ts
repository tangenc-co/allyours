// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://allyours.onrender.com/api',
  // Extract base URL without /api for image URLs
  baseURLWithoutApi: process.env.NEXT_PUBLIC_API_ENDPOINT?.replace('/api', '') || 'https://allyours.onrender.com'
}

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
}

// Helper function to get full image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${API_CONFIG.baseURLWithoutApi}${imagePath}`
}

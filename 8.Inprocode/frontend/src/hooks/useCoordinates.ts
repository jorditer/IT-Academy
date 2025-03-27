import { useQuery } from '@tanstack/react-query';
import { APIResponse } from '../types/Coordinate'

export const useCoordinates = () => {
  return useQuery<APIResponse>({
    queryKey: ['coordinates'],
    queryFn: async () => {
      const response = await fetch('/api/coordinates')
      return response.json()
    }
  })
}
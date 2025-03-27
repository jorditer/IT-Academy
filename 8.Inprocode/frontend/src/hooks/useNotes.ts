import { useQuery } from '@tanstack/react-query';
import type { Notes, ApiResponse } from '../types/Notes';

export const useNotes = () => {
  return useQuery<Notes[]>({
    queryKey: ['notes'],
    staleTime: 1000 * 60 * 5, // 5 minutes, staleTime: Infinity
    queryFn: async () => {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { success, data }: ApiResponse = await response.json(); // adding {success, data} to the response.json() let's you check if the response was successful before using the data
        if (!success) {
          throw new Error('API returned unsuccessful response');
        }
        return data;
      } catch (error) {
        throw new Error('Failed to fetch events error: ' + error);
      }
    }
  });
};
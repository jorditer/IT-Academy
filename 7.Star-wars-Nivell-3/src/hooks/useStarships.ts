// src/hooks/useStarships.ts
import { Starship } from '../interfaces/Starship';
import { useInfiniteQuery } from 'react-query';

interface StarshipsData {
  results: Starship[];
  next: string | null;
}

const fetchStarships = async ({ pageParam = 1 }): Promise<StarshipsData> => {
  // const response = await fetch(`https://swapi.dev/api/starships/?page=${pageParam}`);
  const response = await fetch(`https://swapi.py4e.com/api/starships/?page=${pageParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useStarships = () => {
  return useInfiniteQuery<StarshipsData, Error>(
    'starships',
    fetchStarships,
    {
      getNextPageParam: (lastPage) => {
        const urlParams = new URLSearchParams(lastPage.next?.split('?')[1]);
        return urlParams.get('page') ? Number(urlParams.get('page')) : undefined;
      },
    }
  );
};
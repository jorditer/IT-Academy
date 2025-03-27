// src/hooks/usePilots.ts

import { Pilot } from '../interfaces/Pilot';

export const fetchPilots = async (pilotUrls: string[]): Promise<Pilot[]> => {
  const pilotPromises = pilotUrls.map(async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pilot data from ${url}`);
    }
    return response.json();
  });

  return Promise.all(pilotPromises);
};
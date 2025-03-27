import { Film } from "../interfaces/Film";

export const fetchFilms = async (filmUrls: string[]): Promise<Film[]> => {
  const filmPromises = filmUrls.map(async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch film data from ${url}`);
    }
    return response.json();
  });

  return Promise.all(filmPromises);
};
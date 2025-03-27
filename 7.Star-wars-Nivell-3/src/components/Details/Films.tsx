import { useEffect, useState } from 'react';
import { fetchFilms } from '../../hooks/useFilms';
import { Film } from "../../interfaces/Film";
import Separator from './Separator';

const Films = ({ filmUrls }: { filmUrls: string[] }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const getPilots = async () => {
      try {
        const filmData = await fetchFilms(filmUrls);
        setFilms(filmData);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    if (filmUrls.length > 0 && !hasFetched) {
      getPilots();
    }
  }, [filmUrls, hasFetched]);

  const regex = /\/(\d+)\/$/;

  return (
    <>
      <Separator>Films</Separator>
      <ul className='mt-5 mx-12 md:mx-24 gap-1 lg:gap-6 xl:gap-y-10 p-1 justify-items-center justify-center grid-cols-1 md:grid-cols-2 grid films-grid pb-8'>
        {films.map((film) => {
          const match = film.url.match(regex);
          const id = match ? match[1] : null;
          const imageUrl = id
            ? `https://starwars-visualguide.com/assets/img/films/${id}.jpg`
            : "../imgs/404.png";

          return (
            <li className='hover:shadow-lg hover:shadow-yellow-500/75 hover:bg-stone-950/90 hover:rounded-md bg-stone-950/65 border-4 border-yellow-500' key={film.url}>
              <img src={imageUrl} alt={film.title} className=" object-cover" />
              <p className='py-2 text-center border-t-[3px] border-yellow-500'><span className='text-xl'>{film.title}</span></p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Films;
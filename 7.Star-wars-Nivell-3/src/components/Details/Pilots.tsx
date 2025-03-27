import { useEffect, useState } from 'react';
import { fetchPilots } from '../../hooks/usePilots';
import { Pilot } from "../../interfaces/Pilot";
import Separator from './Separator';

const Pilots = ({ pilotUrls }: { pilotUrls: string[] }) => {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const getPilots = async () => {
      try {
        const pilotData = await fetchPilots(pilotUrls);
        setPilots(pilotData);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching pilots:", error);
      }
    };

    if (pilotUrls.length > 0 && !hasFetched) {
      getPilots();
    }
  }, [pilotUrls, hasFetched]);

  const regex = /\/(\d+)\/$/;

  return (
    <>
      <Separator>Pilots</Separator>
      <ul className='mt-6 mx-12 md:mx-24 gap-1 lg:gap-6 xl:gap-y-10 p-1 justify-items-center justify-center grid-cols-1 md:grid-cols-2 grid pilots-grid '>
        {pilots.map((pilot) => {
          const match = pilot.url.match(regex);
          const id = match ? match[1] : null;
          const imageUrl = id
            ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
            : "../imgs/404.png";

          return (
            <li className='hover:shadow-lg hover:shadow-yellow-500/75 hover:bg-stone-950/70 hover:rounded-md border-4 border-yellow-500' key={pilot.url}>
              <img src={imageUrl} alt={pilot.name} className=" object-cover" />
              <p className='py-2 text-center border-t-[3px] border-yellow-500'><span className='text-xl'>{pilot.name}</span></p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Pilots;
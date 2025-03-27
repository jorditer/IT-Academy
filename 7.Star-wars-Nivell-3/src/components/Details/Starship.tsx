import { Details } from "../../interfaces/Details";
import Separator from "./Separator";

interface StarshipProps {
  details: Details;
}

const Starship: React.FC<StarshipProps> = ({ details }) => {
  const regex = /\/(\d+)\/$/;
  const match = details.url.match(regex);
  const id = `https://starwars-visualguide.com/assets/img/starships/${match?.[1]}.jpg`;
  const alt = "/src/imgs/404.png";
  const addFallbackImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    try {
      e.currentTarget.src = alt;
    } catch (error) {
      console.error("Error setting fallback image:", error);
    }
  };
  return (
    <>
      <Separator>Spaceship</Separator>

      <div className="lg:max-h-[500px] flex flex-col lg:flex-row-reverse mt-6 mx-12 md:mx-24 gap-1 p-1 bg-yellow-500 justify-items-center justify-center">
        <img
          className="w-full lg:w-[50%] shrink lg:basis-[1200px] object-cover bg-stone-950 "
          src={id}
          onError={addFallbackImg}
          alt={id}
        />
        <div className="flex-1 min-w-[50%] grid md:grid-cols-2 div-grid bg-stone-950 md:p-10 p-7 shadow-sm gap-4">
          <h2 className="text-3xl col-span-1 md:col-span-2">{details.name.toUpperCase()}</h2>
          <p className="text-justify md:text-left text-pretty md:text-pretty col-span-1 md:col-span-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus rerum cumque nostrum dignissimos facere
            iure error consequatur ab fuga.
          </p>
          <p className="md:text-start text-justify">
            <span>Model: </span>
            {`${details.model}`}
          </p>
          <p>
            <span>Length: </span>
            {`${details.length}`}
          </p>
          <p>
            <span>Crew: </span>
            {`${details.crew}`}
          </p>
          <p className="text-justify md:text-left">
            <span>Manufacturer: </span>
            {`${details.manufacturer}`}
          </p>
          <p>
            <span>Cost: </span>
            {`${details.cost_in_credits}`}
          </p>
          <p>
            <span>Speed: </span>
            {details.max_atmosphering_speed}
          </p>
        </div>
      </div>
    </>
  );
};
export default Starship;

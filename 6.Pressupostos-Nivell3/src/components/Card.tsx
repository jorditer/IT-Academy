import Counter from "./Counter";

interface CardProps {
  title: string;
  text: string;
  preu: number;
  checked: boolean;
  onChange: () => void;
  switchState: boolean;
}

const Card: React.FC<CardProps> = ({ title, text, preu, checked, onChange, switchState }) => {
  return (
    <div className="cardElement">
      <div className="flex-nowrap flex flex-col gap-y-3 sm:flex-row justify-between items-center">
        <div className="cardContent">
          <h2 className="mb-4 sm:mb-0">{title}</h2>
          <p className="mt-2">{text}</p>
        </div>
        <div className="flex flex-col justify-center items-center relative">
          {switchState && (
            <p className="font-semibold text-orange-500 relative md:absolute mb-2 md:mb-[4.5rem] whitespace-nowrap">
              20% de descompte!
            </p>
          )}
          <h2 className="whitespace-nowrap mr-3">
            <span>{preu}</span> €
          </h2>
        </div>
        <div className="self-end sm:self-center space-x-4 flex ">
          <input
            className="checkbox-cards cursor-pointer my-auto"
            type="checkbox"
            name="afegir"
            id={title}
            checked={checked}
            onChange={onChange}
          />
          <label className="hidden sm:block" htmlFor={title}>
            Afegir
          </label>
        </div>
      </div>
      {title === "Web" && checked && (
        <div className="md:justify-self-end justify-self-center -order-1">
          <Counter text="Nombre de pàgines:" />
          <Counter text="Nombre de llenguatges:" />
        </div>
      )}
    </div>
  );
};

export default Card;

import { Link } from 'react-router-dom';

const Navbar = () => {
  const text = "Frontender.itacademy";
  return (
    <>
      <Link to="/" className="text-lg pt-1 mb-2 md:pt-5 md:mb-3 font-bold hover:underline">
        {text}
      </Link>
    </>
  );
};

export default Navbar;
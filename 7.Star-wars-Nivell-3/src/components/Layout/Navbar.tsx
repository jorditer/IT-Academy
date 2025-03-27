import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex border-y-2 justify-center bg-black/60">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white p-2 px-4 border-x-2 shadow-lg shadow-blue-500 z-10"
            : "text-white p-2 px-4 border-r-2 border-s-2"
        }
      >
        HOME
      </NavLink>
      <NavLink
        to="/starships"
        className={({ isActive }) =>
          isActive ? "text-white p-2 px-4 border-e-2 shadow-lg shadow-blue-500 z-10" : "text-white p-2 px-4 border-e-2"
        }
      >
        SPACESHIPS
      </NavLink>
    </div>
  );
};

export default Navbar;

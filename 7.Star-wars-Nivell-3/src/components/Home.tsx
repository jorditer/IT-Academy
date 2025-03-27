import { Link } from "react-router-dom";
import home from "../imgs/home.jpg" 

const Home = () => {
  return (
      <Link className=" overflow-hidden flex-grow h-full w-full block" to="/starships">
        <img className="hover:opacity-100 opacity-85 h-full w-full object-cover" src={home} alt="Star Wars" />
      </Link>
  );
}

export default Home;
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Button from "./button/Button";

const User = () => {
  const { isUserLoggedIn, logout } = useAuth();

  return (
    <div className="absolute top-0 right-0 p-4 sm:p-6">
      {isUserLoggedIn ? (
        <Link to="/">
          <Button className="log" onClick={logout} variant="weird" size="medium">
            LOGOUT
          </Button>
        </Link>
      ) : (
        <Link to="/email">
          <Button className="log" variant="weird" size="medium">
            LOGIN
          </Button>
        </Link>
      )}
    </div>
  );
};

export default User;

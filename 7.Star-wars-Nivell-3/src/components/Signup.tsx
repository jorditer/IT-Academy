import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login( {email}: {email: string} ) {
  const [password, setPassword] = useState("");
  const { setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    setIsUserLoggedIn(true);
    navigate("/starships");
  }
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div className="form">
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="form-text">Sign up</h1>
        <p className="form-p text-pretty">Sign up using <span className="font-bold text-black ">{email}</span> and a password</p>
        <input
          className="login"
          type="password"
          placeholder="Password"
          value={password}
          minLength={6}
          name="password"
          onChange={(e) => handleChange(e)}
        ></input>

        <button className="submit" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Login;

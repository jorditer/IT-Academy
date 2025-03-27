import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../config/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login({ email }: { email: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsUserLoggedIn(true);
      setError(null);
      navigate("/starships");
    } catch (error) {
      if (error instanceof FirebaseError) {
      console.error("Error logging in:", error);
      // Handle specific error codes
      switch (error.code) {
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/user-not-found':
          setError("No user found with this email.");
          break;
        case 'auth/too-many-requests':
          setError("Too many login attempts. Please try again later.");
          break;
        default:
        }
      }
      }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-text">Login</h1>
        <p className="form-p">Log in using <span className="font-bold text-black">{email}</span> and your password</p>
        {error && <p className="error-text">{error}</p>}
        <input
          className={`${error ? "bg-[#ffcccc]" : ""} login`}
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button className="submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
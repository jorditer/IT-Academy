import { useState, useRef, FormEvent, useEffect } from 'react';
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../config/firebase"; // Adjust the import path as needed
import Login from './Login';
import Signup from './Signup';

const Email = () => {
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = emailInputRef.current;

    if (input && !input.checkValidity()) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setEmailExists(null);
    await checkIfEmailExists(email);
  };

  async function checkIfEmailExists(email: string) {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      setEmailExists(signInMethods.length > 0);
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailExists(false);
    }
  }

  if (emailExists === true) {
    return <Login email={email} />;
  }

  if (emailExists === false) {
    return <Signup email={email} />;
  }

  return (
    <div className="form">
      <h1 className="form-text">Enter your email to continue</h1>
      <p className="form-p">Log in with your account. If you don't have one, you will be prompted to create one</p>
      <form action="post" onSubmit={handleSubmit} noValidate>
        {!isValid && <p className="error-text">Please enter a valid email address.</p>}
        <input
          ref={emailInputRef}
          onChange={e => setEmail(e.target.value)}
          type="email"
          pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
          name="email"
          id="email"
          className="login"
          placeholder="Enter your email"
        />
        <button className="submit" value={email} type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Email;
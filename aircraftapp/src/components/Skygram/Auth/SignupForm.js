// src/components/Skygram/Auth/SignupForm.js
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/AuthForm.css";
import { auth } from "../../../firebase";


const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Failed to sign up. Try again.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create Your SkyGram Account</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password (6+ chars)" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;

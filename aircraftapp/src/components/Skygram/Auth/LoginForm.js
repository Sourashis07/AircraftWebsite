// src/components/Skygram/Auth/LoginForm.js
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/AuthForm.css"; // we'll style both Login & Signup via this
import { auth } from "../../../firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>SkyGram Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

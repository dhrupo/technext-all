import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/register`, { username, email, password })
      // history.replace(from);
      window.location.replace("/login");
    }
    catch (err) {
      setError("Please provide valid username, email or password.");
    }
  }
  return (
    <div className="container my-5 form-back">
      <h4 className="text-center mb-3">Login</h4>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <p className="text-danger fw-bold">{error}</p>
        <input className="form-control mb-2" type="text" name="username" onChange={handleUsernameChange} placeholder="Enter Username" required />
        <input className="form-control mb-2" type="text" name="email" onChange={handleEmailChange} placeholder="Enter Email" required />
        <input className="form-control mb-2" name="password" type="password" onChange={handlePasswordChange} placeholder="Password" required />
        <button className="btn w-100 btn-primary mx-auto" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
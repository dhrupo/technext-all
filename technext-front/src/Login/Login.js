import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/login`, { login, password })
      sessionStorage.setItem('token', res.data);
      // history.replace(from);
      window.location.replace("/");
    }
    catch (err) {
      setError("Please Provide valid email or password.");
    }
  }
  return (
    <div className="container my-5 form-back">
      <h4 className="text-center mb-3">Login</h4>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <p className="text-danger fw-bold">{error}</p>
        <input className="form-control mb-2" type="text" name="login" onChange={handleLoginChange} placeholder="Enter Email" required />
        <input className="form-control mb-2" name="password" type="password" onChange={handlePasswordChange} placeholder="Password" required />
        <button className="btn w-100 btn-primary mx-auto" type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
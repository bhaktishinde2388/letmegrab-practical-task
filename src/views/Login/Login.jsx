import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [user, setUser] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const login = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.name === user.name);

    if (!foundUser) {
      toast.error("User not found!");
      return;
    }

    if (foundUser.password !== user.password) {
      toast.error("Incorrect password!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    toast.success("Login Successful!");
    toast.loading("Redirecting...");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className='login-bg'>
      <form className='login-form' onSubmit={(e) => e.preventDefault()}>
        <h2>Login to Your Account</h2>
        <input
          type="text"
          placeholder='Username'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="password"
          placeholder='Password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button text='Login' onClick={login} />
        <p className="login-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;

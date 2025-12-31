import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [user, setUser] = useState({ name: "", password: "" });
  const [sellerCreds, setSellerCreds] = useState(null);
  const navigate = useNavigate();

  // Load seller credentials from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const seller = users.find(u => u.role === "seller");
    if (seller) setSellerCreds(seller);
  }, []);

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

        {/* Show seller credentials */}
        {sellerCreds && (
          <div className="seller-credentialss">
            <h3>Seller Credentials (for reference)</h3>
            <span><b>Username:</b> {sellerCreds.name}</span> &nbsp;
            <span><b>Password:</b> {sellerCreds.password}</span>
          </div>
        )}
      </form>
      <Toaster />
    </div>
  );
}

export default Login;

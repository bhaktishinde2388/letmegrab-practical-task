import React ,{useState} from 'react'
import Button from "../../components/Button/Button.jsx"
import { Link } from 'react-router-dom'
import './Signup.css'


function Signup() {

  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const signupUser = (e) => {
     e.preventDefault(); 

    //vaidations
     if (!user.name || !user.password || !user.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    localStorage.setItem("signupUser", JSON.stringify(user));
    console.log("User data stored in localStorage:", user);
  };

  return (
    <div className='signup-bg'>
      <form className='forms-container'>
        <input className='usename-input input-box' type="text" placeholder='Enter UserName'
          value={user.email}
          onChange={(e) => setUser({ ...user, name: e.target.value })} />

        <input className='password-input input-box' type="text" placeholder='Enter Password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })} />

        <input className='confirm-pasword-input input-box' type="text" placeholder='Confirm Password'
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}

        />
        <Button type="submit" text='signup' onClick={signupUser}/>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
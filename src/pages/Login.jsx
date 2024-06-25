import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Import context

const Login = () => {
  const { login } = useContext(AuthContext); // Use context
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin42 = () => {
    window.location.href = process.env.REACT_APP_OAUTH_42_URL;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('====================================');
    console.log(userName);
    console.log(pwd);
    console.log('====================================');
    // Simulate authentication (replace with your actual logic)
    if (userName === "user" && pwd === "pwd") {
      login(); // Trigger login from context
      navigate('/'); // Redirect to home after successful login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name</label>
        <input id="userName"type="text" onChange={() => setUserName(event.target.value)}/>
        <br />
        <label htmlFor="pwd">Password</label>
        <input id="pwd"type="text" onChange={() => setPwd(event.target.value)}/>
        <br />
        <button type="submit" >Login</button>
        <br />
        <button type="button" onClick={handleLogin42}>Login with 42api</button>
      </form>
    </div>
  );
};

export default Login;

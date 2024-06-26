import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext"; // Import context
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login, isLoggedIn, authToken } = useContext(AuthContext); // Use context
  const auth42Url = import.meta.env.VITE_REACT_APP_OAUTH_42_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .post("http://localhost:5000/exchange_token", { code })
        .then((response) => {
          console.log("Access Token:", response.data.access_token);
          login(response.data.access_token);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error exchanging token:", error);
        });
    }
  }, []);

  const handleLogin42 = () => {
    console.log("ENV", import.meta.env);
    window.location.replace(auth42Url);
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-ceter">
        <div className="mt-3 mb-5 rounded border-r-8 border-transparent px-4 py-2 text-sm outline outline-PRIMARY">
          <h1 className="text-3xl mb-3 text-center">Login</h1>
          <button
            onClick={handleLogin42}
            className="px-4 py-2 border-2 rounded-md border-PRIMARY hover:bg-PRIMARY hover:text-SECONDARY ease-in-out"
          >
            Sign In With Intra
          </button>
          {isLoggedIn && <p>{authToken}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

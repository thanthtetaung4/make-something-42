import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { logout, authToken } = useContext(AuthContext);
  const [auth, setAuth] = useState("No Auth");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [campusData, setCampusData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  const fetchCampusData = () => {
    console.log(auth);
    const accessToken = auth;
    if (auth !== "No Auth") {
      axios
        .post("http://localhost:5000/api/get_campus_data", { accessToken })
        .then((response) => {
          setCampusData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else console.log("not fetch");
  };

  useEffect(() => {
    setAuth(authToken);
    fetchCampusData();
  }, [auth]);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  const handleCampusChange = (event) => {
    setSelectedCampus(event.target.value);
  };

  const campusOptions = campusData.map((campus) => {
    return (
      <option key={campus.id} value={campus.name}>
        {campus.name}
      </option>
    );
  });

  // const

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This content is only accessible to logged-in users.</p>
      <button onClick={handleLogout}>Logout</button>
      <p>Auth Token:{auth}</p>
      <select
        name="campus"
        id="campus"
        value={selectedCampus}
        onChange={handleCampusChange}
      >
        {campusOptions}
      </select>
      <p>Selected Campus: {selectedCampus}</p>
    </div>
  );
};

export default Home;

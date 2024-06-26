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
  const [campusIsLoading, setCampusIsLoading] = useState(false);
  const [projectIsLoading, setProjectIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCampusData = () => {
    console.log(auth);
    const accessToken = auth;
    setCampusIsLoading(true);
    if (auth !== "No Auth") {
      axios
        .post("http://localhost:5000/api/get_campus_data", { accessToken })
        .then((response) => {
          setCampusData(response.data);
          setCampusIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else console.log("not fetch");
  };

  const fetchProjectData = () => {
    console.log(auth);
    setProjectIsLoading(true);
    const accessToken = auth;
    if (auth !== "No Auth") {
      axios
        .post("http://localhost:5000/api/get_project_data", { accessToken })
        .then((response) => {
          setProjectData(response.data);
          console.log(response.data);
          setProjectIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else console.log("not fetch");
  };

  useEffect(() => {
    setAuth(authToken);
    fetchCampusData();
    fetchProjectData();
  }, [auth]);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  const handleCampusChange = (event) => {
    setSelectedCampus(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const campusOptions = campusData.map((campus) => {
    return (
      <option key={campus.id} value={campus.name}>
        {campus.name}
      </option>
    );
  });

  const projectOptions = projectData.map((project) => {
    return (
      <option key={project.id} value={project.name}>
        {project.name}
      </option>
    );
  });

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This content is only accessible to logged-in users.</p>
      <button onClick={handleLogout}>Logout</button>
      <p>Auth Token:{auth}</p>
      <label htmlFor="campus">Select Campus:</label>
      {campusIsLoading ? (
        <p>Loading...</p>
      ) : (
        <select
          name="campus"
          id="campus"
          value={selectedCampus}
          onChange={handleCampusChange}
        >
          {campusOptions}
        </select>
      )}
      <label htmlFor="porject">Select porject:</label>
      {projectIsLoading ? (
        <p>Loading...</p>
      ) : (
        <select
          name="porject"
          id="porject"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          {projectOptions}
        </select>
      )}
      <p>Selected Campus: {selectedCampus}</p>
      <p>Selected Project: {selectedProject}</p>

      {/* {projectData.map((project) => (
        <p key={project.id}>{project.name}</p>
      ))} */}
    </div>
  );
};

export default Home;

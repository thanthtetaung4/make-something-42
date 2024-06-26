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
  const [peers, setPeers] = useState([]);
  const [campusData, setCampusData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [campusIsLoading, setCampusIsLoading] = useState(false);
  const [projectIsLoading, setProjectIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchPeers = (projectId, campusId) => {
    console.log(auth);
    setIsLoading(true);
    const accessToken = auth;
    if (auth !== "No Auth") {
      axios
        .post("http://localhost:5000/api/get_peer_data", {
          accessToken,
          projectId,
          campusId,
        })
        .then((response) => {
          setPeers(response.data);
          console.log(response.data);
          setIsLoading(false);
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
      <option key={campus.id} value={campus.id}>
        {campus.name}
      </option>
    );
  });

  const projectOptions = projectData.map((project) => {
    return (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });

  const peersEl = peers.map((peer) => {
    return (
      <div key={peer.id}>
        <h1>{peer.user.login}</h1>
        <a
          href={`https://profile.intra.42.fr/users/${peer.user.login}`}
          target="blank"
        >
          Go to {peer.user.login}'s Intra
        </a>
      </div>
    );
  });

  function handlePeerFinder() {
    fetchPeers(selectedProject, selectedCampus);
  }

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

      <button onClick={handlePeerFinder}>Find Your Peer</button>

      {isLoading ? <p>Loading...</p> : <div>{peersEl}</div>}
    </div>
  );
};

export default Home;

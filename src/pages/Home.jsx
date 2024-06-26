import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
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

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login"); // Redirect to login page
  // };

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
      <div
        key={peer.id}
        className="flex justify-between border-2 border-PRIMARY mb-5 px-4 py-2 rounded-md items-center"
      >
        <h3 className="text-lg">{peer.user.login}</h3>
        <a
          href={`https://profile.intra.42.fr/users/${peer.user.login}`}
          target="blank"
          className="px-4 py-2 border-2 rounded-md border-PRIMARY hover:bg-PRIMARY hover:text-SECONDARY ease-in-out"
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
    <div className="">
      <Header />
      <div className="p-5 bg-BACKGROUND text-TEXT_COLOR">
        <h1 className="text-3xl mb-10 text-SECONDARY text-center">
          Welcome to the 42 Peer Finder🤝🔎
        </h1>
        <div className="grid grid-cols-2 h-screen gap-5">
          <div className="bg-SECONDARY py-5 px-5 rounded-md">
            {/* <button onClick={handleLogout}>Logout</button> */}
            {/* <p>Auth Token:{auth}</p> */}
            <div>
              <label htmlFor="campus">Select Campus</label>

              {campusIsLoading ? (
                <p className="mt-3 w-full mb-5 rounded border-r-8 border-transparent px-4 py-2 text-sm outline outline-PRIMARY">
                  Loading...
                </p>
              ) : (
                <select
                  name="campus"
                  id="campus"
                  value={selectedCampus}
                  onChange={handleCampusChange}
                  // className="w-full mb-5 border-2 border-PRIMARY flex justify-between px-4 py-2 rounded-md"
                  className="mt-3 w-full mb-5 rounded border-r-8 border-transparent px-4 py-2 text-sm outline outline-PRIMARY"
                >
                  {campusOptions}
                </select>
              )}
            </div>
            <div className="">
              <label htmlFor="porject">Select porject:</label>
              {projectIsLoading ? (
                <p className="mt-3 w-full mb-5 rounded border-r-8 border-transparent px-4 py-2 text-sm outline outline-PRIMARY">
                  Loading...
                </p>
              ) : (
                <select
                  name="porject"
                  id="porject"
                  value={selectedProject}
                  onChange={handleProjectChange}
                  className="mt-3 w-full mb-5 rounded border-r-8 border-transparent px-4 py-2 text-sm outline outline-PRIMARY"
                >
                  {projectOptions}
                </select>
              )}
            </div>
            {/* <p>Selected Campus: {selectedCampus}</p>
          <p>Selected Project: {selectedProject}</p> */}
            <button
              onClick={handlePeerFinder}
              className="px-4 py-2 border-2 rounded-md border-PRIMARY hover:bg-PRIMARY hover:text-SECONDARY ease-in-out"
            >
              Find Your Peers 🔎
            </button>
          </div>
          <div className="bg-SECONDARY py-5 px-5 rounded-md overflow-scroll">
            <h2 className="text-2xl mb-3">Your Peers🤝</h2>
            <p>
              {peersEl.length === 0 && "Select option and find your peers!!"}
            </p>
            {isLoading ? (
              <p className="mt-3 w-full mb-5 rounded border-r-8 border-transparent px-4 py-2 text-sm outline outline-PRIMARY">
                Loading...
              </p>
            ) : (
              <div>{peersEl ? peersEl : <p>Nothing to show</p>}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

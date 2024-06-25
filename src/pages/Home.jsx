import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Cookies.remove('isLoggedIn'); // Clear the cookie
    navigate('/login'); // Redirect to login page
  };

  return (
<body class="bg-black font-sans">
    <div class="container mx-auto p-4">
        <div class="header flex justify-between items-center bg-blue-500 p-4 rounded-lg shadow-md">
            <div class="logo">
                <p class="text-white text-2xl font-bold">42</p>
            </div>
            <div class="header-user">
                <p class="text-white">User</p>
            </div>
        </div>
        <div class="flex mt-4">
            <div class="body-block-left w-1/3 p-4 bg-white rounded-lg shadow-md mr-4">
                <div class="select mb-4">
                    <p class="mb-2">Subject</p>
                    <select name="subject" id="subject" class="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Select Subject</option>
                    </select>
                </div>
                <div class="select mb-4">
                    <p class="mb-2">Campus</p>
                    <select name="campus" id="campus" class="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Select Campus</option>
                    </select>
                </div>
                <div class="searchbutton">
                    <button class="w-full p-2 bg-blue-500 text-white rounded-lg">Search Your Peer</button>
                </div>
            </div>
            <div class="body-block-right w-2/3 p-4 bg-white rounded-lg shadow-md">
                <div class="peer-user flex flex-col items-start space-y-2">
                    <p class="bg-gray-200 p-2 rounded-lg">img</p>
                    <p>name</p>
                    <p>42 intra id</p>
                    <button class="mt-2 p-2 bg-blue-500 text-white rounded-lg">See on intra</button>
                </div>
            </div>
        </div>
    </div>
</body>
  );
};

export default Home;

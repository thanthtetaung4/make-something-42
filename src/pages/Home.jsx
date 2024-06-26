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
<body class="bg-darkgrey font-sans">
    <div class="container mx-auto p-4">
        <div class="header flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div class="logo">
                <img src="/src/assets/42_logo 1.svg" alt="42" width="50"/>
            </div>
            <div class="header-user">
                <p class="text-black">42 intra_id</p>
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
                    <button class="w-full p-2 bg-turquoise text-white rounded-lg">Search Your Peer</button>
                </div>
            </div>
            <div class="body-block-right w-2/3 p-4 bg-white rounded-lg shadow-md">
                <div class="peer-user flex flex-col items-start space-y-2 bg-turquoise">
                    <p class="bg-gray-200 p-2 rounded-lg">img</p>
                    <p>name</p>
                    <p>42 intra id</p>
                    <button class="mt-2 p-2 bg-turquiose text-white rounded-lg">See on intra</button>
                </div>
            </div>
        </div>
    </div>
</body>
  );
};

export default Home;

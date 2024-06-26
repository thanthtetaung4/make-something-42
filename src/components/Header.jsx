import React from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Header = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className=" bg-SECONDARY py-5 px-5 flex justify-between items-center">
      <div>
        <img src="./42.svg" alt="42logo" className="w-10" />
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 border-2 rounded-md border-PRIMARY hover:bg-PRIMARY hover:text-SECONDARY ease-in-out"
      >
        LogOut
      </button>
    </nav>
  );
};

export default Header;

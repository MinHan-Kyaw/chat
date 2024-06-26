import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { updateUserFromLocalStorage } from "../store/userSlice";
import { updateRoomsFromLocalStorage } from "../store/chatSlice";

const Starter = () => {
  const dispatch = useDispatch();

  // Listen for changes in the "users" key of localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUsers = JSON.parse(localStorage.getItem("users"));
      if (savedUsers) {
        dispatch(updateUserFromLocalStorage(savedUsers));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  // Listen for changes in the "rooms" key of localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedRooms = JSON.parse(localStorage.getItem("rooms"));
      if (savedRooms) {
        dispatch(updateRoomsFromLocalStorage(savedRooms));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return <Outlet />;
};

export default Starter;

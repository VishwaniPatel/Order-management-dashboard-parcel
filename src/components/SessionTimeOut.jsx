import React, { useEffect, useRef } from "react";
import { useAuth } from "./ProductContext";
import { useNavigate } from "react-router-dom";

const SessionTimeout = () => {
  const events = ["mousemove", "keydown", "scroll"];
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
  } = useAuth();

  let logoutTimer = useRef();
  let lastInteractionTime = useRef(Date.now());

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const resetTimer = () => {
    clearTimeout(logoutTimer.current);

    if (isAuthenticated) {
      const currentTime = Date.now();
      localStorage.setItem("lastInteractionTime", currentTime.toString());
      lastInteractionTime.current = currentTime;
      logoutTimer.current = setTimeout(logout, 60 * 60 * 1000); // Logout after 1 hr of inactivity
    } else {
      localStorage.removeItem("lastInteractionTime");
    }
  };

  const handleUserActivity = () => {
    if (isAuthenticated) {
      const currentTime = Date.now();
      lastInteractionTime.current = currentTime;
    }
  };

  useEffect(() => {
    resetTimer();

    const interval = setInterval(() => {
      if (isAuthenticated) {
        const currentTime = Date.now();
        if (currentTime - lastInteractionTime.current > 60 * 60 * 1000) {
          // More than 1 hr of inactivity, logout
          logout();
        }
      }
    }, 10000); // Check for inactivity every 10 seconds

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      clearTimeout(logoutTimer.current);
      clearInterval(interval);
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isAuthenticated]);

  return null;
};

export default SessionTimeout;

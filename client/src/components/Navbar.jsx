import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <Link to="/kids" style={styles.link}>Kids</Link>
        <Link to="/activities" style={styles.link}>Activities</Link>
        <Link to="/appointments" style={styles.link}>Appointments</Link>
        <Link to="/cleaning" style={styles.link}>Cleaning</Link>
        <Link to="/shopping" style={styles.link}>Shopping</Link>
        <Link to="/vacations" style={styles.link}>Vacations</Link>
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    width: "100%",
    background: "#ffb6d9",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
  logout: {
    background: "white",
    color: "#ff4f9a",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/images/bg/backgroundlogin.jpg"; // Import gambar latar belakang

const loginPageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: `url(${backgroundImage}) no-repeat center center fixed`,
  backgroundSize: "cover", // Pastikan gambar mencakup seluruh area
};

const titleStyle = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "28px",
  color: "#fff",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

const loginContainerStyle = {
  width: "100%",
  maxWidth: "400px",
  padding: "2rem",
  background: "#fff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  margin: "0.5rem 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "0.75rem",
  margin: "0.5rem 0",
  borderRadius: "4px",
  border: "none",
  background: "#2575fc",
  color: "#fff",
  cursor: "pointer",
};

const switchStyle = {
  margin: "1rem 0",
  cursor: "pointer",
  color: "#2575fc",
  textDecoration: "underline",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State untuk switch antara login dan register
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:8801/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("Login successful", data.user);
          navigate("/starter");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error("Error logging in:", err);
        toast.error("An unexpected error occurred. Please try again.");
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    fetch("http://localhost:8801/register", {
      // Ganti endpoint sesuai kebutuhan
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("Registration successful", data.user);
          toast.success("Registration successful! Please log in.");
          setIsRegistering(false); // Kembali ke login setelah pendaftaran berhasil
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error("Error registering:", err);
        toast.error("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div style={loginPageStyle}>
      <h1 style={titleStyle}>
        Monitoring Suhu dan Kelembapan ruangan sarang burung walet
      </h1>
      <div style={loginContainerStyle}>
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div
          style={switchStyle}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

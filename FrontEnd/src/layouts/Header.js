import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import user1 from "../assets/images/users/user4.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "Guest");
  }, []); // Only run once on mount

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    // Hapus token atau informasi pengguna dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Remove username on logout
    // Arahkan pengguna kembali ke halaman login
    navigate("/login");
  };

  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand>Monitoring Suhu dan Kelembapan</NavbarBrand>
        <Button color="primary" className="d-lg-none ms-auto">
          <i className="bi bi-list"></i>
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
        <span className="ms-3 align-item-right me-3">
          Selamat Datang <strong>{username}</strong>
        </span>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>About</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;

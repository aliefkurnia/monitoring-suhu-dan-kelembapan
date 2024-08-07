import React from "react";
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
  const [isOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    // Hapus token atau informasi pengguna dari localStorage
    localStorage.removeItem("token");
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
        <Button color="primary" className=" d-lg-none">
          <i className="bi bi-list"></i>
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
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

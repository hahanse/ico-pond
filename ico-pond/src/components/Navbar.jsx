import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { navLinks } from "../label/index";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);  // State untuk menampilkan Sidebar

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();

    window.addEventListener('scroll', changeBackgroundColor);

    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, []);

  // Fungsi untuk toggle tampilan sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);  // Toggle state untuk sidebar
  };

  return (
    <div>
      <Navbar expand="lg" className={'fixed-top ${changeColor ? "color-active" : ""}'}>
        <Container>
          <Navbar.Brand href="#home" className="fs-3 fw-bold">ICo-Pond</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              {navLinks.map((link) => {
                return (
                  <div className="nav-link" key={link.id}>
                    <NavLink to={link.path} className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    } end>
                      {link.text}
                    </NavLink>
                  </div>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSidebar && <MoreInfoSidebar show={showSidebar} onHide={toggleSidebar} />}  

    </div>
  );
};

export default NavbarComponent;
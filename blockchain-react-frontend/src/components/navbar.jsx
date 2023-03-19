import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import './styles.css';



function Navbar1() {
  return (
    <div>
      <Navbar className="Nav" expand="lg">
        <Container>
          <Navbar.Brand className="Navlogo" href="#home">TraceRx</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='justify-content-end' style={{ width: "100%" }}>
              <Link to="/addDrug" className="navlink">Add Drug</Link>
              <Link to="/" className="navlink" >Druglist</Link>
              <Link className="navlink" >Assign Distributor</Link>
              {/* <NavDropdown className='nav-dropdwn' title="Assign Distributor" id="basic-nav-dropdown">
                <NavDropdown.Item className="navlink" href="#action/3.1">Distributor1</NavDropdown.Item>
                <NavDropdown.Item  className="navlink" href="#action/3.2">
                Distributor1
                </NavDropdown.Item>
                <NavDropdown.Item className="navlink" href="#action/3.3">Distributor1</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="navlink" href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Navbar1;

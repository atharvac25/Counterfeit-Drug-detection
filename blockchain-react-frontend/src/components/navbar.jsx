import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png"



function Navbar1() {
    return (
        <div>
            {/* <Navbar bg="light" expand="lg">
                <Container>
                    <Link to='/'>Home Page</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/addDrug" className="mx-3">Add Drug</Link>
                            <Link to="/addDistributer" className="mx-3">Add Distributer</Link>
                            <Link to="/assignDrugToDistributer" className="mx-3">Assign Drug to Distributer</Link>
                            <Link to="/disAssignedList" className="mx-3">Distributer Assigned List</Link>
                            <Link to="/addVerifier" className="mx-3">Add Verifier</Link>
                            <Link to="/assignDrugToVerifier" className="mx-3">Assign Drug to Verifier</Link>
                            <Link to="/verAssignedList" className="mx-3">Verifier Assigned List</Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/"><img style={{ width: 70, height: 40 }} src={logo} alt="Home Page"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="addDrug">Add Drug</Nav.Link>
                            <Nav.Link href="addDistributer">Add Distributor</Nav.Link>
                            <Nav.Link href="addVerifier">Add Verifier</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="assignDrugToDistributer">Assign Drug To Distributor</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="disAssignedList">
                                    Distributor Assigned List
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="assignDrugToVerifier">Assign Drug To Verifier</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="verAssignedList">
                                    Verifier Assigned List
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Navbar1;
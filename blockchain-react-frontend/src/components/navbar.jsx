import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png"
import App from '../App';



function Navbar1() {
    return (
        <div className='nvbar'>
            
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/"><img style={{ width: 70, height: 40 }} src={logo} alt="Home Page"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto" >
                            <Nav.Link className='mx-4' href="addDrug">Add Drug</Nav.Link>
                            <Nav.Link className='mx-4' href="addDistributer">Add Distributor</Nav.Link>
                            <Nav.Link className='mx-4' href="addVerifier">Add Verifier</Nav.Link>
                            <NavDropdown className='mx-4' title="Other Services" id="collasible-nav-dropdown">
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
import '../App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from '../components/navbar';

export default function AddVerifierPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const [verifierList, setVerifierList] = useState([])

    useEffect(() => {
        getVerifierList();
    }, [])


    const getVerifierList = async () => {
        console.log("Entered getVerifierList Function");
        await axios.get('http://localhost:3001/getVerifierList')
            .then((response) => response.data)
            .then(val => setVerifierList(val))
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            })
    }


    const handleFormSubmit = async (e) => {
        console.log("Entered handleFormSubmit function in add_verifier_page.jsx");
        e.preventDefault();
        if (name != '' & address != '') {
            const result = await axios.post(`http://localhost:3001/addVerifier?name=${name}&address=${address}`)
                .then((response) => response.data)
                .then((val) => val)
                .catch((error) => {
                    if (error.response) {
                        console.log(error);
                    }
                })
            setStatus(result);
            setName('');
            setAddress('');
            window.location.reload(true);
        }
        else {
            setStatus("Name or address is Empty");
        }
    }

    return (
        <div>
            <Navbar1 />
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>verifier Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Verifier Name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }
                    } />
                    {/* <Form.Text className="text-muted">
                        Please keep it meaningful
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Verifier Account Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
            <h5>{status}</h5>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div>
          <h2>Verifiers List</h2>
          <table style={{ borderCollapse: "collapse", textAlign: "center" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>#</th>
                <th style={{ border: "1px solid black", padding: "10px", verticalAlign: "middle", width: "300px" }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {verifierList.map((name, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "10px", verticalAlign: "middle" }}>{index+1}</td>
                  <td style={{ border: "1px solid black", padding: "10px", verticalAlign: "middle", width: "300px" }}>{name[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    );
}
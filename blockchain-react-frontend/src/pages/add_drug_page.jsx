import Form1 from "../components/form"
import { useEffect, useState, useRef } from 'react'

import '../App.css'
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from "../components/navbar";


export default function AddDrugPage() {
    const [drugsList, setDrugsList] = useState([]);
    const [drugName, setDrugName] = useState('');
    const [description, setDescription] = useState('');
    const drugPageRef = useRef(null);

    useEffect(() => {
        getDrugNames();
    }, []);

    const getDrugNames = async () => {
        await axios.get(`http://localhost:3001/getDrugNamesList`)
            .then((response) => response.data)
            .then((val) => {
                setDrugsList(val);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            })
    }

    const getDescription = async (name) => {
        await axios.get(`http://localhost:3001/descriptionByName?drug_name=${name}`)
            .then((response) => response.data)
            .then((val) => {
                setDrugName(name);
                setDescription(val);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            })

            if (drugPageRef.current) {
                drugPageRef.current.scrollIntoView({ behavior: "smooth" });
              }
    }

    const addDrug = async (drug_name, drug_info, quantity) => {
        console.log("Entered AddDrug Function");
        if (drug_name != undefined && drug_name != '') {
            var myVal;
            await axios.post(`http://localhost:3001/addDrug?drug_name=${drug_name}&drug_info=${drug_info}&quantity=${quantity}`)
                .then((response) => response.data)
                .then((val) => {
                    myVal = val;
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error);
                    }
                })
            console.log('My Value: ', myVal);
            return myVal;
        }
        return 'Issue with Drug Name';
    }
    return (
        <div ref={drugPageRef} id='id-drug-page'>
            <Navbar1 />
            <Form1 addDrug={addDrug} drugName={drugName} description={description} setDrugName={setDrugName} setDescription={setDescription} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div>
                    <h2>Drug List</h2>
                    <table style={{ borderCollapse: "collapse", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", padding: "10px" }}>#</th>
                                <th style={{ border: "1px solid black", padding: "10px", verticalAlign: "middle", width: "300px" }}>Drug Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugsList.map((name, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid black", padding: "10px", verticalAlign: "middle" }}>{index + 1}</td>
                                    <td key={index}style={{ border: "1px solid black", padding: "10px", verticalAlign: "middle", width: "300px", cursor: "pointer" }} onClick={(e) => getDescription(name)}>{name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
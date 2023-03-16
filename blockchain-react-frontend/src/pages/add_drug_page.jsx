import Form1 from "../components/form"
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import axios from 'axios';
import DrugList from '../features/drugsList';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from '../components/navbar'
import Table1 from '../components/table';

export default function AddDrugPage() {
    
    const addDrug = async (drug_name, drug_info) => {
        console.log("Entered AddDrug Function");
        if(drug_name!=undefined && drug_name!='') {
            var myVal;
            await axios.get(`http://localhost:3001/addDrug?drug_name=${drug_name}&drug_info=${drug_info}`)
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
    return(
        <div>
            <Form1 addDrug={addDrug}/>
        </div>
    )
}
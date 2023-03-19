import Form1 from "../components/form"
import { useState } from 'react'

import '../App.css'
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';


export default function AddDrugPage() {
    
    const addDrug = async (drug_name, drug_info, quantity) => {
        console.log("Entered AddDrug Function");
        if(drug_name!=undefined && drug_name!='') {
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
    return(
        <div>
            <Form1 addDrug={addDrug}/>
        </div>
    )
}
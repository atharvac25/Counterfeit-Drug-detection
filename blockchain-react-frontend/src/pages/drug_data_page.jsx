import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DrugDataPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const drug_id = searchParams.get('drug_id');
    const [drugData, setDrugData] = useState('...Loading');

    useEffect(() => {
        getDrugData();
    }, []);

    const getDrugData = async () => {
        console.log("Entered getDrugData Function");
        await axios.get(`http://localhost:3001/drugsData?drug_id=${drug_id}`)
            .then((response) => response.data)
            .then(val => setDrugData(val))
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            })
    }
    return (
        <div>
            {drugData==='...Loading' 
            ? <h5>{drugData}</h5>
            : <table style={{ border: '1px solid black' }}>
            <thead>
                <tr>
                    {/* {Object.keys(drugData).map((key) => (
                        <th key={key}>{key}</th>
                    ))} */}
                    <td>Attribute</td>
                    <td>Property</td>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    {Object.keys(drugData).map((key) => (
                        <td key={key}>{drugData[key]}</td>
                    ))}
                </tr> */}
                {Object.keys(drugData).map((key) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{drugData[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table>}
        </div>
    )
}
import React, { useState, useEffect } from "react";
import Navbar1 from "../components/navbar";
import axios from "axios";
import Table1 from "../components/table";

export default function VerAssignedList() {

    const [verifierAddress, setVerifierAddress] = useState({});
    const [address, setAddress] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [drugNamesList, setDrugNamesList] = useState([]);

    useEffect(() => {
        getVerifierList();
    }, []);
    useEffect(() => {
        console.log('verifier address: ', verifierAddress)
    }, [verifierAddress]);
    const getVerifierList = async () => {
        var tempList = [];
        console.log("Entered getVerifierList Function");
        await axios.get('http://localhost:3001/getVerifierList')
            .then((response) => response.data)
            .then(val => {
                tempList = val;
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            });
        console.log(tempList);
        tempList.map((item) => {
            setVerifierAddress(prevState => {
                return {
                    ...prevState,
                    [item[0]]: item[1]
                }
            })
        })
        console.log('line 54');
        console.log(verifierAddress);
    }

    const handleOptionSelect = async (name) => {
        console.log()
        setSelectedOption(name);
        setAddress(verifierAddress[name]);
        console.log('name: ', name);
        console.log('address: ', address);
        await axios.get(`http://localhost:3001/getVerifierDrugNames?address=${verifierAddress[name]}`)
            .then((response) => response.data)
            .then(val => {
                setDrugNamesList(val);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            });
    }



    return (
        <div>
            <Navbar1 />
            <div>
                <p style={{display: 'flex', alignItems: 'center'}}>Select one Verifier:</p>
                {Object.keys(verifierAddress).map((option, index) => (
                    <div key={index} style={{display: 'flex', alignItems: 'center'}} >
                        <label >
                            <input
                                type="radio"
                                value={index + 1}
                                checked={selectedOption === option}
                                onChange={() => handleOptionSelect(option)}
                                className="mx-3"
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            <Table1 drugsList={drugNamesList} address={address} route={'verifier'} />
        </div>
    );
}
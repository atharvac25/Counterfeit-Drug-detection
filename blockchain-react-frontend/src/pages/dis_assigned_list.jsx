import React, { useState, useEffect } from "react";
import Navbar1 from "../components/navbar";
import axios from "axios";
import Table1 from "../components/table";

export default function DisAssignedList() {

    const [distributorAddress, setDistributorAddress] = useState({});
    const [address, setAddress] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [drugNamesList, setDrugNamesList] = useState([]);

    useEffect(() => {
        getDistributerList();
    }, []);
    useEffect(() => {
        console.log('distributer address: ', distributorAddress)
    }, [distributorAddress]);
    const getDistributerList = async () => {
        var tempList = [];
        console.log("Entered getDistributerList Function");
        await axios.get('http://localhost:3001/getDistributerList')
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
            setDistributorAddress(prevState => {
                return {
                    ...prevState,
                    [item[0]]: item[1]
                }
            })
        })
        console.log('line 54');
        console.log(distributorAddress);
    }

    const handleOptionSelect = async (name) => {
        console.log()
        setSelectedOption(name);
        setAddress(distributorAddress[name]);
        console.log('name: ', name);
        console.log('address: ', address);
        await axios.get(`http://localhost:3001/getDistributerDrugNames?address=${distributorAddress[name]}`)
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
                <p style={{display: 'flex', alignItems: 'center'}}>Select one Distributor:</p>
                {Object.keys(distributorAddress).map((option, index) => (
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
            <Table1 drugsList={drugNamesList} address={address} />
        </div>
    );
}
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import Navbar1 from '../components/navbar';

export default function AssignDrugToDistributerPage() {
    const [drugsList, setDrugsList] = useState([]);
    const [quantityList, setQuantityList] = useState({});
    const [isChecked, setIsChecked] = useState({});
    // const [givenQuantity, setGivenQuantity] = useState({});
    const [assignedDrugsDict, setAssignedDrugsDict] = useState({});
    const [assignedDrugs, setAssignedDrugs] = useState([]);
    const [distributorAddress, setDistributorAddress] = useState({});
    const [address, setAddress] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        getDistributerList();
        getDrugsList();
    }, []);

    useEffect(() => {
        console.log('quantityList:', quantityList);
    }, [quantityList]);
    // useEffect(() => {
    //     console.log('quantityList:', quantityList);
    // }, [isChecked]);

    // useEffect(() => {
    //     console.log('Address: ', address);
    // }, [address]);
    useEffect(() => {
        console.log('Assigned Drugs: ', assignedDrugs);
    }, [assignedDrugs]);

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
    const getDrugsList = async () => {
        console.log("Entered handleSubmit Function");
        var temp_drugs_list = [];
        await axios.get('http://localhost:3001/getDrugNamesList')
            .then((response) => response.data)
            .then(val => {
                temp_drugs_list = val;
                setDrugsList(val);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            });
        // var temp_quantityList = quantityList;
        const promises = temp_drugs_list.map((drug) => (
            axios.get(`http://localhost:3001/getDrugsListByName?drug_name=${drug}`)
                .then((response) => response.data)
                .catch((error) => {
                    if (error.response) {
                        console.log(error);
                    }
                }
                )));

        const results = await Promise.all(promises);
        const temp_quantityList = {};
        results.forEach((val, index) => {
            temp_quantityList[temp_drugs_list[index]] = val.length;
        });

        setQuantityList(temp_quantityList);
        console.log('line 48: ');
        console.log(quantityList);
    }

    const onCheckBoxChange = (e, drug) => {
        // var temp_isChecked = isChecked;
        // temp_isChecked[drug] = e.target.checked;
        // setIsChecked(temp_isChecked);
        setIsChecked(prevState => {
            return {
                ...prevState,
                [drug]: e.target.checked
            };
        });
        if (!e.target.checked) {
            delete assignedDrugsDict.drug;
        }
        console.log('line 65: ')
        console.log(isChecked);
    }

    const onQuantityProvide = (e, drug) => {
        // setGivenQuantity(prevState => {
        //     return {
        //         ...prevState,
        //         [drug]: e.target.value
        //     }
        // })
        setAssignedDrugsDict(prevState => {
            var temp_assigned_drugs = prevState;
            temp_assigned_drugs[drug] = e.target.value;
            return temp_assigned_drugs;
        })
    }

    const handleDrugSubmit = () => {
        setAssignedDrugs([]);
        Object.keys(assignedDrugsDict).map((key) => {
            setAssignedDrugs(prevState => [...prevState, [key, assignedDrugsDict[key]]])
        });
    }

    const handleOptionSelect = (name) => {
        setSelectedOption(name);
        setAddress(distributorAddress[name]);
        console.log(address);
    }
    const handleAssign = async () => {
        if (assignedDrugs == [] || address == '') {
            setStatus('Either parameter is empty')
            return;
        }
        await axios.post(`http://localhost:3001/drugDispatchToDistributer?assigned_drugs=${encodeURIComponent(JSON.stringify(assignedDrugs))}&address=${address}`)
            .then((response) => setStatus(response.data))
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            });
        
        // setIsChecked({});
        // setAssignedDrugs({});
        // setAssignedDrugsDict({});
        // setAddress('');
        // setSelectedOption(null);
        // getDrugsList();
        window.location.reload(true);
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
            <Table striped bordered hover size="sm" className='custom-table'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Drug Name</th>
                        <th>Quantity</th>
                        <th>Input Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {drugsList.map((drug, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" name={`drug-${index}`} value={drug} onChange={(e) => onCheckBoxChange(e, drug)} />
                                </td>
                                <td>{drug}</td>
                                <td>{quantityList[drug]}</td>
                                {/* <td>{console.log(quantityList) || null}</td> */}
                                <td><input type="number" id="quantity" name="quantity" min="1" max="10" step="1" disabled={!isChecked[drug]} onChange={(e) => onQuantityProvide(e, drug)} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <button onClick={handleDrugSubmit}>Submit</button>
            <h4>{address}</h4>
            {Array.isArray(assignedDrugs) && assignedDrugs.map((val, index) => (
                <div key={index}>
                    <span>{`${val[0]}: ${val[1]}`}</span>
                </div>
            ))}

            <button onClick={handleAssign}>Assign</button>
            <h4>{status}</h4>

        </div>
    );
}
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import '../App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Table1({ drugsList, address, route }) {
  const [drugIds, setDrugIds] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedDrug(null);
    setDrugIds([]);
    console.log('Selected Drug: ', selectedDrug);
  }, [drugsList]);

  const getDrugIds = async (name) => {
    console.log("Entered getDrugIds Function in table.jsx");
    if (address == undefined) {
      await axios.get(`http://localhost:3001/getDrugsListByName?drug_name=${name}`)
        .then((response) => response.data)
        .then(val => {
          // console.log("my val: ", val);
          setDrugIds(val);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
          }
        })
    }
    else {
      if(route=='verifier')
      {
        await axios.get(`http://localhost:3001/getVerifierDrugListByName?address=${address}&drug_name=${name}`)
        .then((response) => response.data)
        .then(val => {
          // console.log("my val: ", val);
          setDrugIds(val);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
          }
        })
      }
      else
      {
        await axios.get(`http://localhost:3001/getDistributerDrugListByName?address=${address}&drug_name=${name}`)
        .then((response) => response.data)
        .then(val => {
          // console.log("my val: ", val);
          setDrugIds(val);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
          }
        })
      }
    }
    setSelectedDrug(name);

  }
  const handleClick = (drug_id, drug_name) => {
    navigate(`/drugData?drug_id=${drug_id}`);
  };
  return (
    <Table striped bordered hover size="sm" className='custom-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Drug Name</th>
          <th>Drug Ids</th>
          <th>Quantity</th>
          {/* <th>Last Name</th>
          <th>Username</th> */}
        </tr>
      </thead>
      <tbody>

        {drugsList.map((drug_name, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>

                <button>{drug_name}</button>
              </td>
              <td>
                <DropdownButton className="text-right" onClick={(e) => getDrugIds(drug_name)} as={ButtonGroup} title="" id="bg-nested-dropdown">
                  {/* <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Something else</Dropdown.Item> */}
                  {drugIds.length === 0 ? <Dropdown.Item>No Data</Dropdown.Item> : drugIds.map((drug_id, ind) => {
                    return <Dropdown.Item eventKey={ind + 1} key={ind}><span onClick={() => handleClick(drug_id, drug_name)}>
                      {drug_id}
                    </span></Dropdown.Item>
                  })}
                </DropdownButton>
              </td>
              <td>
                {drug_name == selectedDrug && drugIds.length}
              </td>
            </tr>
          );
        })}
      </tbody>
      <Outlet />
    </Table>
  );
}

export default Table1;
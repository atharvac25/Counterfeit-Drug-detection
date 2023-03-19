import { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import axios from 'axios';
import DrugList from '../features/drugsList';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from '../components/navbar'
import Table1 from '../components/table';
import Form1 from '../components/form';
import Hero from '../components/hero';


export default function Home() {
  const [drugsList, setDrugsList] = useState('...Loading');
  // const [drugData, setDrugData] = useState('...Loading');
  
  useEffect(() => {
    getDrugsList();
  }, []);
  

  const getDrugsList = async () => {
      console.log("Entered handleSubmit Function");
      await axios.get('http://localhost:3001/drugsList')
      .then((response) => response.data)
      .then(val => setDrugsList(val))
      .catch((error) => {
          if (error.response) {
          console.log(error);
          }
      })
  }
  
  
    return(
      <div className="Home">
      <Navbar1 />
      {/* <button onClick={getDrugsList}>Show Drugs List</button> */}
      {drugsList==='...Loading' ? <h5>{drugsList}</h5> : <Table1 drugsList={drugsList} />}
      {/* <Button variant="primary" onClick={handleSubmit}>Drugs List</Button>
      <div>{drugData}</div>
      <DrugList drugsList={drugsList} getDrugData={getDrugData} /> */}
    </div>
    )
}
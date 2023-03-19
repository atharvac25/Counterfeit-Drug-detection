import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';


function Form1({ selectedDrug = null, addDrug }) {
  const [drugName, setDrugName] = useState(selectedDrug ? selectedDrug.name:'');
  const [drugInfo, setDrugInfo] = useState(selectedDrug ? selectedDrug.description:'');
  const [status, setStatus] = useState('Add Your Drug');

  useEffect(() => {
    if (selectedDrug) {
      setDrugName(selectedDrug.name);
      setDrugInfo(selectedDrug.description);
    } else {
      setDrugName('');
      setDrugInfo('');
    }
  }, [selectedDrug]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var result = await addDrug(drugName, drugInfo);
    setDrugName('');
    setDrugInfo('');
    setStatus(result);
    console.log('My Result: ', result);
  }

  const handleDrugNameChange = (e) => {
    setDrugName(e.target.value);
  }

  const handleDrugInfoChange = (e) => {
    setDrugInfo(e.target.value);
  }

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body className='card-bd'>
              <div className="heading-div">
                <h2 className="fw-bold mb-2 text-uppercase">Welcome, </h2>
                <h3 className=" fw-bold mb-8">Manufacturer 1</h3>
              </div>
              <div className ="mb-3 mt-4">
                <Form onSubmit={handleFormSubmit} style={{ width: '80%' }}>
                  <Form.Group className="mb-3">
                    <Form.Label>Drug Name</Form.Label>
                    <Form.Control className="input-boxes" type="text" placeholder="Enter Drug Name" value={drugName} onChange={handleDrugNameChange} />
                    <Form.Text className="text-muted">
                      Please keep it meaningful
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Drug Description</Form.Label>
                    <Form.Control className="input-boxes" type="text" placeholder="Description" value={drugInfo} onChange={handleDrugInfoChange} />
                  </Form.Group>
                  <Dropdown className='drpdwn'>
                   <Dropdown.Toggle variant="primary">
                      Select Drug Quantity: 
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                         <Dropdown.Item eventKey="1">1</Dropdown.Item>
                         <Dropdown.Item eventKey="2">2</Dropdown.Item>
                         <Dropdown.Item eventKey="3">3</Dropdown.Item>
                    </Dropdown.Menu>
                   </Dropdown>
                  <Button className="submit-btn" variant="primary" type="submit">
                    Add Drug
                  </Button>
                </Form>
              </div>
              <div className='drug-status'>
                {/* {selectedDrug && (
                  <>
                    <h5>Selected Drug: {selectedDrug.name}</h5>
                    <p>Description: {selectedDrug.description}</p>
                  </>
                )} */}
                <h5>{status}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Form1;







// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card';
// import { Container, Row, Col } from 'react-bootstrap';


// function Form1({ addDrug }) {
//     const [drugName, setDrugName] = useState('');
//     const [drugInfo, setDrugInfo] = useState('');
//     const [status, setStatus] = useState('Add Your Drug');

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         var result = await addDrug(drugName, drugInfo);
//         setDrugName('');
//         setDrugInfo('');
//         setStatus(result);
//         console.log('My Result: ', result);
//     }

//     return (
//         <Container>
//         <Row className="vh-100 d-flex justify-content-center align-items-center">
//         <Col md={8} lg={6} xs={12}>
//         <Card className="shadow">
//         <Card.Body className='card-bd'>
//         <div className="heading-div"><h2 className="fw-bold mb-2 text-uppercase">Welcome, </h2>
//                 <h3 className=" fw-bold mb-8">Manufacturer 1</h3></div>
//         <div className ="mb-3 mt-4">
//             <Form onSubmit={handleFormSubmit} style={{ width: '80%' }}>
//                 <Form.Group className="mb-3">
                
//                     <Form.Label>Drug Name</Form.Label>
//                     <Form.Control className="input-boxes" type="text" placeholder="Enter Drug Name" value={drugName} onChange={(e) => {
//                         setDrugName(e.target.value);
//                     }
//                     } />
//                     <Form.Text className="text-muted">
//                         Please keep it meaningful
//                     </Form.Text>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Drug Description</Form.Label>
//                     <Form.Control className="input-boxes"type="text" placeholder="Description" value={drugInfo} onChange={(e) => {
//                         setDrugInfo(e.target.value);
//                     }} />
//                 </Form.Group>
//                 <Button className="submit-btn" variant="primary" type="submit">
//                     Add Drug
//                 </Button>
//             </Form>
//         </div>
//         <div className='drug-status'>
//         <h5>{status}</h5></div>
//         </Card.Body>
//         </Card>
//         </Col>
//         </Row>
//         </Container>
//     );
// }

// export default Form1;






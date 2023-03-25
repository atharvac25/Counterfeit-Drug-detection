import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Form1({ addDrug, drugName, description, setDrugName, setDescription }) {
    // const [drugName, setDrugName] = useState('');
    // const [drugInfo, setDrugInfo] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('Add Your Drug');

    // useEffect(() => {
    //     setDrugName(name);
    //     setDrugInfo(description);
    // })

    




    const handleFormSubmit = async (e) => {
        e.preventDefault();
        var result = await addDrug(drugName, description, quantity);
        setDrugName('');
        setDescription('');
        setQuantity(1);
        setStatus(result);
        console.log('My Result: ', result);
    }



    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Drug Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Drug Name" value={drugName} onChange={(e) => {
                        setDrugName(e.target.value);
                    }
                    } />
                    <Form.Text className="text-muted">
                        Please keep it meaningful
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Drug Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" min="1" placeholder="Value" value={quantity} onChange={(e) => {
                        setQuantity(e.target.value);
                    }} />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Add Drug to the blockchain" />
      </Form.Group> */}
                <Button variant="primary" type="submit">
                    Add Drug
                </Button>
            </Form>
            <h5>{status}</h5>
        </div>
    );
}

export default Form1;
import Accordion from 'react-bootstrap/Accordion';
import { Table } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import "./styles.css";




function Dropdowntab() {


    const numRows = 5; 
  return (
    
    <Accordion className='accord-tab' defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Paracetomol <Badge className="badge-des" bg-light>{numRows}</Badge></Accordion.Header>
        <Accordion.Body>
        <Table>
        <thead>
            <tr>
            
            <th>Drug Address</th>
            </tr>
        </thead>
        <tbody>
        
            <tr>
                <td>123455656</td>
            </tr>
            
        </tbody>
        </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Syrup <Badge  className="badge-des" bg-light>{numRows}</Badge> </Accordion.Header>
        <Accordion.Body>
        <Table >
        <thead>
            <tr>
            
            <th>Drug Address</th>
            </tr>
        </thead>
        <tbody>
        
            <tr>
                <td>123455656</td>
            </tr>
            
        </tbody>
        </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Dropdowntab;
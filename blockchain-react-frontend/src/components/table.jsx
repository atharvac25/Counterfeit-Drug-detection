import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

function Table1({drugsList}) {
  return (
    <Container className="table-container">
    <div className="my-table">
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Drug ID</th>
          {/* <th>Last Name</th>
          <th>Username</th> */}
        </tr>
      </thead>
      <tbody>
        
        {drugsList.map((drug_id, index) => {
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <Link to={`/drugData?drug_id=${drug_id}`}>{drug_id}</Link>
                    </td>
                </tr>
            );
        })}
      </tbody>
      <Outlet />
    </Table>
    </div>
    </Container>
  );
}

export default Table1;


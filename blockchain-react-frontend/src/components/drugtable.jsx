import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Form1 from './form';
import './styles.css';
import Dropdowntab from './dropdowntab';



const drugs = [
  { name: "helllo", DrugInfo: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
  { name: "Paracetamol", DrugInfo: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
  { name: "Syrup", DrugInfo: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
  
];

const drugData = {
  "drug-1": {
    "name": "Paracetamol",
    "description": "Common side effects include headache, nausea, and dizziness"
  },
  "drug-2": {
      "name": "Hulu",
      "description": "Common side effects include headache, nausea, and dizziness"
  },
  "drug-3": {
      "name": "Syrup",
      "description": "Common side effects include headache, nausea, and dizziness"
  }
}

function DrugTable({addDrug}) {
  const [selectedDrug, setSelectedDrug] = useState(null);



  const handleClick = (drugName) => {
    setSelectedDrug(drugData[drugName]);
  }

  return (
    <>    
       <Table className='drug-tb'>
        <thead>
            <tr>
            <th>Serial Number</th>
            <th>Drug Name</th>
            </tr>
        </thead>
        <tbody>
            {drugs.map((drug, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <a href="#" onClick={() => handleClick(`drug-${index+1}`)}>
                    {drug.name}
                </a>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
      <Form1 selectedDrug={selectedDrug} addDrug={addDrug}/>
      {/* <Form1 selecteddrug={selecteddrug} addDrug={addDrug}/> */}
      
      
    </>
  );
}

export default DrugTable;






// import Table from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState } from 'react';

// const drugs = [
//   { name: "helllo", DrugInfo: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
//   { name: "Paracetamol", DrugInfo: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
//   { name: "Syrup", DrugInfo: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
  
// ];

// const drugData = {
//   "drug-1": {
//     "name": "Paracetamol",
//     "description": "Common side effects include headache, nausea, and dizziness"
//   },
//   "drug-2": {
//       "name": "Hulu",
//       "description": "Common side effects include headache, nausea, and dizziness"
//   },
//   "drug-3": {
//       "name": "Syrup",
//       "description": "Common side effects include headache, nausea, and dizziness"
//   }
// }

// function DrugTable() {
//   const [selectedDrug, setSelectedDrug] = useState(null);

//   const handleClick = (drugName) => {
//     setSelectedDrug(drugData[drugName]);
//   }

//   return (
//     <>
//     <Table striped bordered hover>
// //           <thead>
// //             <tr>
// //               <th>Drug Name</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {drugs.map((drug, index) => (
//               <tr key={index}>
//                 <td>
//                   <a href="#" onClick={() => handleClick(`drug-${index+1}`)}>
//                     {drug.name}
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <Form1 selectedDrug={selectedDrug} />

// 1       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Drug Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drugs.map((drug, index) => (
//             <tr key={index}>
//               <td>
//                 <a href="#" onClick={() => handleClick(`drug-${index+1}`)}>
//                   {drug.name}
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//1
//       <div>
//         <p>Drug Name: {selectedDrug?.name}</p>
//         <p>Description: {selectedDrug?.DrugInfo}</p>
//       </div>
//     </>
//   );
// }

// export default DrugTable;

//2
// function DrugTable() {
//     const [selectedDrug, setSelectedDrug] = useState(null);
  
//     const handleClick = (drugName) => {
//       setSelectedDrug(drugData[drugName]);
//     }
  
//     return (
//       <>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Drug Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {drugs.map((drug, index) => (
//               <tr key={index}>
//                 <td>
//                   <a href="#" onClick={() => handleClick(`drug-${index+1}`)}>
//                     {drug.name}
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <Form1 selectedDrug={selectedDrug} />
//       </>
//     );
//   }


// 3
// import Table from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';


// const drugs = [
//   { name: "helllo", description: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
//   { name: "Paracetamol", description: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },
//   { name: "Syrup", description: "sdjkfnsdjfjsdjkfjdslkjfklsdjfklsdjfkldjklfjsdlfjklsdjf." },

// ];

// function DrugTable() {
//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Drug Name</th>
//         </tr>
//       </thead>
//       <tbody>
//         {drugs.map((drug, index) => (
//           <tr key={index}>
//             <td>{drug.name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// }

// export default DrugTable;





let account;
const connectMetamask = async () => {
    console.log("Connected to Metamask");
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        document.getElementById("accountArea").innerHTML = account;
    }
}

//Connect to smart contract 
const connectContract = async() => {
const ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "info_json",
                "type": "string"
            }
        ],
        "name": "addDrug",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "drug_ids",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "_distributer",
                "type": "address"
            }
        ],
        "name": "drugDispatchToDistributer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "drug_ids",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "_verifier",
                "type": "address"
            }
        ],
        "name": "drugDispatchToVerifier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "drugs",
        "outputs": [
            {
                "internalType": "bool",
                "name": "drug_id",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "drug_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drug_info_json",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drug_status",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isSold",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "manfacturer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "distributer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "verifier",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_distributer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getDistributerDrugsAddressesList",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_verifier",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getVerifierDrugAddressesList",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ManufacturerDrugsList",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "no_dis_drugs_index",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "no_verifier_drugs_index",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
    const Address = "0x6CdD7493F4226B47Fa604560CFDC392fAf7E4C8A";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "connected to smart contract";
}
//Add drug to the Blockchain
const addDrug = async () => {
    const name = document.getElementById("name").value;
    const info = document.getElementById("info").value;
    const data = await window.contract.methods.addDrug(name, info).send({from: account});
    document.getElementById("drugAdded").innerHTML = "Drug Added Successfully";
}
// Read the Manufacturer Drug's List
// const readManufacturerDrugsList = async () => {
//     const drugIds = await window.contract.methods.ManufacturerDrugsList().call();
//     document.getElementById("drugIdList").innerHTML = drugIds.join("<br>");
// }

// Read the Manufacturer Drug's List
const readManufacturerDrugsList = async () => {
    const drugIds = await window.contract.methods.ManufacturerDrugsList().call();
    let table = document.getElementById("drugIds-table");
    for (let i = 0; i < drugIds.length; i++) {
        let row = table.insertRow();
        let serialNumberCell = row.insertCell(0);
        serialNumberCell.innerHTML = i + 1; // add serial number
        let drugIdCell = row.insertCell(1);
        drugIdCell.innerHTML = drugIds[i];
    }
}


// window.onload = function() {
//     const readManufacturerDrugsList = async () => {
//         const drugIds = await window.contract.methods.ManufacturerDrugsList().call();
//         let table = document.getElementById("drugIds-table");
//         for (let i = 0; i < drugIds.length; i++) {
//             let row = table.insertRow();
//             let serialNumberCell = row.insertCell(0);
//             serialNumberCell.innerHTML = i + 1; // add serial number
//             let drugIdCell = row.insertCell(1);
//             drugIdCell.innerHTML = drugIds[i];
//         }
//     }
// }


// Read the Specific Drug's Data
//1
// const drugData = async () => {
//     const drugAddr = document.getElementById("drugAddr").value;
//     console.log(drugAddr);
//     const data1 = await window.contract.methods.drugs(drugAddr).call();
//     console.log(data1);
//     document.getElementById("drugData").innerHTML = JSON.stringify(data1);
// }


const drugData = async () => {
    const drugAddr = document.getElementById("drugAddr").value;
    console.log(drugAddr);
    const data1 = await window.contract.methods.drugs(drugAddr).call();
    console.log(data1);
    document.getElementById("drugData").innerHTML = JSON.stringify(data1);
}

// 3
// const drugData = async () => {
//     const drugAddr = document.getElementById("drugAddr").value;
//     console.log(drugAddr);
//     const data1 = await window.contract.methods.drugs(drugAddr).call();
//     console.log(data1);
//     document.getElementById("drugData").innerHTML = `
//         <p><strong>Drug Name:</strong> ${data1.drug_name}</p>
//         <p><strong>Drug Info:</strong> ${data1.drug_info_json}</p>
//     `;
// }





// // displaying block addresses
// const displayDrugIds = async () => {
//     const drugIds = await window.contract.methods.ManufacturerDrugsList().call();
//     let table = document.getElementById("drugIds-table");
//     for (let i = 0; i < drugIds.length; i++) {
//         let row = table.insertRow();
//         let cell = row.insertCell(0);
//         cell.innerHTML = drugIds[i];
//     }
// }
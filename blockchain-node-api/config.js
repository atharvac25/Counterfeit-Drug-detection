const CONTRACT_ADDRESS = '0xbaBABb91fdb2f704d10A3a301413aEd136779a8c';

const CONTRACT_ABI = [
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
]

module.exports = {
    CONTRACT_ADDRESS,
    CONTRACT_ABI
}
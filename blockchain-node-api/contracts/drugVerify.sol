// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DrugVerify {
    struct drug {
        bool drug_id;
        string drug_name;
        string drug_info_json;
        string drug_status;
        // string drug_current_location;
        bool isSold;
        address manfacturer;
        address distributer;
        address verifier;
    }
    struct assignDrug {
        string drug_name;
        uint quantity;
    }

    struct distributer {
        string name;
        address distributer_address;
        bool verified;
    }

    struct verifier {
        string name;
        address verifier_address;
        bool verified;
    }
    
    //[1,3, 4] , [5, 8, 11]-> [[1, 3, 4],[5, 8, 11]]
    mapping(address => address[]) manufacturer_drugs;  // List of manufacturer's drug
    mapping(address => mapping(uint => address[])) distributer_drugs;  // List of distributer's drug
    mapping(address => mapping(uint => address[])) verifier_drugs;  // List of verifier's drug
    mapping(address => mapping(string => string)) timestamp;
    mapping(address => drug) public drugs;  // List of drugs deployed into blockchain
    mapping(address => uint) public no_dis_drugs_index;
    mapping(address => uint)public no_verifier_drugs_index;
    mapping(string => address[]) drugs_by_name;  // Search all drug ids by name of drug
    mapping(string => string) public description_by_name;   //Search for the description of drug
    mapping(address => mapping(string => address[])) distributer_drugs_by_name;   //Search list of drugs assigned to distributer by name of drug for a particular distributer
    string[] drug_names; // List of all drug names for manufacturer
    mapping(address => string[]) public distributer_drug_names;  // Search for a list of all drug names for a particular distributer
    string[] not_assigned_drugs_result;
    distributer[] distributer_list;
    mapping(address => mapping(string => address[])) verifier_drugs_by_name;
    mapping(address => string[]) public verifier_drug_names;
    verifier[] verifier_list;
    // uint public no_dis_drugs_index = 0;
    // uint public no_verifier_drugs_index = 0;

    // Manufacturer --> New Drug addition into blockchain
    function addDrug(string memory name, string memory info_json, uint quantity) public {
        for(uint i=0; i<quantity; i++) {
            address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender,block.timestamp, i))));
        
            drugs[uniqueId].drug_id = true;
            drugs[uniqueId].drug_name = name;
            drugs[uniqueId].drug_info_json = info_json;
            drugs[uniqueId].drug_status = "Manufactured";
            drugs[uniqueId].isSold = false;
            drugs[uniqueId].manfacturer = msg.sender;
            drugs[uniqueId].distributer = 0x0000000000000000000000000000000000000000;
            drugs[uniqueId].verifier = 0x0000000000000000000000000000000000000000;
            manufacturer_drugs[msg.sender].push(uniqueId);
            drugs_by_name[name].push(uniqueId);
        }
        description_by_name[name] = info_json;
        bool check = false;
        for(uint i=0; i<drug_names.length; i++)
        {
            if(keccak256(abi.encodePacked(drug_names[i])) == keccak256(abi.encodePacked(name)))
            {
                check = true;
                break;
            }
        }
        if(check==false)
        {
            drug_names.push(name);
        }

    }

    // Returns drug list of manufacturer for a particular drug(msg.sender)
    function getDrugsListByName(string memory name) public view returns (address[] memory) {
        return drugs_by_name[name];
    }
    // Get Drug Description by drug name
    function getDrugDescriptionByName(string memory name) public view returns(string memory) {
        return description_by_name[name];
    }

    // get all manufacturer drugs which has been added into the blockchain
    function getAllDrugsAdded() public view returns (address[] memory) {
        return manufacturer_drugs[msg.sender];
    }
    
    // Get list of drug names
    function getDrugNamesList() public view returns(string[] memory) {
        return drug_names;
    }

    //Add distributer
    function addDistributer(string memory name, address _distributer)public {
        distributer_list.push(distributer({
            name: name,
            distributer_address: _distributer,
            verified: true
        }));
    }
    // Get distributers list
    function getDistributerList() public view returns(distributer[] memory) {
        return distributer_list;
    }
    // Assign drug ids to a particular distributer
    function drugDispatchToDistributer(assignDrug[] memory assigned_drugs, address _distributer) public returns (string[] memory) {
        // for(uint i=0; i<drug_ids.length; i++)
        // {
        //     drugs[drug_ids[i]].drug_status = "Dispatched to distributer";
        //     drugs[drug_ids[i]].distributer = _distributer;
        //     // distributer_drugs[_distributer].push(drug_ids[i]);
        // }
        // distributer_drugs[_distributer][no_dis_drugs_index[_distributer]] = drug_ids;
        // no_dis_drugs_index[_distributer]+=1;
        delete not_assigned_drugs_result;
        for(uint i=0; i<assigned_drugs.length; i++)
        {
            if(drugs_by_name[assigned_drugs[i].drug_name].length>=assigned_drugs[i].quantity) {
                for(uint j=0; j<assigned_drugs[i].quantity; j++)
                {
                    distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name].push(drugs_by_name[assigned_drugs[i].drug_name][j]);
                    drugs[drugs_by_name[assigned_drugs[i].drug_name][j]].drug_status = "Dispatched to distributer";
                    drugs[drugs_by_name[assigned_drugs[i].drug_name][j]].distributer = _distributer;
                    
                }
                uint k = 0;
                for(uint j=assigned_drugs[i].quantity; j<drugs_by_name[assigned_drugs[i].drug_name].length; j++)
                {
                    drugs_by_name[assigned_drugs[i].drug_name][k] = drugs_by_name[assigned_drugs[i].drug_name][j];
                    k++;
                }
                for(uint j=0; j<assigned_drugs[i].quantity; j++)
                {
                    drugs_by_name[assigned_drugs[i].drug_name].pop();
                }
                bool check = false;
                for(uint j=0; j<distributer_drug_names[_distributer].length; j++)
                {
                    if(keccak256(abi.encodePacked(distributer_drug_names[_distributer][j])) == keccak256(abi.encodePacked(assigned_drugs[i].drug_name)))
                    {
                        check = true;
                        break;
                    }
                }
                if(check==false)
                {
                    distributer_drug_names[_distributer].push(assigned_drugs[i].drug_name);
                }
            }
            else
            {
                not_assigned_drugs_result.push(string(abi.encodePacked(assigned_drugs[i].drug_name, " is not assigned to the distributer as stock is less than the quantity assigned")));
            }
        }
        return not_assigned_drugs_result;
    }

    // Get particular distributer drug names list
    function getDistributerDrugNames(address _distributer) public view returns(string[] memory) {
        return distributer_drug_names[_distributer];
    }

    // Get drug list by name for a particular distributer
    function getDistributerDrugListByName(address _distributer, string memory name) public view returns(address[] memory) {
        return distributer_drugs_by_name[_distributer][name];
    }


    //Add verifier
    function addVerifier(string memory name, address _verifier) public {
        verifier_list.push(verifier({
            name: name,
            verifier_address: _verifier,
            verified: true
        }));
    }

    // Get verifiers list
    function getVerifierList() public view returns(verifier[] memory) {
        return verifier_list;
    }
    //Assign Drug to verifier
    function assignDrugToVerifier(assignDrug[] memory assigned_drugs, address _distributer, address _verifier) public returns(string[] memory) {
        
        delete not_assigned_drugs_result;
        for(uint i=0; i<assigned_drugs.length; i++)
        {
            if(distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name].length >= assigned_drugs[i].quantity)
            {
                for(uint j=0; j<assigned_drugs[i].quantity; j++)
                {
                    verifier_drugs_by_name[_verifier][assigned_drugs[i].drug_name].push(distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name][j]);
                    drugs[distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name][j]].drug_status = "Dispatched to Verifier";
                    drugs[distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name][j]].verifier = _verifier;
                }
                uint k = 0;
                for(uint j=assigned_drugs[i].quantity; j<distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name].length; j++)
                {
                    distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name][k] = distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name][j];
                    k++;
                }
                for(uint j=0; j<assigned_drugs[i].quantity; j++)
                {
                    distributer_drugs_by_name[_distributer][assigned_drugs[i].drug_name].pop();
                }
                bool check = false;
                for(uint j=0; j<verifier_drug_names[_verifier].length; j++)
                {
                    if(keccak256(abi.encodePacked(verifier_drug_names[_verifier][j])) == keccak256(abi.encodePacked(assigned_drugs[i].drug_name)))
                    {
                        check = true;
                        break;
                    }
                }
                if(check==false)
                {
                    verifier_drug_names[_verifier].push(assigned_drugs[i].drug_name);
                }
            }
            else
            {
                not_assigned_drugs_result.push(string(abi.encodePacked(assigned_drugs[i].drug_name, " is not assigned to the distributer as stock is less than the quantity assigned")));
            }

        }
        return not_assigned_drugs_result;
    }

    // Get particular verifier drug names list
    function getVerifierDrugNames(address _verifier) public view returns(string[] memory) {
        return verifier_drug_names[_verifier];
    }

    // Get drug list by name for a particular verifier
    function getVerifierDrugListByName(address _verifier, string memory name) public view returns(address[] memory) {
        return verifier_drugs_by_name[_verifier][name];
    }

    // function getDistributerDrugsList(address _distributer, uint index) public view returns(drug[] memory) {
    //     drug[] memory tempDrugs;
    //     uint inc = 0;
    //     for(uint i=0; i<distributer_drugs[_distributer][index].length; i++)
    //     {
    //         tempDrugs[inc] = drugs[distributer_drugs[_distributer][index][i]];
    //         inc++;
    //     }
    //     return tempDrugs;
    // }


    // function drugDispatchToVerifier(address[] memory drug_ids, address _verifier) public {
    //     for(uint i=0; i<drug_ids.length; i++)
    //     {
    //         drugs[drug_ids[i]].drug_status = "Dispatched to verifer";
    //         drugs[drug_ids[i]].distributer = _verifier;
    //         // verifier_drugs[_verifier].push(drug_ids[i]);
    //     }
    //     verifier_drugs[_verifier][no_verifier_drugs_index[_verifier]] = drug_ids;
    //     no_verifier_drugs_index[_verifier]+=1;
    // }
    // function getVerifierDrugAddressesList(address _verifier, uint index) public view returns(address[] memory) {
    //     return verifier_drugs[_verifier][index];
    // }
}
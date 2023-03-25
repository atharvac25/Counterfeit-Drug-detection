function routes(app, db, accounts, contactList) {
    app.get('/drugsList', async (request, response) => {
        const drugsList = await contactList.methods.getAllDrugsAdded().call({from: accounts[0], gas: 6721975});
        // console.log(drugsList);
    response.json(drugsList);
    });

    app.post('/addDrug', async (request, response) => {
        console.log(request.query.drug_name, request.query.drug_info, request.query.quantity);
        if(request.query.drug_name!=undefined) {
            await contactList.methods.addDrug(request.query.drug_name, request.query.drug_info, request.query.quantity).send({from: accounts[0], gas: 6721975});
            response.json('drug added')
        }
        else {
            response.json('Drug is not added as drug name is not defined');
        }
    });
    app.get('/drugsData', async (request, response) => {
        const drugData = await contactList.methods.drugs(request.query.drug_id).call();
        response.json(drugData);
    });
    app.get('/getDrugsListByName', async (request, response) => {
        const res = await contactList.methods.getDrugsListByName(request.query.drug_name).call();
        console.log("getDrugsListByName: ", res);
        response.json(res);
    });

    app.get('/getDrugNamesList', async (request, response) => {
        const res = await contactList.methods.getDrugNamesList().call({from: accounts[0]});
        response.json(res);
    });
    app.get('/descriptionByName', async (request, response) => {
        const res = await contactList.methods.description_by_name(request.query.drug_name).call();
        // console.log("getDrugsListByName: ", res);
        response.json(res);
    });
    app.post('/addDistributer', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            const res = await contactList.methods.addDistributer(request.query.name, request.query.address).send({from: accounts[0], gas: 6721975});
            response.json(`${request.query.name} is added as distributer`);
        }
    });
    app.get('/getDistributerList', async (request, response) => {
        const res = await contactList.methods.getDistributerList().call({from: accounts[0]});
        response.json(res);
    });

    app.post('/drugDispatchToDistributer', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            var assignedDrugs = JSON.parse(request.query.assigned_drugs);
            var result = [];
            var drug = {}
            console.log(assignedDrugs);
            assignedDrugs.map((val) => {
                var drug = {}
                drug['drug_name'] = val[0];
                drug['quantity'] = parseInt(val[1]);
                result.push(drug);
            });
            console.log(result);
            console.log(request.query.address);
            const res = await contactList.methods.drugDispatchToDistributer(result, request.query.address).send({from: accounts[0], gas: 6721975});
            response.json(`Drugs added to the distributor`);
        }
    });

    app.get('/getDistributerDrugNames', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            const res = await contactList.methods.getDistributerDrugNames(request.query.address).call({from: accounts[0]});
            response.json(res);
        }
    });
    app.get('/getDistributerDrugListByName', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            const res = await contactList.methods.getDistributerDrugListByName(request.query.address, request.query.drug_name).call({from: accounts[0]});
            console.log("getDrugsListByName: ", res);
            response.json(res);
        }
    });

    app.post('/addVerifier', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            const res = await contactList.methods.addVerifier(request.query.name, request.query.address).send({from: accounts[0], gas: 6721975});
            response.json(`${request.query.name} is added as verifier`);
        }
    });

    app.get('/getVerifierList', async (request, response) => {
        const res = await contactList.methods.getVerifierList().call({from: accounts[0]});
        console.log('line 130: ', res);
        response.json(res);
    });

    app.post('/assignDrugToVerifier', async (request, response) => {
        if(typeof request.query.verifier_address !== 'string')
        {
            response.json("Verifier Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.verifier_address)))
        {
            response.json("Verifier String is not a valid address");
        }
        else if(typeof request.query.distributor_address !== 'string')
        {
            response.json("Distributer Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.distributor_address)))
        {
            response.json("Distributer String is not a valid address");
        }
        else
        {
            var assignedDrugs = JSON.parse(request.query.assigned_drugs);
            if(assignedDrugs.length==0){
                response.json('Assigned Drugs is empty');
                return;
            }
            var result = [];
            var drug = {}
            console.log(assignedDrugs);
            assignedDrugs.map((val) => {
                var drug = {}
                drug['drug_name'] = val[0];
                drug['quantity'] = parseInt(val[1]);
                result.push(drug);
            });
            console.log(result);
            console.log(request.query.verifier_address);
            const res = await contactList.methods.assignDrugToVerifier(result, request.query.distributor_address, request.query.verifier_address).send({from: accounts[0], gas: 6721975});
            response.json(`Drugs assigned`);
        }
    });

    app.get('/getVerifierDrugNames', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            const res = await contactList.methods.getVerifierDrugNames(request.query.address).call({from: accounts[0]});
            response.json(res);
        }
    });

    app.get('/getVerifierDrugListByName', async (request, response) => {
        if(typeof request.query.address !== 'string')
        {
            response.json("Address passed is not a string");
        }
        else if(!(/^0x[0-9a-fA-F]{40}$/.test(request.query.address)))
        {
            response.json("String is not a valid address");
        }
        else
        {
            const res = await contactList.methods.getVerifierDrugListByName(request.query.address, request.query.drug_name).call({from: accounts[0]});
            console.log("getDrugsListByName: ", res);
            response.json(res);
        }
    });

}

module.exports = routes;
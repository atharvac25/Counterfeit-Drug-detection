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

}

module.exports = routes;
function routes(app, db, accounts, contactList) {
    // app.get('/drugsList', async (request, response) => {
    //     const drugsList = await contactList.methods.ManufacturerDrugsList().call({from: accounts[0]});
    //     // console.log(drugsList);
    // response.json(drugsList);
    // });

    app.post('/addDrug', async (request, response) => {
        console.log(request.query.drug_name, request.query.drug_info);
        if(request.query.drug_name!=undefined) {
            await contactList.methods.addDrug(request.query.drug_name, request.query.drug_info, request.query.quantity).send({from: accounts[0], gas: 300000});
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
        const res = await contactList.methods.getDrugsListByName(request.query.drug_name).send({from:accounts[0], gas: 300000});
        response.json(res);
    });

    app.get('/getDrugNamesList', async (request, response) => {
        const res = await contactList.methods.getDrugNamesList().call({from: accounts[0]});
        response.json(res);
    });
}

module.exports = routes;
function routes(app, db, accounts, contactList) {
    app.get('/drugsList', async (request, response) => {
        const drugsList = await contactList.methods.ManufacturerDrugsList().call({from: accounts[0]});
        console.log(drugsList);
    response.json(drugsList);
    });

    app.get('/addDrug', async (request, response) => {
        console.log(request.query.drug_name, request.query.drug_info);
        if(request.query.drug_name!=undefined) {
            await contactList.methods.addDrug(request.query.drug_name, request.query.drug_info).send({from: accounts[0], gas: 300000});
            response.json('drug added')
        }
        else {
            response.json('Drug is not added as drug name is not defined');
        }
    });
    app.get('/drugsData', async (request, response) => {
        const drugData = await contactList.methods.drugs(request.query.drug_id).call();
        response.json(drugData);
    })
}

module.exports = routes;
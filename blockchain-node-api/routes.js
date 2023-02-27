function routes(app, db, accounts, contactList) {
    app.get('/drugsList', async (request, response) => {
        const drugsList = await contactList.methods.ManufacturerDrugsList().call({from: accounts[0]});
        console.log(drugsList);
    response.json(drugsList);
    });

    app.get('/addDrug', async (request, response) => {
        await contactList.methods.addDrug('Dolo', '{color: white, type: tablet}').send({from: accounts[0], gas: 300000});
        response.json('drug added')
    });
    app.get('/drugsData', async (request, response) => {
        const drugData = await contactList.methods.drugs('0x5b7dc7FBd3ffD671764DC95dca9e652B65a7e94b').call();
        response.json(drugData);
    })
}

module.exports = routes;
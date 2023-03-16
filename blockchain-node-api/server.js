const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/drugVerify.json');
const CONTRACT_ABI = require('./config');
const CONTRACT_ADDRESS = require('./config');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Cluster45580:Slh7a3B5eVdR@cluster45580.ajcl2rw.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
        var web3 = new Web3(web3.currentProvider); 
} else {
        var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
}

mongodb.connect('mongodb+srv://cluster45580.ajcl2rw.mongodb.net',
        {
                useUnifiedTopology: true,
        }, async (err, client) => {
        const db =client.db('Cluster45580');
        const accounts = await web3.eth.getAccounts();
        const contactList = new web3.eth.Contract(CONTRACT_ABI.CONTRACT_ABI, CONTRACT_ADDRESS.CONTRACT_ADDRESS);

        routes(app, db, accounts, contactList);
        app.listen(process.env.PORT || 3001, () => {
                console.log('listening on port '+ (process.env.PORT || 'http://localhost:3001/'));
        });
});

// const accounts = await web3.eth.getAccounts();
// const contactList = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
// routes(app, accounts, contactList);
// app.listen(process.env.PORT || 3001, () => {
//     console.log('listening on port '+ (process.env.PORT || 3001));
// });
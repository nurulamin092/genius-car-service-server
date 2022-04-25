const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// database connection

const uri = "mongodb+srv://dbuser1:QYh9J5QmVJzcyHhz@cluster0.qo3jo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("geniusCar").collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const cursor = serviceCollection.findOne(query)
            res.send(cursor);
        })
    }
    finally {

    }
}
run().catch(console.dir());

/* app.get('/user', (req, res) => {
    res.send('Running Genius Service ')
}); */

app.listen(port, () => {
    console.log('listing to prot', port);
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const app = express();
const port = process.env.PORT || 5022;
const cors = require("cors");
require('dotenv').config()


//<<<<<---------------------------------------- middlewares ----------------------------------------->>>>>
app.use(express.json());
app.use(cors());
//<<<<<---------------------------------------- middlewares ----------------------------------------->>>>>



//<<<<<---------------------------------------- MongoDB ----------------------------------------->>>>>


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frg7rqf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        // collections===================>>>>>>
        const userCollection = client.db('AssTempDB').collection('userCollection')



        // create user API =============>>>>>>>
        app.post('/user', async (req, res) => {
            const data = req.body;
            const result = await userCollection.insertOne(data);
            res.send(result);
        })

        // get user API ================>>>>>>>
        app.get('/user', async (req, res) => {
            const result = await userCollection.find({}).toArray();
            res.send(result);
        })

        // get one user API ===========>>>>>>>
        app.get('/user/:sid', async (req, res) => {
            const id = req.params.sid;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // update user API ===========>>>>>>>
        app.put('/user/:sid', async (req, res) => {
            const id = req.params.sid;
            const data = req.body;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    state: data.state,
                    city: data.city,
                    gender: data.gender,
                    hereFrom: data.hereFrom
                }
            }
            const result = await userCollection.updateOne(query, updatedDoc);
            res.send(result);
        })

        // delete user API ===========>>>>>>>
        app.delete('/user/:sid', async (req, res) => {
            const id = req.params.sid;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        // add user from dashboard ===>>>>>>>
        app.post('/add', async (req, res) => {
            const data = req.body;
            const filter = { email: data.email };
            const isExist = await userCollection.findOne(filter);
            if (isExist) {
                res.send({ message: "AA" })
            } else {
                const result = await userCollection.insertOne(data);
                res.send(result);
            }
        })


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






//<<<<<---------------------------------------- MongoDB ----------------------------------------->>>>>












app.get('/', (req, res) => {
    res.send("Server is RuNNinG......!!!");
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
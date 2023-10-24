const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

// cinePulse
// E8agQbIYW0uAgQ5s




const uri = "mongodb+srv://cinePulse:E8agQbIYW0uAgQ5s@cluster0.yfphnhu.mongodb.net/?retryWrites=true&w=majority";

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

    const brandCollection = client.db('cine-pulse').collection('brand-products');

    app.get('/brand', async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/brand/:brandTitle', async (req,res) => {
     const brandTitle = req.params.brandTitle;
     const query = {brandTitle:brandTitle}
     const items = await brandCollection.find(query).toArray();
     res.send(items)
    })

    app.get('/brand/:id', async (req,res) => {
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)};
      const result = await brandCollection.findOne(filter);
      res.send(result)
    })
       

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req,res) => {
   res.send("server is running")
})

app.listen(port, () => {
   console.log(`server is running at ${port}`)
})
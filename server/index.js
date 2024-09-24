const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = 3000
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fwhk0w8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASS:', process.env.DB_PASS);
async function run() {
  try {
    const productCollection = client.db("nurseryDB").collection("Products"); 
    const categoryCollection = client.db("nurseryDB").collection("Categories"); 
       
    // get all categories data from db
       app.get("/categories",async (req, res) => {
        const result = await categoryCollection.find().toArray();
        res.send(result);
    })
    
    // get all products data from db
    app.get("/products/category/:category",async (req, res) => {
      const category = req.params.category;
        const result = await productCollection.find({category}).toArray();
        res.send(result);
    })

    app.get('/products/:id', async (req, res) => {
      const productId = req.params.id;
      const query = { _id: new ObjectId(id) };
      const product = await productCollection.findOne(query)
      if (!product) {
        return res.status(404).message({ message: 'Product not found' });
      }
      res.send(product);
    });
    
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello From Nursery!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
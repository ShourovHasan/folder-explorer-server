import express, { Application, Response, Request, query } from 'express';
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port: number | string = process.env.PORT || 5000;
require('dotenv').config();

const app: Application = express();

// Middleware 
app.use(cors());
app.use(express.json());

// for mongodb connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qwlqnnv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const foldersCollection = client.db("folder-explorer-ostad").collection("folder-management-data");

        // for getting all objects 
        app.get('/folders', async (req: Request, res: Response) => {
            const query = {};
            const rootFolder = await foldersCollection.find(query).sort('_id', -1).toArray();
            res.send(rootFolder);
        });

        // for create a folder 
        app.post('/createFolder', async (req, res) => {
            const folder = req.body;
            const result = await foldersCollection.insertOne(folder);
            res.send(result);
        })

        //for delete a folder
        app.delete('/deleteFolder/:id', async (req: Request, res: Response) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await foldersCollection.deleteOne(filter);
            res.send(result);
        });
    }
    catch(error){
        console.log(error);
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', async (req: Request, res: Response) => {
    res.send('Ostad-folder-explorer server is running');
})

//using for port number showing
app.listen(port, () => {
    console.log(`Ostad-folder-explorer is running on port ${port}`)
})

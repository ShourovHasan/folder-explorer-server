"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = (0, express_1.default)();
// Middleware 
app.use(cors());
app.use(express_1.default.json());
// for mongodb connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qwlqnnv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foldersCollection = client.db("folder-explorer-ostad").collection("folder-management-data");
        // for getting all objects 
        app.get('/folders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const query = {};
            const rootFolder = yield foldersCollection.find(query).sort('_id', -1).toArray();
            res.send(rootFolder);
        }));
        // for create a folder 
        app.post('/createFolder', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const folder = req.body;
            const result = yield foldersCollection.insertOne(folder);
            res.send(result);
        }));
        //for delete a folder
        app.delete('/deleteFolder/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = yield foldersCollection.deleteOne(filter);
            res.send(result);
        }));
    }
    catch (error) {
        console.log(error);
    }
    finally {
    }
});
run().catch(console.dir);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Ostad-folder-explorer server is running');
}));
//using for port number showing
app.listen(port, () => {
    console.log(`Ostad-folder-explorer is running on port ${port}`);
});

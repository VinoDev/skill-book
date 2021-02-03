import express from 'express';
import connectDB from './db.js';

const app = express();
const port = process.env.port || 5000;
connectDB();

app.get('/', (req, res) => res.send('API Running'));

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
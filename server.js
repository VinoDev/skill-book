import express from 'express';
import connectDB from './db.js';
import { auth, post, profile, user } from './routes/api/index.js';

const app = express();
const port = process.env.port || 5000;
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/profile', profile);
app.use('/api/user', user);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
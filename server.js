import express from 'express';
import connectDB from './db.js';
import { auth, posts, profile, users } from './routes/api/index.js';

const app = express();
const port = process.env.port || 5000;
connectDB();

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
import express from 'express';
import path from 'path'; 
import connectDB from './db.js';
import cors from 'cors';
import { auth, post, profile, user } from './routes/api/index.js';

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
connectDB();

app.use(express.json());

app.use(cors());

app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/profile', profile);
app.use('/api/user', user);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
//remove later

import connectToMongo from "./db.js";
import express from "express";
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';


connectToMongo();
const app = express()
const port = 5000
app.use(express.json());
app.use(cors());
// AVAILABLE ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World this is me !')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


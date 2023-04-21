import connectToMongo from "./db.js";
import express from "express";
import authRoutes from './routes/auth.js';



connectToMongo();
const app = express()
const port = 5000
app.use(express.json());

// AVAILABLE ROUTES
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World this is me !')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);


// check if the connection in mognodb is successful
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

}).catch((err) => { 
    console.log(err) 
    console.log('Connection failed');
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
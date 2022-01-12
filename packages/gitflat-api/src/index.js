require('dotenv').config({ path: `${__dirname}/../.env`});

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const gitFlatRouter = require('./routes/gitflat');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/gitflat', gitFlatRouter);
app.listen(port, ()=>{
    console.log(`server initialized on port ${port}`);
})
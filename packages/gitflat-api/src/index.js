const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const gitFlatRouter = require('./routes/gitflat');

app.use('/gitflat', gitFlatRouter);
app.listen(port, ()=>{
    console.log(`server initialized on port ${port}`);
})
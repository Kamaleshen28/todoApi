const express = require('express');
const app = express();
const port = 5000;

const router = require('./routes/tasks')

app.use(express.json())
app.use('/tasks', router)

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
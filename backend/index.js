require("./db")
const express = require("express");
const cors = require("cors");
const app = express()
const port = 4000

app.use(cors());

// this is middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to my application")
})

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
})
const express = require('express');
const app = express()

app.get('/', (req, res) => {
    console.log("hello")
    res.json({response: "hello"})
} )

app.listen(3000, ()=> console.log("Listening on port 3000"))

const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET notes from json
app.get('/api/notes', (req, res) =>
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        console.log(data);
        res.status(200).json(JSON.parse(data))
    })
);

// Create new note
app.post('/api/notes', (req, res) =>
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        console.log(data);
        const dataObj = JSON.parse(data)
        dataObj.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(dataObj), (data) => {
            res.status(200).json(JSON.parse(data))
        })
    })
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
const express = require("express");
const path = require('path');
const fs = require('fs');

const app = express();
const jsonParser = express.json();

const appPath = path.join(__dirname, 'dist/vampshop');

app.use(express.static(appPath));

// CORS
app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

// Data getter from data.json
const getData = () => {
    const rawData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    return JSON.parse(rawData);
}

// Data endpoint for item by id
app.get('/data/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    const data = getData().dataList;
    const item = data.find(item => item.id == id);
    
    if (item) {
        res.json(item);
    } 
    else {
        res.status(404).send({ error: 'Product not found' });
    }
});

// Data endpoint for multiple items
app.get('/data', jsonParser, (req, res) => {
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    const data = getData().dataList;

    if (ids.length > 0) {
        const filteredItems = data.filter(product => ids.includes(product.id));
        res.json(filteredItems);
    }
    else {
        res.json(getData());
    }
});

// Angular dist startup
app.get('*', (_, res) => {
    res.sendFile(path.join(appPath, 'index.html'));
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server has been started at http://localhost:${PORT}`);
});
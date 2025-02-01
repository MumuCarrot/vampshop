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
const getData = (dataName) => {
    const rawData = fs.readFileSync(path.join(__dirname, dataName), 'utf8');
    return JSON.parse(rawData);
}

// Data endpoint for item by id
app.get('/data/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    const data = getData('data.json').dataList;
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
    const data = getData('data.json').dataList;

    if (ids.length > 0) {
        const filteredItems = data.filter(product => ids.includes(product.id));
        res.json(filteredItems);
    }
    else {
        res.json(getData('data.json'));
    }
});

// Data endpoint for day deal
app.get('/daydeal', jsonParser, (req, res) => {
    const ids = ["1", "2", "3"];
    const data = getData('data.json').dataList;

    const filteredItems = data.filter(product => ids.includes(product.id));
    res.json(filteredItems);
});

// Data endpoint for you should see
app.get('/youshouldsee', jsonParser, (req, res) => {
    const ids = ["1", "2", "3"];
    const data = getData('data.json').dataList;

    const filteredItems = data.filter(product => ids.includes(product.id));
    res.json(filteredItems);
});

// Data endpoint to check if the user exists
app.get('/user/exist', jsonParser, (req, res) => {
    const data = getData('userlist.json').userList;
    if (data.find(user => user.email === req.query.data) || 
        data.find(user => user.login === req.query.data) || 
        data.find(user => user.phone === req.query.data)) {
        res.json({ exist: true });
    }
    else {
        res.json({ exist: false });
    }
});

// Data endpoint to add a new user, user already exists check
app.post('/user/get', jsonParser, (req, res) => {
    const data = getData('userlist.json').userList;
    const user = data.find(user => user.login === req.body.data && user.password === req.body.password) ?? 
                 data.find(user => user.email === req.body.data && user.password === req.body.password) ??
                 data.find(user => user.phone === req.body.data && user.password === req.body.password);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send({ error: 'User not found' });
    }
});

// Data endpoint to add a new user
app.post('/user/create', jsonParser, (req, res) => {
    const data = getData('userlist.json');
    const userList = data.userList;

    if (data.find(user => user.login == req.body.user.login)) {
        res.status(409).send({ error: 'User already exists' });
    }
    else {
        const newUser = {
            id: userList.length + 1,
            login: req.body.user.login,
            name: req.body.user.name,
            email: req.body.user.email,
            phone: req.body.user.phone,
            password: req.body.user.password
        };
        userList.push(newUser);
        data.userList = userList;
        fs.writeFileSync(path.join(__dirname, 'userlist.json'), JSON.stringify(data, null, 2));
        res.json(newUser);
    }
});

// Data endpoint to update user data
app.post('/user/update', jsonParser, (req, res) => {
    const data = getData('userlist.json');
    const userList = data.userList;

    const user = userList.find(user => user.id == req.body.id);
    if (user) {
        user.email = req.body.email;
        user.phone = req.body.phone;
        fs.writeFileSync(path.join(__dirname, 'userlist.json'), JSON.stringify(data, null, 2));
        res.json(user);
    }
    else {
        res.status(404).send({ error: 'User not found' });
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
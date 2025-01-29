const express = require("express");
const path = require('path');

const app = express();

const appPath = path.join(__dirname, 'dist/vampshop');

app.use(express.static(appPath));

app.get('*', (_, res) => {
    res.sendFile(path.join(appPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server has been started at http://localhost:${PORT}`);
});
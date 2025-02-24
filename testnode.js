const express = require('express');
const app = express();
const port = 3000;

// Setup
app.use(express.json());
app.use(express.static('public'));

// Store items in memory
let items = [];

// Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Add new item
app.post('/api/items', (req, res) => {
    const item = {
        id: Date.now(),
        title: req.body.title,
        price: req.body.price
    };
    items.push(item);
    res.json(item);
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
    items = items.filter(item => item.id !== parseInt(req.params.id));
    res.sendStatus(200);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/cartItems.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/cartItems.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/cartItems.json');
});
router.delete('/:id', (req, res) => {
    console.log(req, res);
    handler(req, res, 'delete', 'server/db/cartItems.json');
});

module.exports = router;
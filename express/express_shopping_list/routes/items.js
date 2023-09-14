const express = require("express");
const Item = require('../middleware')
const router = express.Router();

router.get('', (req, res, next) => {
    try {
        return res.json({ items: Item.listItems() });
    }
    catch (error) {
        return next(error)
    }
})

router.post('', (req, res, next) => {
    try {
        let newItem = {
            name: req.body.name,
            price: req.body.price
        };
        return res.status(201).json({ added: newItem });
    }
    catch (error) {
        return next(error);
    }
})

router.get('/:name', (req, res, next) => {
    try {
        let foundItem = Item.findItem(req.params.name);
        return res.json({ item: foundItem });
    }
    catch (error) {
        return next(error);
    }

})

router.patch('/:name', (req, res, next) => {
    try {
        let updatedItem = Item.updateItem(
            req.params.name,
            req.body
        );
        return res.json({ item: updatedItem });
    }
    catch (error) {
        return next(error);
    }
})

router.delete('/:name', (req, res, next) => {
    try {
        Item.removeItem(req.params.name);
        return res.json({ message: 'Deleted' });
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;

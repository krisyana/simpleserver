let Item = [];

class ItemController {
    static getAll(req, res) {
        try {
            res.status(200).json(Item);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
            const { Item } = require('../app');
        }
    }
    static getOne(req, res) {
        const { id } = req.params;
        try {
            res.status(200).json(Item.find((item) => item.id === parseInt(id)));
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
            const { Item } = require('../app');
        }
    }

    static create(req, res) {
        try {
            const { name, price, description, image } = req.body;
            const newItem = {
                id: Item.length + 1,
                name,
                price,
                description,
                image,
            };
            Item.push(newItem);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
            const { Item } = require('../app');
        }
    }

    static delete(req, res) {
        try {
            const { id } = req.params;
            const index = Item.findIndex((item) => item.id === parseInt(id));
            Item.splice(index, 1);
            res.status(200).json({ message: 'Item deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
        }
    }
}

module.exports = ItemController;
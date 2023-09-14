/**
 * items in the shopping cart
 */
const items = require('./fakeDb')

class Item {
    constructor(name, price) {
        this.name = name;
        this.prce = price;

        //keeping track of the items 
        items.push(this);
    }

    static listItems() {
        return items;
    }

    /**
     * update item with matching name
     */
    static updateItem(name, data) {
        let updatedItem = Item.findItem(name);
        if (updatedItem === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        updatedItem.name = data.name;
        updatedItem.price = data.price;

        return updatedItem;
    }

    /**
     * find and return item with matchin name
     */
    static findItem(name) {
        let foundItem = items.find(value => value.name === name);
        if (foundItem === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        return foundItem;
    }

    /**
     * Removing item by index
     */
    static removeItem(name) {
        let foundItem = items.findIndex(value => value.name === name);
        if (foundItem === -1) {
            throw { message: "Not Found", status: 404 }
        }
    }

}

module.exports = Item;
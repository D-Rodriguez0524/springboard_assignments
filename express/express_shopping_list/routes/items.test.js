process.env.NODE_ENV = "test";

const req = require('supertest');
const app = require('../app');
let items = require('../fakeDb');

let item = { name: "Popsicles", price: 20 };

beforeEach(async () => {
    items.push(item);
});

afterEach(async () => {
    items = [];
});

/** GET /items - returns `{items: [item, ...]}` */
describe("GET /items", () => {
    test('gets a list of items in shopping list', async () => {
        const resp = await req(app).get(`/items`);
        const { items } = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", () => {
    test("Gets a single item", async () => {
        const resp = await req(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item);
    });

    test("Responds with 404 if can't find item", async () => {
        const resp = await req(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});



/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", () => {
    test("Creates a new item", async () => {
        const resp = await req(app)
            .post(`/items`)
            .send({
                name: "pen",
                price: 0
            });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toHaveProperty("added");
        expect(resp.body.added).toHaveProperty("name");
        expect(resp.body.added).toHaveProperty("price");
        expect(resp.body.added.name).toEqual("pen");
        expect(resp.body.added.price).toEqual(0);
    });
});



/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", () => {
    test("Updates a single item", async () => {
        const resp = await req(app)
            .patch(`/items/${item.name}`)
            .send({
                name: "Testing"
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual({
            name: "Testing"
        });
    });

    test("Responds with 404 if can't find item", async () => {
        const resp = await req(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});



/** DELETE /items/[name] - delete item, 
 *  return `{message: "item deleted"}` */

describe("DELETE /items/:name", () => {
    test("Deletes a single a item", async () => {
        const resp = await req(app)
            .delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});

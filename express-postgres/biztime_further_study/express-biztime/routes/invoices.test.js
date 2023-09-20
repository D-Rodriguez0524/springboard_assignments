// Tests for invoices.

const request = require("supertest");

const app = require("../app");
const { createData } = require("../_test-common");
const db = require("../db");


// before each test, clean out data
beforeEach(createData);

afterAll(async () => {
    await db.end()
})

describe("GET /", function () {

    test("It respond with array of invoices", async function () {
        const response = await request(app).get("/invoices");
        expect(response.body).toEqual({
            "invoices": [
                { id: 1, comp_code: "test1" },
                { id: 2, comp_code: "test2" },
            ]
        });
    })

});


describe("GET /1", function () {

    test("It return invoice info", async function () {
        const response = await request(app).get("/invoices/1");
        expect(response.body).toEqual(
            {
                "invoice": {
                    id: 1,
                    amt: 100,
                    add_date: '2022-01-01T08:00:00.000Z',
                    paid: false,
                    paid_date: null,
                    company: {
                        code: 'test1',
                        name: 'Test1',
                        description: 'sample testing1..',
                    }
                }
            }
        );
    });

    test("It should return 404 error", async function () {
        const response = await request(app).get("/invoices/111");
        expect(response.status).toEqual(404);
    })
});


describe("POST /", function () {

    test("It should add invoice", async function () {
        const response = await request(app)
            .post("/invoices")
            .send({ amt: 200, comp_code: 'test2' });

        expect(response.body).toEqual(
            {
                "invoice": {
                    id: 3,
                    comp_code: "test2",
                    amt: 200,
                    add_date: expect.any(String),
                    paid: false,
                    paid_date: null,
                }
            }
        );
    });
});


describe("PUT /", function () {

    test("It should return 404 error", async function () {
        const response = await request(app)
            .put("/invoices/1111")
            .send({ amt: 1000 });

        expect(response.status).toEqual(404);
    });
});


describe("DELETE /", function () {

    test("It should delete invoice", async function () {
        const response = await request(app)
            .delete("/invoices/1");

        expect(response.body).toEqual({ "status": "deleted" });
    });
});

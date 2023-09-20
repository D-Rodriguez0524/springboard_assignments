//test for company

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

    test("It should return array of companies", async function () {
        const response = await request(app).get("/companies");
        expect(response.body).toEqual({
            "companies": [
                { code: "test1", name: "Test1" },
                { code: "test2", name: "Test2" },
            ]
        });
    })

});


describe("GET /test1", function () {

    test("It returns company info", async function () {
        const response = await request(app).get("/companies/test1");
        expect(response.body).toEqual(
            {
                "company": {
                    code: "test1",
                    name: "Test1",
                    description: "sample testing1..",
                    invoices: [1],
                }
            }
        );
    });

    test("It should return 404 error", async function () {
        const response = await request(app).get("/companies/abcdefgh");
        expect(response.status).toEqual(404);
    })
});


describe("POST /", function () {

    test("It will add company", async function () {
        const response = await request(app)
            .post("/companies")
            .send({ name: "Test3", description: "sample description" });

        expect(response.body).toEqual(
            {
                "company": {
                    code: "test3",
                    name: "Test3",
                    description: "sample description",
                }
            }
        );
    });

    test("It should return 500 error", async function () {
        const response = await request(app)
            .post("/companies")
            .send({ name: "Test1", description: "hdshjflkdsjlksd" });

        expect(response.status).toEqual(500);
    })
});


describe("PUT /", function () {

    test("It should update company", async function () {
        const response = await request(app)
            .put("/companies/test1")
            .send({ name: "Test4", description: "NewDescription" });

        expect(response.body).toEqual(
            {
                "company": {
                    code: "test1",
                    name: "Test4",
                    description: "NewDescription",
                }
            }
        );
    });



    test("It should return 500 for missing data", async function () {
        const response = await request(app)
            .put("/companies/test1")
            .send({});

        expect(response.status).toEqual(500);
    })
});


describe("DELETE /", function () {

    test("It should delete company", async function () {
        const response = await request(app)
            .delete("/companies/test1");

        expect(response.body).toEqual({ "status": "deleted" });
    });

    test("It should return 404 error", async function () {
        const response = await request(app)
            .delete("/companies/abcdefgh");

        expect(response.status).toEqual(404);
    });
});
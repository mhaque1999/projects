/** Tests for companies. */
process.env.NODE_ENV = "test"

const request = require("supertest");

const app = require("../app");
const db = require("../db");

beforeEach(async ()=> {
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");

  await db.query(`INSERT INTO companies (code, name, description)
                    VALUES ('apple', 'Apple', 'Maker of OSX.'),
                           ('ibm', 'IBM', 'Big blue.')`);

  const inv = await db.query(
        `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
           VALUES ('apple', 100, false, '2018-01-01', null),
                  ('apple', 200, true, '2018-02-01', null), 
                  ('ibm', 300, false, '2018-03-01', null)
           RETURNING id`);
});

afterAll(async () => {
  await db.end()
})

describe("Testing GET/", function () {
  test("returns a list of companies", async function () {
    const response = await request(app).get("/companies");
    expect(response.body).toEqual({"companies": 
    [{code: "apple", name: "Apple", description: "Maker of OSX."},
        {code: "ibm", name: "IBM", description: "Big blue."},
      ]
    });
  })

});


describe("Testing GET/:code", function () {

  test("It return IBM", async function () {
    const response = await request(app).get("/companies/ibm");
    expect(response.body).toEqual(
        {"company": {
            code: "ibm",
            name: "IBM",
            description: "Big blue.",
            industries: []
          }
        }
    );
  });

});


describe("Testing POST/", function () {

  test("It should add a company", async function () {
    const response = await request(app)
        .post("/companies").send({
            name: "Test", description: "testing company"});

    expect(response.body).toEqual(
        {
          "company": {
            code: "test",
            name: "Test",
            description: "testing company"
          }
        }
    );
  });

  test("Status code 500 for missing details for adding a company", async function () {
    const response = await request(app)
        .post("/companies")
        .send({name: "Apple"});

    expect(response.status).toEqual(500);
  })
});


describe("Testing PUT /", function () {

  test("It should update a company", async function () {
    const response = await request(app)
        .put("/companies/apple")
        .send({name: "NewApple", description: "better apple"});

    expect(response.body).toEqual(
        {
          "company": {
            code: "apple",
            name: "NewApple",
            description: "better apple"
          }
        }
    );
  });

});


describe("Testing DELETE /", function () {

  test("It should delete a company", async function () {
    const response = await request(app)
        .delete("/companies/apple");
    expect(response.body).toEqual({status: "Deleted"});
  });

});


/** Tests for companies. */
process.env.NODE_ENV = "test"

const request = require("supertest");

const app = require("../app");
const db = require("../db");

beforeEach(async ()=> {
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");
  //await db.query("ALTER SEQUENCE invoices_id_seq RESTART WITH 1;");
  await db.query(`INSERT INTO companies (code, name, description)
                    VALUES ('apple', 'Apple', 'Maker of OSX.'),
                           ('ibm', 'IBM', 'Big blue.')`);

  const inv = await db.query(
        `INSERT INTO invoices (id, comp_code, amt, paid, add_date, paid_date)
           VALUES (1, 'apple', 100, false, '2018-01-01', null),
                  (2, 'apple', 200, true, '2018-02-01', null), 
                  (3, 'ibm', 300, false, '2018-03-01', null)
           `);
});

afterAll(async () => {
  await db.end()
})

describe("Testing GET/", function () {
  test("returns a list of invoices", async function () {
    const response = await request(app).get("/invoices");
    expect(response.body).toEqual({
        "invoices": [
          {id: 1, comp_code: "apple", amt: 100, paid: false, add_date: expect.stringMatching(/^[\s\S]*$/), paid_date: null},
          {id: 2, comp_code: "apple", amt: 200, paid: true, add_date: expect.stringMatching(/^[\s\S]*$/), paid_date: null},
          {id: 3, comp_code: "ibm", amt: 300, paid: false, add_date: expect.stringMatching(/^[\s\S]*$/), paid_date: null},
        ]
      });
  })

});


describe("Testing GET/:id", function () {

  test("It return IBM invoices", async function () {
    const response = await request(app).get("/invoices/3");
    expect(response.body).toEqual(
        {
          "invoice": {
            id: 3,
            amt: 300,
            add_date: expect.stringMatching(/^[\s\S]*$/),
            paid: false,
            paid_date: null,
            company: {
              code: 'ibm',
              name: 'IBM',
              description: 'Big blue.',
            }
          }
        });

    });
});


describe("Testing POST/", function () {

  test("It should add a invoice", async function () {
    await db.query("ALTER SEQUENCE invoices_id_seq RESTART WITH 4;");
    const response = await request(app)
        .post("/invoices").send({
            amt:111, comp_code:"ibm"});
    
    expect(response.body).toEqual(
        {
          id: expect.any(Number),
          comp_code: "ibm",
          amt: 111,
          add_date: expect.stringMatching(/^[\s\S]*$/),
          paid: false,
          paid_date: null,
        }
    );
  });

});


describe("Testing PUT /", function () {

  test("It should update a invoice", async function () {
    const response = await request(app)
        .put("/invoices/3")
        .send({amt:55, paid:false});

    expect(response.body).toEqual(
        {
          amt:55
        }
    );
  });

});


describe("Testing DELETE /", function () {

  test("It should delete a company", async function () {
    const response = await request(app)
        .delete("/invoices/1");
    expect(response.body).toEqual({status: "Deleted"});
  });

});

describe("Testing GET/invoices/companies/", function() {

  test("It should get a company with with the invoices related to it", async function() {
    const response = await request(app)
      .get("/invoices/companies/apple");
    expect(response.body).toEqual(
        {
          "company": {
              code: "apple",
              name: "Apple",
              description: "Maker of OSX.",
              invoices: [{
                id: 1,
                comp_code: "apple",
                paid: false,
                amt: 100,
                add_date: expect.any(String),
                paid_date: null,
              },

              {
                id: 2,
                comp_code: "apple",
                paid: true,
                amt: 200,
                add_date: expect.stringMatching(/^[\s\S]*$/),
                paid_date: null,
              }
            ]
          }
        }
    )
  })
})


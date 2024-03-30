process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let item = {"name": "popsicle1", "price": 8.25};

beforeEach(function() {
  items.push(item);
});

afterEach(function() {
  items.length = 0;
});
// end afterEach

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({itemList: items});
  });
});
// end

describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({item: item});
  });

});


describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({"name": "popsicle2", "price": 2.25});
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      item: {"name": "popsicle2", "price": 2.25}
    });
  });
});
// end


describe("PATCH /items/:name", function() {
  test("Updates a item ", async function() {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({"name": "new_popsicle", "price": 1.00});
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: {"name": "new_popsicle", "price": 1.00}});
  });

});

describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({message: `${item.name} was deleted from the shopping list!`});
  });
});
// end

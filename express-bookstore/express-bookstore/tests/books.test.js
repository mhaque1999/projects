process.env.NODE_ENV = "test"

const request = require("supertest");


const app = require("../app");
const db = require("../db");

let book_isbn;


beforeEach(async () => {
  let result = await db.query(`
    INSERT INTO
      books (isbn, amazon_url,author,language,pages,publisher,title,year)
      VALUES(
        111111,
        'http://a.co/eobPtX2',
        'Matthew Lane',
        'english',
        264,
        'Princeton University Press',
        'Power-Up: Unlocking the Hidden Mathematics in Video Games',
        2017)
      RETURNING isbn`);

  book_isbn = result.rows[0].isbn
});


describe("POST /books", function () {
  test("Creates a new book", async function () {
    const response = await request(app)
        .post(`/books`)
        .send({
          isbn: '11111111',
          amazon_url: "https://amazon.com",
          author: "test",
          language: "english",
          pages: 500,
          publisher: "test publisher",
          title: "test title",
          year: 2024
        });
    expect(response.statusCode).toBe(201);
    expect(response.body.book).toHaveProperty("isbn");
  });

  test("Preventing creation of a book", async function () {
    const response = await request(app)
        .post(`/books`)
        .send({author: "no title"});
    expect(response.statusCode).toBe(400);
  });
});


describe("GET /books", function () {
  test("Gets a list of books", async function () {
    const response = await request(app).get(`/books`);
    const books = response.body.books;
    expect(books).toHaveLength(1);
    expect(books[0]).toHaveProperty("isbn");
  });
});


describe("GET /books/:isbn", function () {
  test("Gets a single book", async function () {
    const response = await request(app)
        .get(`/books/${book_isbn}`)
    expect(response.body.book).toHaveProperty("isbn");
    expect(response.body.book.isbn).toBe(book_isbn);
  });

  test("Responds with 404 if can't find book in question", async function () {
    const response = await request(app)
        .get(`/books/-1`)
    expect(response.statusCode).toBe(404);
  });
});


describe("PUT /books/:isbn", function () {
  test("Updates a single book", async function () {
    const response = await request(app)
        .put(`/books/${book_isbn}`)
        .send({
          isbn: book_isbn,
          amazon_url: "https://amazon.com",
          author: "test",
          language: "english",
          pages: 500,
          publisher: "test publisher",
          title: "test updated book",
          year: 2024
        });
    expect(response.body.book.isbn).toBe(book_isbn);
    expect(response.body.book.title).toBe("test updated book");
  });


  test("Responds 404 if can't find book in question", async function () {
    await request(app)
        .delete(`/books/${book_isbn}`)
    const response = await request(app).delete(`/books/${book_isbn}`);
    expect(response.statusCode).toBe(404);
  });
});


describe("DELETE /books/:id", function () {
  test("Deletes a single a book", async function () {
    const response = await request(app)
        .delete(`/books/${book_isbn}`)
    expect(response.body).toEqual({message: "Book deleted"});
  });
});


afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
  await db.query("DROP TABLE books")
  await db.query(`CREATE TABLE books (
    isbn TEXT PRIMARY KEY,
    amazon_url TEXT,
    author TEXT,
    language TEXT, 
    pages INTEGER,
    publisher TEXT,
    title TEXT, 
    year INTEGER
  );`)
});


afterAll(async function () {
  await db.end()
});

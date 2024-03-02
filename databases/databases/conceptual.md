### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
PostgreSQL is a open source database management system that allows for sql querying.

- What is the difference between SQL and PostgreSQL?
SQL is a language while PostgreSQL is a database managment system that allows to 
the use of the SQL language.

- In `psql`, how do you connect to a database?
psql database name
- What is the difference between `HAVING` and `WHERE`?
Having is used to filter from groups while where is used to filter from the table.
Having can be used with other SQL keywords(Select, Update, Delete) while where can 
only be used for select.

- What is the difference between an `INNER` and `OUTER` join?
Inner joins is where the conditions match both tables while outer join
matches the conditions match from either table and/or both.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
Left outer join is where the condition matches the first table while 
right outer join is where the condition matches the second table.

- What is an ORM? What do they do?
ORM is object relational mapping and it connects object oriented programs
to databases.

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?
AJAX is used for client side request while the request library is used
for server side requests. Using AJAX can be faster than server side
requests. Server side requests is easier to store/process data. 
Server side requests also need a password to access API which
makes it more secure for the data involved.

- What is CSRF? What is the purpose of the CSRF token?
CSRF is cross site request forgery. Since a form can be submitted
to other sites, a CSRF token it used to prevent from this occuring.
A server creates this CSRF token when a form is generated and
the site used it when a form is submitted.

- What is the purpose of `form.hidden_tag()`?
Form.hidden.tag() is used to hide the csrf.
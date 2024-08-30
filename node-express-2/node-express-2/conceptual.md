### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information. It consists of a header, payload, and signature. JWTs are commonly used for authentication and authorization.

- What is the signature portion of the JWT?  What does it do?

he signature portion of a JWT is created using the encoded header and payload combined with a secret or private key.

- If a JWT is intercepted, can the attacker see what's inside the payload?

Yes, the payload of a JWT can be decoded by anyone who intercepts the token since it is base64 URL-encoded. However, without the signature and secret or private key, the attacker cannot alter or verify the token.

- How can you implement authentication with a JWT?  Describe how it works at a high level.

User credentials are sent to the server, which generates a JWT upon successful authentication. The client stores the token and includes it in the Authorization header for subsequent requests. The server verifies the token to authenticate the user.

- Compare and contrast unit, integration and end-to-end tests.

Unit tests focus on individual functions or components in isolation and are fast. Integration tests focus on interactions between multiple units or components, verifying that parts of the system work together correctly. End-to-end tests focus on the complete system, testing the entire application flow from start to finish, and ensure the system works as expected.

- What is a mock? What are some things you would mock?

A mock is a simulated object or function used in testing to mimic the behavior of real components. It helps isolate the unit being tested from external dependencies. I would mock API responses and a database.

- What is continuous integration?

Continuous Integration (CI) is a development practice where code changes are automatically tested and integrated into a shared repository multiple times a day.

- What is an environment variable and what are they used for?

Environment variables are dynamic values set outside the application that influence its behavior. They are used for configuration settings like database connections, API keys, and environment-specific options. They help keep sensitive data secure and enable flexible configurations.

- What is TDD? What are some benefits and drawbacks?

Test-Driven Development (TDD) is a software development process where tests are written before code is implemented. Benefits include early bug detection and better design. Some drawbacks are slower development and the need for extensive testing.

- What is the value of using JSONSchema for validation?

JSONSchema provides a standard way to define and validate the structure of JSON data. It ensures data consistency and correctness by specifying required fields, data types, and constraints. This helps catch errors early and improves data integrity.

- What are some ways to decide which code to test?

If the code contains any complex logic, or interacts with external applications then I would decide to test it.

- What does `RETURNING` do in SQL? When would you use it?

The RETURNING clause in SQL allows you to return specific columns from an INSERT, UPDATE, or DELETE statement.

- What are some differences between Web Sockets and HTTP?

Web Sockets provide duplex communication channels over a single TCP connection, enabling real-time data exchange. HTTP is a request-response protocol suitable for stateless interactions and requires opening new connections for each request. 

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

I really don't have any preference. Depending on what the project specifies I will use that technology to build
the app.
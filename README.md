==> User Registration API

--> A Node.js backend system with API endpoints for user registration, token generation, and data management

==> Introduction

--> The User Registration API is a backend system that provides a set of API endpoints for user registration.
token generation, and data management. It allows users to register, generate access tokens, and store, retrieve,
update, and delete key-value data.

==> Technologies Used

- Node Js
- Express Js
- MongoDB (Database)
- Mongoose (Connecting Database)
- Bcrypt (Password hashing)
- Jsonwebtoken (Generate a token)
- Dotenv (Hide the secret data like MONGO_URL, SECRET_KEY, etc)

==> Getting Started

- Onlive server you can go with this API.
  --> https://dpdzero.onrender.com/

(A) Environment Setup

1. Clone the repository:
   --> git clone https://github.com/sonuprasad66/DPDzero.git

   --> cd DPDzero

2. Install dependencies:
   --> npm install

3. Set up MongoDB:
   --> Make sure you have MongoDB installed and running locally.

(B) Program run setup

1. Create a .env file in the root directory with your MongoDB connection URL:

   --> MONGO_URL="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.y60kxun.mongodb.net/DPDzero?retryWrites=true&w=majority"

   --> SECRET_KEY="DPDzero"

   --> PORT="8080"

2. Add a start script to the package.json

3. Start the server:
   --> npm start

4. The API server will start on http://localhost:8080.

==> API Documentation

--> The API provides the following endpoints:

--> For the authentication pass the Bearer token from the headers.

- POST /api/register: Register a new user.

  --> Pass user registration data from the body

  Example:- {
  "username": "example_user",
  "email": "user@example.com",
  "password": "secure_password123",
  "full_name": "John Doe",
  "age": 30,
  "gender": "male"
  }

- POST /api/token: Generate an access token.

  --> Pass user credentials data from the body.

  Example:- {
  "username": "example_user",
  "password": "secure_password123",
  }

- POST /api/data: Store data (requires authentication).

  --> Pass data from the body.

  Example:- {
  "key": "unique_key",
  "value": "data_value"
  }

- GET /api/data/:key: Retrieve data (requires authentication).

  --> Pass data key from the params.

- PUT /api/data/:key: Update data (requires authentication).

  --> Pass data key from the params.

  --> Pass data value from the body

- DELETE /api/data/:key: Delete data (requires authentication).

  --> Pass data key from the params.

==> Contributing

--> Contributions are welcome! If you find any issues or have suggestions for improvements,
feel free to create a pull request or submit an issue.

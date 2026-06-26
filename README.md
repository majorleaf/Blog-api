# Blog-api

Express Personal Blog API

A simple, lightweight RESTful API built with Express and Node.js. This project serves as a backend for a personal blogging platform, demonstrating core CRUD (Create, Read, Update, Delete) operations using an in-memory database and custom middleware for data validation.

Features

Express Framework: The most popular web framework for Node.js.

CRUD Operations: Complete endpoints to manage blog posts.

Custom Data Validation: Custom Express middleware to ensure incoming requests contain the required data before processing.

Separation of Concerns: Clear separation between API routing (express-server.js) and data management (db.js).

Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v16.x or higher recommended)

npm (Node Package Manager - comes with Node.js)

Installation & Setup

Clone or download the repository to your local machine.

Navigate to the project directory:

cd blog-api


Install the dependencies:

npm install express


(Optional) If you want the server to auto-restart on changes, install nodemon:

npm install -g nodemon


Running the Server

Start the development server by running:

node express-server.js


(Or use nodemon express-server.js if you installed nodemon)

The server will start and listen for requests at http://localhost:3000.

API Endpoints

1. Get All Posts

Method: GET

Endpoint: /posts

Query Parameters (Optional): ?tag=your-tag (e.g., /posts?tag=express)

Success Response: 200 OK (Returns an array of post objects)

2. Get a Single Post

Method: GET

Endpoint: /posts/:id

Success Response: 200 OK (Returns the post object)

Error Response: 404 Not Found (If the ID does not exist)

3. Create a Post

Method: POST

Endpoint: /posts

Body (JSON):

{
  "title": "My New Post",
  "content": "This is the content of my post.",
  "tags": ["coding", "express"]
}


Note: title and content are strictly required by our custom validatePost middleware.

Success Response: 201 Created

Error Response: 400 Bad Request (If title or content is missing)

4. Update a Post

Method: PUT

Endpoint: /posts/:id

Body (JSON): Same as the Create endpoint.

Success Response: 200 OK

Error Response: 404 Not Found (If the ID does not exist) or 400 Bad Request

5. Delete a Post

Method: DELETE

Endpoint: /posts/:id

Success Response: 200 OK

Error Response: 404 Not Found (If the ID does not exist)

Project Structure

blog-api/
├── node_modules/         # Project dependencies (created after npm install)
├── db.js                 # In-memory database logic
├── express-server.js     # Express server setup, middleware, and API routes
├── package.json          # Project metadata and dependency list
└── README.md             # Project documentation (this file)


Next Steps

This API currently uses an in-memory array to store data, meaning data is lost when the server restarts. To take this project to the next level, consider:

Connecting to a real database (e.g., PostgreSQL, MongoDB, SQLite).

Adding User Authentication (e.g., JWT).

Writing automated tests using tools like Jest or Supertest.

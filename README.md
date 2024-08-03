# Library Management

Library Management is a Node.js application designed to provide a simple solution for library management. This project allows users to manage books and organize library data.

A library management application will be developed to manage members and the borrowing of
books by members. The operations that can be performed within the application are listed
below:

- Listing users
- Accessing information about a user (name, books borrowed in the past with their user
  scores, and currently borrowed books)
- Creating a new user
- Listing books
- Accessing information about a book (name and average rating). Book viewing should be
  considered as a process much more frequent than borrowing and returning.
- Creating a new book
- Borrowing a book
- Returning a book and giving a rating

## Installation and Requirements

### Requirements

- Node.js (v18.x or higher)
- Docker (Optional, if you choose to use Docker)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/library-management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd library-management
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add the necessary environment variables:

   ```dotenv
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
   NODE_ENV=development
   MAX_SCORE=10
   MIN_SCORE=0
   ```

### Using via Locally

To start the application:

```bash
$ npm run dev
```

To run unit tests

```bash
$ npm run test
```

### Using via Docker

To start the application

```bash
$ docker compose up
```

## Notes

For API documentation, you can refer to the [Postman Collection](link-to-your-postman-collection) under the `api-docs` section.

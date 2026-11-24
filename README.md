
# CloudCart Product Service

Product Service is a Node.js microservice responsible for managing product information in the CloudCart e-commerce application.

## Technology Stack
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

## Features
- Get all products
- Get product by ID
- Create a product
- Update a product
- Delete a product
- Health check endpoint

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file using `.env.example` as a template.

Configure:
- PORT
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME

## Start Application

```bash
node server.js
```

## Database

Execute `database/schema.sql` on your MySQL server before using product APIs.

# product-service

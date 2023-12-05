# Ecommerce API with Node.js

This repository contains the code for an Ecommerce API built with Node.js and integrated with a MongoDB database. The API supports various e-commerce operations, including product and category listing, product details, cart management, order processing, user registration, and authentication using JSON Web Tokens (JWT). This README provides an overview of the project and instructions for setting it up and running.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Integration](#database-integration)
- [Authentication and Security](#authentication-and-security)
- [Error Handling](#error-handling)
- [Documentation](#documentation)
- [Rate Limiting (Optional)](#rate-limiting-optional)

## Prerequisites

Before you can run the Ecommerce API, you need to have the following prerequisites installed on your system:

- Node.js: You can download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

- MongoDB: Install and configure MongoDB on your machine or use a cloud-based MongoDB service. Update the database connection details in the configuration file.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   ```

2. Change to the project directory:

   ```bash
   cd ecommerce-api
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure the API by creating a `.env` file in the project root directory and specifying the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

   - `PORT`: The port on which the API will run.
   - `MONGODB_URI`: The URI of your MongoDB database.
   - `JWT_SECRET`: A secret key for generating and verifying JSON Web Tokens.

5. Start the API:

   ```bash
   npm start
   ```

6. The API should now be running and accessible at `http://localhost:3000`. You can use tools like [Postman](https://www.postman.com/) to test the API endpoints.

## API Endpoints

### Category Listing

- **Endpoint**: `/api/categories`
- **Method**: `GET`
- **Description**: Retrieves a list of categories.

### Product Listing

- **Endpoint**: `/api/products/category/:categoryId`
- **Method**: `GET`
- **Description**: Retrieves a list of products based on the provided category ID. Includes essential product details such as title, price, description, and availability.

### Product Details

- **Endpoint**: `/api/products/:productId`
- **Method**: `GET`
- **Description**: Fetches detailed information about a specific product by its ID.

### Cart Management

- **Endpoint**: `/api/cart`
- **Method**: `GET`
- **Description**: Retrieves the user's cart.

- **Endpoint**: `/api/cart/add`
- **Method**: `POST`
- **Description**: Adds a product to the user's cart.

- **Endpoint**: `/api/cart/update/:productId`
- **Method**: `PUT`
- **Description**: Updates the quantity of a product in the user's cart.

- **Endpoint**: `/api/cart/remove/:productId`
- **Method**: `DELETE`
- **Description**: Removes a product from the user's cart.

### Order Placement

- **Endpoint**: `/api/orders/place`
- **Method**: `POST`
- **Description**: Allows users to place an order with products from their cart.

### Order History

- **Endpoint**: `/api/orders/history`
- **Method**: `GET`
- **Description**: Fetches the order history for authenticated users.

### Order Details

- **Endpoint**: `/api/orders/:orderId`
- **Method**: `GET`
- **Description**: Retrieves detailed information about a specific order by its ID.

### User Authentication

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Allows users to register.

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Allows users to log in and obtain a JWT token for authentication.

## Database Integration

The API is integrated with a MongoDB database to store and manage product data, user cart information, and order details. The API performs CRUD operations on products, cart items, and orders. Make sure to configure the MongoDB URI in the `.env` file as mentioned in the "Getting Started" section.

## Authentication and Security

The API uses JSON Web Tokens (JWT) for user authentication. Sensitive endpoints like cart management and order placement are secured using authentication middleware. Only authenticated users can access these endpoints.

## Error Handling

The API includes error handling to provide meaningful error messages and status codes when necessary. Proper error responses are returned to client applications to aid in debugging and troubleshooting.

## Documentation

API documentation is available using Swagger. Access the documentation at `http://localhost:3000/api-docs` after starting the API. This documentation provides details about each endpoint, including their functionality, expected input, and output.

## Rate Limiting (Optional)

Rate limiting can be added to prevent abuse and maintain server stability. To implement rate limiting, consider using middleware like `express-rate-limit` and configure it according to your requirements.

Feel free to customize and extend this Ecommerce API to meet your specific needs, including adding payment-related APIs if necessary. Happy coding!
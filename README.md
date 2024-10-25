# Product catalog

## Tech Stack

- **Programming languages**: JavaScript, TypeScript
- **Frameworks**: Node.js, Express
- **Libraries**: Mongoose, amqplib
- **Databases**: MongoDB
- **Third-party services**: Docker, RabbitMQ, Redis

## Services

### Product Service

A RESTful API service that manages product-related operations such as creating, editing, deleting, listing, and retrieving products. It interacts with the Review Processing Service to notify it about changes made to reviews.

### Review processing service

This service handles notifications regarding reviews, processes them, and calculate the average ratings for products.

## Run Locally

Clone the project

```bash
  https://github.com/lukasEl11/product-catalog-service.git
```

Go to the project directory

```bash
  cd product-catalog-service
```

Start the server

```bash
  docker-compose up --build
```

## Development mode

### product-service

#### Prerequisites

- MongoDB is running locally
- RabbitMQ is running locally
- Redis is running locally (optional)

#### Environment Variables

`PORT=3000`  
`HOST=localhost`  
`MONGO_URI=<local_mongodb_uri>`  
`REDIS_URL=<local_redis_uri>`  
`RABBITMQ_URI=<local_rabbitmq_uri>`

#### Start dev mode

```bash
  npm run dev
```

#### Build service

```bash
  npm run build
```

#### Start service locally (production.env has to be configured)

```bash
  npm run start
```

#### Run linter

```bash
  npm run lint
```

### review-processing-service

#### Prerequisites

- MongoDB is running locally
- RabbitMQ is running locally

#### Environment Variables

`PORT=3100`  
`HOST=localhost`  
`MONGO_URI=<local_mongodb_uri>`  
`RABBITMQ_URI=<local_rabbitmq_uri>`

#### Start dev mode

```bash
  npm run dev
```

#### Build service

```bash
  npm run build
```

#### Start service locally (production.env has to be configured)

```bash
  npm run start
```

#### Run linter

```bash
  npm run lint
```

## Assets

- [Postman collection](https://github.com/lukasEl11/product-catalog-service/assets/postman_collection.json)
- [Product service local env files](https://github.com/lukasEl11/product-catalog-service/product-service/env)
- [Review processing local env files](https://github.com/lukasEl11/product-catalog-service/review-processing-service/env)

## TODO

- write unit & integration test
- remove duplicity and create /shared (database, rabbitmq, models)
- proper error handling & recovery logic (database, rabbitmq)

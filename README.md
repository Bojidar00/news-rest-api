# NEWS API
This is a simple REST API for news

## Requirements

- Node.js 18
- Mongodb 6.3

### Project setup

```bash
npm install
```
- Create .env file. See .env.example.

### Run the project

```bash
npm start
```

### Run with docker

```bash
docker compose up
```

### Run tests

```bash
npm run test
```

### Run eslint

```bash
npm run lint
```

### Run prettier

```bash
npm run prettier
```

### Endpoints

#### GET /news
- Query Params:
    - title - Filter results by title.
    - date - Filter results by date.
    - sortByTitle - Value of 1 for ascending and -1 for descending.
    - sortByDate - Value of 1 for ascending and -1 for descending.

#### POST /news
    
- Request body:
    - date: date
    - title: string
    - shortDescription: string
    - text: string

#### PUT /news

- Request body
    - _id: string
    - date: date
    - title: string
    - shortDescription: string
    - text: string

#### DELETE /news

- Request body
    - _id: string

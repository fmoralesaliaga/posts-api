# Posts API

This is a modern RESTful API for managing posts built with Node.js, Express and PostgreSQL. It follows best practices for API design, security, and maintainability.

## Features

- **RESTful API**: Standard CRUD operations for posts
- **Postgres with Prisma ORM**: Type-safe database access
- **Security**: CORS, Helmet, Rate limiting
- **Documentation**: Swagger/OpenAPI docs
- **Error handling**: Standardized error responses
- **Validation**: Request validation using express-validator
- **Logging**: Structured logging with Winston
- **Testing**: Unit and integration tests with Jest
- **Docker**: Containerization for development and production
- **CI/CD Ready**: Best practices for continuous integration

## Project Structure

```
posts-api
├── __tests__               # Test files
│   ├── integration         # Integration tests
│   └── unit                # Unit tests
├── prisma                  # Prisma ORM configuration and schema
├── src
│   ├── config              # App configuration
│   ├── controllers         # Route controllers
│   ├── middlewares         # Custom middleware
│   ├── models              # Data models and error classes
│   ├── routes              # Route definitions
│   ├── services            # Business logic
│   ├── utils               # Utility functions
│   ├── app.js              # Express app setup
│   └── index.js            # App entry point
├── .env.example            # Example environment variables
├── .eslintrc.js            # ESLint configuration
├── jest.config.js          # Jest configuration
├── docker-compose.yml      # Docker compose configuration
├── Dockerfile              # Docker configuration
└── package.json            # Project dependencies
```

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Docker (optional)
- npm or yarn

## Installation & Setup

### Method 1: Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd posts-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start PostgreSQL with Docker:**
   ```bash
   npm run docker:db
   ```

4. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations (Important!):**
   ```powershell
   # Set the correct DATABASE_URL for localhost
   $env:DATABASE_URL="postgresql://admin:admin@localhost:5432/postsdb"
   npx prisma migrate dev --name init
   ```

6. **Seed the database (optional):**
   ```powershell
   # Use the same DATABASE_URL
   $env:DATABASE_URL="postgresql://admin:admin@localhost:5432/postsdb"
   npx prisma db seed
   ```

7. **Start the development server:**
   ```bash
   npm run dev:local
   ```

### Method 2: Automated Setup (Easiest)

```powershell
# Run the automated setup script
.\setup.ps1
```

This script will:
- Install dependencies
- Start PostgreSQL with Docker
- Generate Prisma client
- Run migrations with correct DATABASE_URL
- Seed the database
- Provide next steps

### Method 2: Local PostgreSQL

1. **Setup local PostgreSQL database**
2. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```
3. **Update DATABASE_URL in .env.local to point to localhost:**
   ```
   DATABASE_URL="postgresql://admin:admin@localhost:5432/postsdb"
   ```
4. **Follow steps 2, 4-7 from Method 1**

## Available Scripts

- `npm run dev` - Start development server (for Docker)
- `npm run dev:local` - Start development server (for local DB)
- `npm start` - Start production server
- `npm run docker:db` - Start PostgreSQL database with Docker
- `npm run docker:up` - Start all services with Docker
- `npm run docker:down` - Stop all Docker services
- `npm run migrate:dev` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3001/docs
- **Health Check**: http://localhost:3001/health

## Troubleshooting

### Common Issues

1. **"Cannot reach database server"**
   - Make sure PostgreSQL is running
   - Check DATABASE_URL in your .env file
   - For Docker: ensure `npm run docker:db` was successful

2. **"Cannot read properties of undefined (reading 'bind')"**
   - Run `npm run prisma:generate` to generate the Prisma client

3. **Port already in use**
   - Change PORT in .env file or stop other services using port 3001

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd posts-api
   ```

3. Create .env file:
   ```
   cp .env.example .env
   ```

4. Install dependencies:
   ```
   npm install
   ```

5. Set up the database:
   ```
   npx prisma migrate dev
   ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

### Using Docker
```
docker-compose up
```

The API will be available at `http://localhost:3001`.
API documentation available at `http://localhost:3001/docs`.

## API Endpoints

| Method | Endpoint       | Description                    | Request Body      |
|--------|---------------|--------------------------------|-------------------|
| GET    | /posts        | Get all posts                  | -                 |
| GET    | /posts/:id    | Get post by ID                 | -                 |
| POST   | /posts        | Create a new post              | name, description |
| PUT    | /posts/:id    | Update a post                  | name, description |
| DELETE | /posts/:id    | Delete a post                  | -                 |
| GET    | /health       | Health check endpoint          | -                 |
| GET    | /docs         | API Documentation (Swagger UI) | -                 |

## Testing

Run tests with:
```
npm test
```

Generate coverage report:
```
npm run test:coverage
```

## Code Quality

Lint the code:
```
npm run lint
```

## Deployment

For production deployment:

1. Build Docker image:
```
docker build --target production -t posts-api:prod .
```

2. Run container:
```
docker run -p 3001:3001 --env-file .env posts-api:prod
```

## Security Features

- CORS protection
- Helmet headers
- Rate limiting
- Input validation
- Error handling

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
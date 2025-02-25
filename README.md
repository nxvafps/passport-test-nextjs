# Next.js Authentication Project

This project demonstrates a Next.js application with custom authentication using PostgreSQL, Passport.js, and Iron Session.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/nxvafps/passport-test-nextjs
cd test-project
npm install
```

2. Configure Environment Variables:
   Create a `.env.development` file in the root directory with:

```bash
PGDATABASE=test_database
SESSION_SECRET=<your-secret-key>
```

To generate a secure SESSION_SECRET, run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Database Setup:

```bash
# Create the database
npm run setup-dbs

# Seed the database with initial data
npm run seed
```

## Database Structure

The project uses PostgreSQL with the following tables:

- `users`: Stores user information and credentials
- `federated_credentials`: Manages OAuth provider connections
- `session`: Handles user sessions
- `todos`: Stores user tasks (if implemented)

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build the production application
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint checks
- `npm run setup-dbs`: Initialize the database
- `npm run seed`: Seed the database with test data

## Authentication System

The project implements:

- Local authentication with username/password
- Secure session management using Iron Session
- Password hashing with crypto
- Session persistence in PostgreSQL

## Tech Stack

- Next.js 15.1
- PostgreSQL (pg)
- Iron Session for secure cookie-based sessions
- Passport.js for authentication
- TypeScript
- Styled Components
- Formik & Yup for form handling

## Development

1. Start the development server:

```bash
npm run dev
```

2. Access the application at `http://localhost:3000`

## Default User

The seed script creates a default user:

- Username: `alice`
- Password: `letmein123`

## Security Notes

- Update the SESSION_SECRET in production
- Enable SSL in production
- Implement proper password policies
- Add rate limiting for authentication endpoints

## Project Structure

```
src/
├── lib/
│   ├── auth/       # Authentication logic
│   ├── db/         # Database configuration and seeds
│   └── ...
├── types/          # TypeScript type definitions
└── ...
```

```

```

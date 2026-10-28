# Whatbyte Healthcare Backend

A RESTful backend for a healthcare management application. It provides
API routes for authentication, patient records, doctor records, and
patient--doctor mappings.

## Features

-   User authentication with JWT (as configured in the project)
-   Patient management APIs
-   Doctor management APIs
-   Patient--doctor mapping APIs
-   JSON request and response handling
-   Centralized Express error handling
-   Database configuration through environment variables

## Tech Stack

-   **Node.js**
-   **Express.js**
-   **Database:** Configure according to `src/config/database.js` (the
    current project configuration uses a `DATABASE_URL` environment
    variable)
-   **Authentication:** JSON Web Tokens (JWT)

## Project Structure

``` text
healthcare-backend-main/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── mappingController.js
│   │   └── patientController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── Doctor.js
│   │   ├── Patient.js
│   │   ├── PatientDoctorMapping.js
│   │   ├── User.js
│   │   └── index.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── mappingRoutes.js
│   │   └── patientRoutes.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Prerequisites

-   Node.js and npm installed
-   A database instance configured for this project
-   Git (optional, for version control)

## Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/geekpranjal/whatbyte-healthcare-backend.git
cd whatbyte-healthcare-backend
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. Add the variables required by
your database configuration and application:

``` env
DATABASE_URL=your_database_connection_string
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
PORT=3000
```

Replace the example values with your own. The database connection string
must match the database and driver used by `src/config/database.js`.

**Security:** Never commit `.env` to GitHub. Keep real database
credentials and JWT secrets private. The `.env.example` file should
contain placeholders only.

### 4. Start the server

If your `package.json` defines a development script, use:

``` bash
npm run dev
```

Otherwise, start the server directly:

``` bash
node src/server.js
```

If Nodemon is installed in the project, you can run:

``` bash
npx nodemon src/server.js
```

The server uses the `PORT` environment variable when configured. With
`PORT=3000`, the local base URL is:

``` text
http://localhost:3000
```

## API Overview

The Express app mounts these route prefixes:

  Feature                    Base path
  -------------------------- -----------------
  Health check               `GET /`
  Authentication             `/api/auth`
  Patients                   `/api/patients`
  Doctors                    `/api/doctors`
  Patient--doctor mappings   `/api/mappings`

### Health check

Send a `GET` request to:

``` http
GET http://localhost:3000/
```

Expected response:

``` json
{
  "message": "Healthcare API is running"
}
```

### Testing with Postman

1.  Start the backend.
2.  Open Postman and create a request.
3.  Select the HTTP method supported by the route (`GET`, `POST`, `PUT`,
    or `DELETE`).
4.  Enter the full URL using `http://localhost:3000` plus the route
    path.
5.  For requests that accept JSON, choose **Body → raw → JSON**.
6.  For protected endpoints, configure the authentication required by
    the application (for example, **Authorization → Bearer Token** if
    the route uses JWT bearer authentication).
7.  Click **Send** and inspect the HTTP status and response body.

The exact endpoint paths, required JSON fields, and authentication
requirements are defined in `src/routes/` and `src/controllers/`. Check
those files before making requests.

## Common Issues

-   **Database connection fails:** Verify that `.env` exists in the
    project root, the variable names match the code, and the database is
    reachable.
-   **Environment variable is undefined:** Load environment variables
    before initializing the database connection and check the spelling
    of each variable.
-   **Cannot connect to localhost:** Ensure the server is running and
    that the request uses the correct port.
-   **404 Route not found:** Confirm the URL, HTTP method, and route
    definitions.
-   **401/403 response:** Check whether the endpoint requires a valid
    token or other authorization.

## Security Notes

-   Do not upload `.env`, passwords, access tokens, or database
    connection strings.
-   Use a strong, unique `JWT_SECRET` outside local development.
-   Validate request data and protect endpoints that require
    authentication.
-   Use test records when experimenting with update and delete requests.

## Contributing

1.  Create a branch for your changes.
2.  Make and test your changes locally.
3.  Commit your changes with a descriptive message.
4.  Push your branch and open a pull request.

## License

No license has been specified yet. Add a license file if you intend to
publish this project for reuse.

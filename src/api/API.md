# API Documentation

## Authentication

Some endpoints require a valid JWT token in the `Authorization: Bearer <token>` header.

---

## Endpoints

### Auth

- **POST /api/login**
  - Description: Log in and receive a JWT token.
  - Body: `{ username, password }`
  - Response: `{ token }`

- **GET /api/me**
  - Description: Get current user info.
  - Auth: Required
  - Response: User object

---

### Cats

- **GET /api/cats**
  - Description: Get all cats.
  - Response: Array of cat objects

- **POST /api/cats**
  - Description: Add a new cat (with image upload).
  - Body: Cat fields, image as `catImage` (multipart/form-data)
  - Middleware: `upload.single('catImage')`, `createThumbnail`
  - Response: Created cat object

- **GET /api/cats/:id**
  - Description: Get cat by ID.
  - Response: Cat object

- **PUT /api/cats/:id**
  - Description: Update cat by ID.
  - Auth: Required
  - Body: Cat fields
  - Response: Updated cat object

- **DELETE /api/cats/:id**
  - Description: Delete cat by ID.
  - Auth: Required
  - Response: Success message

- **GET /api/cats/owner/:ownerId**
  - Description: Get all cats by owner ID.
  - Response: Array of cat objects

---

### Users

- **GET /api/users**
  - Description: Get all users.
  - Response: Array of user objects

- **POST /api/users**
  - Description: Create a new user.
  - Body: User fields
  - Response: Created user object

- **GET /api/users/:id**
  - Description: Get user by ID.
  - Response: User object

- **PUT /api/users/:id**
  - Description: Update user by ID.
  - Body: User fields
  - Response: Updated user object

- **DELETE /api/users/:id**
  - Description: Delete user by ID.
  - Response: Success message

- **GET /api/users/username**
  - Description: Get user by username (query param).
  - Query: `?username=...`
  - Response: User object

---

## Middleware

- **authenticateToken**: Checks for a valid JWT token, sets `res.locals.user`.
- **upload.single('catImage')**: Handles image upload for cats.
- **createThumbnail**: Creates a 160x160 PNG thumbnail for uploaded cat images.
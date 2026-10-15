# WearHub

A MERN stack apparel catalog. Customers can browse and search clothing and accessories; an admin can log in and manage the product list.

## Key features
- JWT authentication (register and login), with admin and user roles
- REST API for products: create, read, update, delete
- Filter by category, search by name, and pagination
- Admin panel to add, edit and delete products
- Server-side validation and error handling

## Technologies used
MongoDB, Mongoose, Express.js, React (Vite), Node.js, JWT, bcryptjs, Axios, React Router

## Setup and installation
Requirements: Node.js 18+, and MongoDB (local) or a MongoDB Atlas connection string.

```
git clone <your-repo-url>
cd wearhub

cd server
npm install
cp .env.example .env     # then edit MONGO_URI and JWT_SECRET
npm run seed             # sample products + admin user (clears existing data)

cd ../client
npm install
```

## Running the application
Terminal 1:
```
cd server
npm run dev
```
Terminal 2:
```
cd client
npm run dev
```
Open http://localhost:5173

Admin login after seeding: `admin@wearhub.com` / `admin123`

## API summary
| Method | Route | Access |
|---|---|---|
| POST | /api/auth/register, /api/auth/login | Public |
| GET | /api/products?category=&search=&page= | Public |
| GET | /api/products/:id | Public |
| POST, PUT, DELETE | /api/products, /api/products/:id | Admin |

## Code0 usage
(Write this section yourself, truthfully, after you have actually used Code0.)

## AI Development Experience
(List 3-5 real tasks where Code0 helped, and how you checked its output.)

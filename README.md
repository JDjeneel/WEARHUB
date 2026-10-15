# WearHub

A full-stack e-commerce application for browsing and managing products.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** Configure according to the backend setup

## Project Structure

```text
wearhub/
├── client/       # Frontend application
├── server/       # Backend API
├── .gitignore
└── README.md
```

## Getting Started

### 1. Frontend

```bash
cd client
npm install
npm run dev
```

### 2. Backend

Open a separate terminal:

```bash
cd server
npm install
```

Configure the required environment variables using `server/.env.example`, then start the backend using the script defined in `server/package.json`.

## Features

- User authentication
- Product catalog
- Admin interface

## Security

Do not commit `.env` files containing credentials, passwords, or API keys.
- UI redesign: Code0 planned and applied a boutique-style restyle (sticky navbar, hero banner, product cards, detail page and login styling). Its build check passed, and I checked the pages in the browser before committing.
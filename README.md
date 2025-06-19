# Rating-Review-System

This project is a full-stack application for product ratings and reviews, built with [Next.js](https://nextjs.org) for the frontend and [Node.js/Express.js](https://expressjs.com/) for the backend.

---

## Project Structure

```
rating-review-system/
├── rating-review-backend/                     # Node.js/Express.js backend
├── rating-review-backend/package.json         # Backend dependencies and scripts
├── src/                                       # Next.js frontend (app directory)
├── public/                                    # Static assets and static product data
├── .env                                       # Backend environment variables (in backend folder)
├── package.json                               # Frontend dependencies and scripts
└── README.md                                  # Project documentation
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/Md-Mursaleen/Rating-Review-System.git
```

### 2. Setup and Run the Backend

1. Go to the backend directory:
    ```sh
    cd rating-review-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in `rating-review-backend/` with the following content:
    ```
    PORT=8080
    MONGO_URL=<your-mongodb-connection-string>
    ```
    Replace `<your-mongodb-connection-string>` with your actual MongoDB URI.

4. Start the backend server:
    ```sh
    node app.js
    ```
    The backend will run on [http://localhost:8080](http://localhost:8080).

### 3. Setup and Run the Frontend

1. Go back to the root directory:
    ```sh
    cd ..
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Start the Next.js development server:
    ```sh
    npm run dev
    ```
    The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Testing the Application

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Browse products, view details, and submit reviews.
- The frontend communicates with the backend for product and review data.

---

## Notes

- The backend requires a valid `.env` file with your MongoDB connection string.
- If the backend is unavailable, the frontend will attempt to serve product data from `public/productsData.json`.
- Make sure both servers (frontend and backend) are running for full functionality.
- For deployment, see [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---
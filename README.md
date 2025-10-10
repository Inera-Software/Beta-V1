
# INERA SOFTWARE QUICK-IS BETA V.1 (Frontend)

Welcome to the frontend for INERA SOFTWARE QUICK-IS BETA V.1, a Business Intelligence (BI) platform designed to transform your business data into actionable insights. This Next.js application serves as the user interface for the INERA platform.

## Application Architecture: Decoupled Frontend/Backend

This project is built as a **decoupled frontend**. This is an intentional architectural choice to support a team of specialized frontend and backend developers.

- **Frontend (This Repository)**: A [Next.js](https://nextjs.org/) application responsible for all user interface components, views, and interactions. It fetches data from an external backend via API calls.

- **Backend (Separate Repository)**: The backend is expected to be a separate application built with a technology like **Python (Django/Flask)**, **Express.js**, or another backend framework. It is responsible for all business logic, database interactions, and data processing. It exposes a series of REST or GraphQL API endpoints that the frontend consumes.

This separation of concerns allows the frontend and backend teams to work and deploy their applications independently.

## Workflow for Developers

### Frontend Developers

- Your work is contained entirely within this repository.
- You will build React components, create pages, and manage the UI/UX.
- To get data, you will make `fetch` requests to the API endpoints provided by the backend team.
- The `src/app/api` directory can be used for creating mock API routes during development before the actual backend endpoints are ready.

**Example of fetching data in a component:**

```javascript
// In a React component...
useEffect(() => {
  async function fetchData() {
    // URL for the backend API endpoint
    const response = await fetch('https://your-backend-api.com/v1/data'); 
    const data = await response.json();
    // ... then use the data to set state
  }
  fetchData();
}, []);
```

### Backend Developers

- You will work in a **separate repository** for the backend application (e.g., a Django or Express.js project).
- Your primary responsibility is to create API endpoints that provide the data needed by the frontend.
- You should provide the frontend team with the URLs and data structures for each endpoint.
- You do not need to modify any code in this Next.js repository.

## Getting Started (Frontend)

To run this frontend application on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Install Dependencies

Navigate to the project's root directory in your terminal and install the required npm packages.

```bash
npm install
```

### 2. Run the Development Server

Once the dependencies are installed, you can start the development server.

```bash
npm run dev
```

This will start the application in development mode. You can view it by opening [http://localhost:3000](http://localhost:3000) in your web browser.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

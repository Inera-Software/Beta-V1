# INERA SOFTWARE QUICK-IS BETA V.1 (Frontend)

Welcome to the frontend repository for INERA SOFTWARE QUICK-IS BETA V.1. This application is a Business Intelligence (BI) platform designed to transform your business data into actionable insights, built with Next.js and React.

This project serves as the client-facing user interface and consumes data from a separate backend API.

## Architecture Overview

This project follows a decoupled, or "headless," architecture:

-   **Frontend (This Repository)**: A Next.js application responsible for all UI and user interaction. It fetches data from and sends data to the backend API.
-   **Backend (Separate Repository)**: A separate server built with a framework like **Python (Django, Flask)** or **Node.js (Express)**. The backend handles all business logic, database interactions, and data processing, exposing its services through a REST or GraphQL API.

This separation allows frontend and backend teams to work independently and deploy their services separately.

## Core Features

-   **Data Analysis**: Upload your business data (CSV, XLSX) to analyze and visualize key trends.
-   **Advanced Analytics Suite**: Dive deep into your data with a comprehensive set of tools available on the Analytics page.
-   **Interactive Dashboards**: After uploading data, view an interactive dashboard with AI-powered insights and a chart generator.
-   **AI Assistant**: A chatbot is available throughout the application to assist users.

## Getting Started (For Frontend Developers)

To run this application on your local machine, follow these steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20 or later)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   A running instance of the backend API server.

### 1. Configure Backend Connection

This application needs to know the URL of your backend API. Create a `.env` file in the root of the project and add the following line, replacing the URL with the actual address of your running backend server.

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

This tells the frontend where to send its API requests.

### 2. Install Dependencies

Navigate to the project's root directory in your terminal and install the required npm packages.

```bash
npm install
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the Next.js development server.

```bash
npm run dev
```

This will start the frontend application in development mode. You can view it by opening [http://localhost:3000](http://localhost:3000) in your web browser. The application will make API calls to the URL you configured in the `.env` file.

## Workflow for Backend Developers

Backend developers do not work in this repository. Your role is to:

1.  **Develop the API**: Build and maintain the backend server using your preferred technology (e.g., Python, Django, Node.js).
2.  **Define API Endpoints**: Create the endpoints that the frontend will call to fetch and submit data (e.g., `/api/data`, `/api/insights`).
3.  **Provide the API URL**: Give the base URL of your running backend server to the frontend developers so they can configure it in their `.env` file.

The frontend is responsible for calling your API endpoints; the backend is responsible for implementing them.

## Frontend Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme. The design is guided by a specific style palette:
    -   **Primary Color**: Bright Yellow (`hsl(45, 100%, 50%)`)
    -   **Background Color**: Very Dark Blue (`hsl(224, 80%, 2%)`)
    -   **Accent Color**: Deep Blue (`hsl(216, 100%, 40%)`)
    -   **Fonts**: `Montserrat` for headlines and `Roboto` for body text.

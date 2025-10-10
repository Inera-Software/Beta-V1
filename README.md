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
-   **Advanced Analytics Suite**: Dive deep into your data with a comprehensive set of tools:
    -   **Forecasting Analyst**: Predict future sales, customer behavior, and inventory needs.
    -   **Problem & Suggestion Engine**: Identifies business problems from your data and provides solutions.
    -   **Visuals & Dashboards**: Create custom charts, KPIs, and interactive dashboards to monitor performance.
    -   **Audit Zone**: Access a tailored compliance dashboard with company-specific rules, laws, and regulatory updates.
-   **Automated Document Generation**: Create professionally formatted documents like Business Requirement Documents (BRDs) and presentations (PPTs) directly from your data and analyses.
-   **Collaboration & Sharing**: Securely share insights, reports, and daily updates with your team.

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

## Frontend Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme. The design is guided by a specific style palette:
    -   **Primary Color**: Bright Yellow (`hsl(45, 100%, 50%)`)
    -   **Background Color**: Very Dark Blue (`hsl(224, 80%, 2%)`)
    -   **Accent Color**: Deep Blue (`hsl(216, 100%, 40%)`)
    -   **Fonts**: `Montserrat` for headlines and `Roboto` for body text.

## UI Components

The user interface is built using a combination of custom components and a library of reusable components from **ShadCN UI**. Below is a list of the core components available in the project, which can be found in the `src/components/ui` directory. This serves as a quick reference for developers.

-   **Accordion**: For vertically stacked sections of content.
-   **Alert Dialog**: For modal dialogs that interrupt the user.
-   **Avatar**: For displaying user profile images or fallbacks.
-   **Badge**: For labels and status indicators.
-   **Button**: For actions and user interactions.
-   **Calendar**: For date selection.
-   **Card**: For grouping related content in a container.
-   **Carousel**: For displaying items in a scrollable container.
-   **Chart**: For data visualization (powered by Recharts).
-   **Checkbox**: For binary selection.
-   **Collapsible**: For showing and hiding content sections.
-   **Dialog**: For modal pop-ups and forms.
-   **Dropdown Menu**: For menus triggered by a button.
-   **Form**: For building accessible forms with validation.
-   **Input**: For text entry fields.
-   **Label**: For form field labels.
-   **Menubar**: For creating desktop-style menus.
-   **Popover**: For content that appears on top of other elements.
-   **Progress**: For displaying progress bars.
-   **Radio Group**: For selecting one option from a set.
-   **Scroll Area**: For scrollable content areas.
-   **Select**: For dropdown selection controls.
-   **Separator**: For visual dividers.
-   **Sheet**: For side panels and drawers.
-   **Sidebar**: For the main application navigation.
-   **Skeleton**: For loading state placeholders.
-   **Slider**: For range selection.
-   **Switch**: For toggling between on/off states.
-   **Table**: For displaying tabular data.
-   **Tabs**: For organizing content into switchable tabs.
-   **Textarea**: For multi-line text input.
-   **Toast**: For displaying non-intrusive notifications.
-   **Tooltip**: For displaying information on hover.

# INERA SOFTWARE QUICK-IS BETA V.1

Welcome to INERA SOFTWARE QUICK-IS BETA V.1, a Business Intelligence (BI) platform designed to transform your business data into actionable insights. This application provides data analysis, forecasting, and automated document generation to help you make smarter, data-driven decisions.

## Core Features

- **Data Analysis**: Upload your business data (CSV, XLSX) to analyze and visualize key trends.
- **Advanced Analytics Suite**: Dive deep into your data with a comprehensive set of tools:
    - **Forecasting Analyst**: Predict future sales, customer behavior, and inventory needs.
    - **Problem & Suggestion Engine**: Identifies business problems from your data and provides solutions.
    - **Visuals & Dashboards**: Create custom charts, KPIs, and interactive dashboards to monitor performance.
    - **Audit Zone**: Access a tailored compliance dashboard with company-specific rules, laws, and regulatory update
- **Automated Document Generation**: Create professionally formatted documents like Business Requirement Documents (BRDs) and presentations (PPTs) directly from your data and analyses.
- **Collaboration & Sharing**: Securely share insights, reports, and daily updates with your team.
- **Cloud Integration**: Connect to cloud data sources to streamline your data pipeline (feature in development).

## Getting Started

To run this application on your local machine, follow these steps, which must be followed

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Install Dependencies

First, navigate to the project's root directory in your terminal and install the required npm packages.

```bash
npm install
```

### 2. Run the Development Server

Once the dependencies are installed, you can start the development server.

```bash
npm run dev
```

This will start the application in development mode. You can view it by opening [http://localhost:3000](http://localhost:3000) in your web browser.

## Tech Stack & Design

INERA Navigator is built with a modern, scalable, and performant technology stack.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme. The design is guided by a specific style palette:
    - **Primary Color**: Bright Yellow (`hsl(45, 100%, 50%)`)
    - **Background Color**: Very Dark Blue (`hsl(224, 80%, 2%)`)
    - **Accent Color**: Deep Blue (`hsl(216, 100%, 40%)`)
    - **Fonts**: `Montserrat` for headlines and `Roboto` for body text.
      
## UI Components

The user interface is built using a combination of custom components and a library of reusable components from **ShadCN UI**. Below is a list of the core components available in the project, which can be found in the `src/components/ui` directory. This serves as a quick reference for developers.

- **Accordion**: For vertically stacked sections of content.
- **Alert Dialog**: For modal dialogs that interrupt the user.
- **Avatar**: For displaying user profile images or fallbacks.
- **Badge**: For labels and status indicators.
- **Button**: For actions and user interactions.
- **Calendar**: For date selection.
- **Card**: For grouping related content in a container.
- **Carousel**: For displaying items in a scrollable container.
- **Chart**: For data visualization (powered by Recharts).
- **Checkbox**: For binary selection.
- **Collapsible**: For showing and hiding content sections.
- **Dialog**: For modal pop-ups and forms.
- **Dropdown Menu**: For menus triggered by a button.
- **Form**: For building accessible forms with validation.
- **Input**: For text entry fields.
- **Label**: For form field labels.
- **Menubar**: For creating desktop-style menus.
- **Popover**: For content that appears on top of other elements.
- **Progress**: For displaying progress bars.
- **Radio Group**: For selecting one option from a set.
- **Scroll Area**: For scrollable content areas.
- **Select**: For dropdown selection controls.
- **Separator**: For visual dividers.
- **Sheet**: For side panels and drawers.
- **Sidebar**: For the main application navigation.
- **Skeleton**: For loading state placeholders.
- **Slider**: For range selection.
- **Switch**: For toggling between on/off states.
- **Table**: For displaying tabular data.
- **Tabs**: For organizing content into switchable tabs.
- **Textarea**: For multi-line text input.
- **Toast**: For displaying non-intrusive notifications.
- **Tooltip**: For displaying information on hover.


## How to Operate the Application

1.  **Sign Up**:
    - The application provides sign-up paths for both **Industrialist & Admins** and **Employees & Workers**.
    - **Admins** go through a detailed, multi-step setup process to configure the company profile.
    - **Employees** have a simpler sign-up process requiring a User ID and password.

2.  **Main Dashboard**:
    - After signing in, you land on the main dashboard.
    - Here, you can **upload your business data files**.
    - Once uploaded, you can generate insights and visualize your data.
    - From the dashboard, you can **proceed to the detailed analytics suite** to explore the data further.

3.  **Analytics Suite**:
    - Navigate through the various analytics tools from the sidebar or the main analytics page.
    - Use the **Forecasting Analyst** to predict future trends, or the **Problem & Suggestion** tool to identify and solve business challenges.
    - Create documents, presentations, and custom dashboards based on your analysis.

This README should provide a clear and helpful guide for anyone interacting with the INERA Navigator application.

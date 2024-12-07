🚀 User Management System

A simple React-based application that allows users to log in using the [ReqRes API](https://reqres.in/), manage authentication state, and access a user dashboard. The project uses modern tools like React Router, Axios, and TailwindCSS for styling, and demonstrates best practices in form handling and authentication.

## Features

- Login functionality using the ReqRes API.
- Authentication state management with context.
- User redirection based on authentication status.
- Dark mode UI with responsive design.
- Notifications for login success or failure using `react-toastify`.

## Technologies Used

- **Frontend**: React, React Router, Axios, React Toastify, Tailwind CSS
- **Backend**: Reqres API (external API for user data)
- **Authentication**: Basic authentication flow with local state
- **Styling**: Tailwind CSS

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** as a package manager.

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repo**:

```bash
git clone https://github.com/your-username/UserManage.git
cd user-management-app
```

2. **Install dependencies**:

npm install

# or

yarn install

3. **Ensure TailwindCSS is installed**:

- If TailwindCSS styles are not working, run the following command to reinstall it: npm install tailwindcss
  Note: This issue may occur if TailwindCSS is missing from the node_modules folder. Running the command resolves the issue and ensures styles are applied correctly.

## Running the Application

1. **Start the development server**:

npm start

# or

yarn start

## Usage

- Visit http://localhost:3000 in your web browser.
- Log in to access the application features securely using the following credentials:
  - **Email:** eve.holt@reqres.in
  - **Password:** cityslicka
- Manage users seamlessly using the dashboard, including options to view, edit, and delete user information.

## API Endpoints

| Method | Endpoint            | Description                              |
| ------ | ------------------- | ---------------------------------------- |
| GET    | `/api/users?page=1` | Retrieve a list of users with pagination |
| PUT    | `/api/users/:id`    | Update user details by ID                |
| DELETE | `/api/users/:id`    | Delete a user by ID                      |

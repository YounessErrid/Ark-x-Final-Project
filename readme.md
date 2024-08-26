
# Event Management Platform

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Screenshots](#screenshots)
-   [API Documentation](#api-documentation)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Introduction

The Event Management Platform is a web application designed to simplifies event planning by connecting clients with the right event managers and service providers, making it easier to plan and execute extraordinary events such as weddings, parties, and corporate events. This platform is built using the MERN stack (MongoDB, Express.js, React, Node.js), providing a full-stack solution for event management.

## Features

-   **User Authentication:** Secure login and registration with Passport.JS (Sessions & Cookies).
-   **Event Tracking:** Monitor event metrics and statistics.
-   **Responsive Design:** Fully responsive interface suitable for all devices.

### User Management

-   **User Registration and Login:** Users can create accounts and securely log in to access the platform's features.
-   **User Profiles:** Users can manage their personal information and preferences.
### Agency Management

-   **Agency Profiles:** Event agencies can create and manage profiles, showcasing their services, team members, past events, and client testimonials.
### Search Functionality

-   **Agency Search:** Users can search for event agencies based on services provided, event types, location, etc...
### Payment Functionality

-   **Subscription Plans:** Agencies can subscribe to different plans to access premium features.
-   **Stripe Payment Gateway :** Agencies can pay subscription using Card.
 ### Admin Panel

-   **Dashboard:** Administrators can monitor the application statistics, manage content, manage admins, and oversee platform performance.
-   **Content Management:** Admins can manage user accounts, profiles, and listings.

## Technologies Used

-   **Frontend:** React.js, DaisyUI(TailwindCSS)
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Authentication:** JSON Web Tokens (JWT)
-   **Other Tools:**
    -   *Axios* for HTTP requests
    -   *Mongoose* for MongoDB object modeling
    -   *Redux* for state management

## Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    

    `git clone https://github.com/yourusername/event-management-platform.git
    cd event-management-platform` 
    
2.  **Install dependencies for both frontend and backend:**

    `cd client
    npm install
    cd ../server
    npm install` 
    
3.  **Set up environment variables:**
    
    -   Create a `.env` file in the `server` directory.
    -   Add the following variables:
    
    `MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key` 
    
4.  **Run the application:**
    
    `cd server
    npm run dev` 
    
    The frontend React app should be running on `http://localhost:3000`, and the backend server on `http://localhost:5000`.
    

## Usage

Once the application is running:

1.  Register as a new user or log in with existing credentials.
2.  Create a new event by navigating to the "Create Event" section.
3.  View and manage your events through the dashboard.
4.  Allow other users to register for your events.

## Screenshots

_Description of the screenshot_

_Description of the screenshot_

## API Documentation

-   **GET** `/api/events` - Get all events
-   **POST** `/api/events` - Create a new event
-   **GET** `/api/events/:id` - Get a single event by ID
-   **PUT** `/api/events/:id` - Update an event by ID
-   **DELETE** `/api/events/:id` - Delete an event by ID
-   **POST** `/api/users/register` - Register a new user
-   **POST** `/api/users/login` - User login

_For full API documentation, please refer to the API Documentation._

## Contributing

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/YourFeature`
3.  Make your changes and commit them: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin feature/YourFeature`
5.  Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Feel free to reach out to me for any questions or suggestions:

-   **Name:** Your Name
-   **Email:** your.email@example.com
-   **Portfolio:** youness-dev.vercel.app
-   **LinkedIn:** [Your LinkedIn](https://www.linkedin.com/in/yourprofile)

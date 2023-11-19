# Log Viewer

Welcome to the Log Viewer project! This application provides a simple web-based interface to ingest and search logs stored in a MongoDB database. The project is built using Node.js, Express.js, and Mongoose for the backend, and it has a basic HTML frontend for log searching.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [System Design](#system-design)
- [Features](#features)

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or remote)
- Access to a `.env` file for environment variables (see [Configuration](#configuration))

### Installation
1. Clone the repository
2. Install dependencies:
  ```bash
  npm install
  ```
3. Run the server:
  ```bash
  npm start
  ```
### Configuration
Create a .env file in the project root with the following content:
  ```bash
  MONGODB_URI=<your-mongodb-uri>
  PORT=<desired-port>
  JWT_SECRET_KEY=<your-secret-key>
  ```
## System Design
The system is divided into several components:

### Backend (Node.js and Express):

- **index.js:** The main server file that handles log ingestion, log searching, and serves the HTML frontend.
- **middleware.js:** Contains middleware functions for checking user authentication and access permissions.
- **services.js:** Implements services for data injection and log querying.
- **utils.js:** Provides utility functions for token creation and verification.
### Frontend (HTML):

- **index.html:** A simple HTML file with a form for log searching and a section to display log results.
### Database (MongoDB):

- **models:** Contains Mongoose models for User and Logs.

## Features
1. ### Log Ingestion (/inject):

- **Endpoint:** POST /inject
- Allows the ingestion of logs into the MongoDB database.
2. ### Log Searching (/search):

- **Endpoint:** POST /search
- Requires user authentication and checks access permissions based on user roles.
- Supports various search parameters like level, message, resourceId, timestamp, commit, spanId, traceId, and metadata.parentResourceId.
3. ### User Authentication:

- Middleware for checking if the user is authenticated before allowing log searching.
4. ### Role-Based Access Control:

- Access to specific search parameters is determined by the user's role.

Feel free to contribute to the project by addressing these issues or adding new features!

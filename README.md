# Project Management Web Application

## Overview

The Project Management Web Application is a sophisticated tool designed to streamline project management processes. Leveraging a modern technology stack, this web application empowers users to efficiently organize and monitor client information alongside associated projects. The user interface is thoughtfully crafted, providing a seamless experience for adding clients and projects, updating their details, and overseeing project statuses.

## Key Features

- **Client and Project Management**: Easily add and manage clients by providing essential information such as name, email, and phone number. Create projects with associated details like project name, description, and status.

- **Update and Delete Functionality**: Flexibly update or remove client and project records, allowing users to adapt to changing requirements.

- **Project Assignment**: Assign projects to specific clients, facilitating better organization and tracking of project-client relationships.

- **Cascading Deletion**: Ensures data consistency by implementing a cascading deletion mechanism. If a client is deleted and is assigned to one or more projects, the associated projects will be automatically deleted.

## Technologies Utilized

The application is built using cutting-edge technologies:

- **Frontend**: React.js, Bootstrap, GraphQL, React Router, Apollo Client.

- **Backend**: Express.js, Node.js, GraphQL-Express, MongoDB.

## Getting Started

To run the project locally:

1. Clone the repository to your local machine.
2. Navigate to the respective `frontend` and `backend` directories.
3. Install the required dependencies using `npm install`.
4. Configure the MongoDB settings for the backend.
5. Start the backend server using `npm start`.
6. Start the frontend application using `npm start`.

Now, you can access the project management web application in your browser, providing an intuitive and efficient platform for managing clients and projects.

# job-board-app
Job Board Application

## Introduction
Job Board Application to post and view job applications

## Requirements
- NodeJs (version>=20.x.x)

## Installation
- Install Node JS (>=v20.x.x) for your operating system. Ref: https://nodejs.org/en/download
- Install MongoDB, either locally (https://www.mongodb.com/docs/manual/installation/) on your machine or register on atlas. Once you have the Database ready, replace the url in ./job-board-api/.env file.\
    `MONGODB_CONNECTION_URI={your_db_uri}`

- Installation for Backend application (Express)
    - Navigate to the backend application folder: \
        `cd ./job-board-api`
    - Install packages through package manager: \
        `npm install`
    - Run the development server: \
        `npm run dev`

- Installation for Frontend application (React)
    - Navigate to the frotend application folder: \
        `cd ./job-board-ui`
    - Install packages through package manager: \
        `npm install`
    - Start the development server: \
        `npm start`

Your application is now running on `http://localhost:3000`
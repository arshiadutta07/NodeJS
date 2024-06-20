Clone the Repository:
git clone https://github.com/arshiadutta07/NodeJS.git
cd PROJECT MYSQL

Install Dependencies:
npm install

Create Database:
Create Database in MySQL server first.

Configure the .env File:
Inside the .env file, add environment variables in the following format
JWT_SECRET_KEY=your_strong_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET = "your_passport_session_secret"
DATABASE_NAME = "your_database_name"
DATABASE_USERNAME = "your_database_username"
DATABASE_PASSWORD = "your_database_password"

Start Project:
npm start

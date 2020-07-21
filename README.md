<!-- Create a readme with:
title
description
all technologies used
1 or 2 screenshots
setup instructions
deployment instructions -->

# So green eco-challenge desktop app

## Description

The project is a responsive desktop app created with Next.js.

The shop features following pages and functionality:

- home page which shows static information and a new random daily tip every day;
- register, login and logout possibility for users implemented manually using Postgres database;
- challenges page which allows for filtering with categories;
- user profile page (public, everyone can see it, but only the user can manipulate challenges) containing the user's level (based on the number of completed challenges), a list of active and completed challenges featuring start and finish dates, how many times a challenge was completed, and a possibility to share a challenge on WhatsApp, Facebook, or Twitter;
- on challenges page the user has a possibility to use a starting date of the challenge, if none is chosen, the date is today by default, on the start date of the challenge the user receives a reminder email;
- challenges appear on the user page under 'Active challenges' when the user clicks on the 'Challenge accepted' button and under 'Completed challenges' when the 'I made it' button is clicked on;
- the header shows the name of the user currently logged in;
- articles page fetches articles using an API from https://newsapi.org/ and filters them using a key word to show only articles relevant for the topic;

Challenges page: <img src="/public/screenshot1.png" width="200">

Profile page: <img src="/public/screenshot2.png" width="200">

## Technologies used

So green is a Next.js app which makes use of a PostgresQL database.
API routes are used to carry out tasks.
Migrations are set up with Ley(https://github.com/lukeed/ley).
I used cookies to keep track of user login.  
Some pages and components are written using Typescript.
Email service of choice is SendGrid (https://sendgrid.com/).
Scheduler used to send delayed emails is cronjob (https://cron-job.org/en/).
Deployment was carried out with Heroku.

## Setup instructions

### Database Setup

Copy the .env.example file to .env and add the database connection information.

You'll also need PostgreSQL for this.

#### PostgreSQL Installation instructions

Follow the instructions from the PostgreSQL step on https://www.postgresql.org/docs/10/runtime.html

Run the following queries inside of psql to set up the database and the user:

CREATE DATABASE `<databasename>`;
CREATE USER `<username>` WITH ENCRYPTED PASSWORD `'<password>'`;
GRANT ALL PRIVILEGES ON DATABASE `<databasename>` TO `<username>`;
Then, to connect to the database using this new user, quit psql and reconnect:

`\q`
`psql -U <username> <databasename>`

You can run the migrations with the following command:
`yarn migrate up`

To drop the last migration run the following in your terminal:
`yarn migrate down`

### Deployment instructions for Heroku

- Sign up for Heroku: https://signup.heroku.com/
- Create a new App
- Choose a name and select your region
- Click on the button in the middle called "Connect to GitHub"
- Search for your repository in the search box at the bottom of the page and click on the "Connect" button
- Click on the button for "Enable Automatic Deploys"
- Go back to the Overview tab and click on "Configure Add-On"
- Search for "Postgres" and select "Heroku Postgres" from the results

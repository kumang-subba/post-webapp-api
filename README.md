# Post WebApp API

## Overview

This is the backend for <a href="https://github.com/kumang-subba/post-webapp">Post Web App</a>.

## Features

- Send presigned url for image uploads to s3.
- AWS RDS with MySql for database.

## Tech Stack

[![Backend](https://skillicons.dev/icons?i=js,nodejs,express,aws,mysql)](https://skillicons.dev)

## Getting started

1. Clone the repository: `git clone https://github.com/kumang-subba/post-webapp-api.git`
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start the backend server: `npm run start`

## Configuration for s3

1. AWS s3 Configuration: Set up an AWS S3 bucket for secure image storage and retrieval
2. Add proper access and policies to the bucket
3. Setup cors configuration in the bucket
4. Add an IAM user with appropriate access and attach required policies

## Configuration for RDS with MySQL

1. Create MySQL database in AWS RDS
2. Remember to select the Free tier (!important)
3. Database username and password is created when database is created
4. Edit inbound rules to allow traffic from your ip i.e "My IP"
5. Database host is Endpoint in connection & security on the DB's instance page.

.env sample

```js
BUCKET_NAME=
BUCKET_REGION=
AWS_USER_ACCESS_KEY_ID=
AWS_USER_SECRET_ACCESS_KEY=

DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE_HOST=

JWT_SECRET_KEY=
```

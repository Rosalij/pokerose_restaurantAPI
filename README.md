# Restaurant API

This repository contains code for a simple REST API built with Express and NodeJS. This API is built to handle a simple website for a restaurant.
The API uses routes to update, delete, create and get images, orders, food menu items, drink menu items.
The API also uses routes for registering and logging in as Admin.
The log in route creates a JSON Web Token which can be stored in local storage in frontend to authenticate an admin user to access certain routes.
The token also contains the admins username.

## Link
a live version of the API is available at this url:(https://m4-jwlg.onrender.com/api)

## Installation
This API is using a MongoDB database with mongoose.
Clone the files, run npm install to install neccessary packages.
Mongoose schemes for database structure is in /models.
The database should contain these fields:
|Collection-name|documents  |
|--|--|
|admin  | _id, username: string, password: string(hashed), created: date|
|food | _id, name: string, price: string, description: string, created: date  |
|drink | _id, name: string, price: string, created: date  |
|image | _id, url: string, description: string |
|order |_id, name: string, phoneno: string, food: string, drink: string, note: string, created: date  |
## Usability
How you can reach the API is described below:

|Method  |endpoint    |Description                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    | /image     |get all images                                                 |
|GET    | /food          |get food items                                                           |
|GET    | /drink   | get all drinks                 |
|GET    | /order   | get all orders (token required)                |
|POST   | /login     |log in admin user, store json web token |
|POST   | /register |store new admin user to database (token required)                           |
|POST   | /food | store new food item (token required)                     |
|POST   | /drink | store new drink item (token required)                           |
|POST   | /image | store new image (token required)                           |
|DELETE   | /image:_id | delete image with selected _ID (token required)                          |
|DELETE   | /food:_id | delete food item with selected _ID (token required)                          |
|DELETE   | /drink:_id | delete drink item with selected _ID (token required)                           |
|DELETE   | /order:_id | delete order  with selected _ID (token required)                           |
|PATCH   | /order:_id | update part of order with selected _ID (token required)                           |
|PATCH   | /drink:_id | update part of order with selected _ID (token required)                           |
|PATCH   | /food:_id | update part of order with selected _ID (token required)                           |


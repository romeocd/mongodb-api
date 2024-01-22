
# MongoDB Social Network API

## Description
This Social Network API is a backend application that allows users to share their thoughts, react to friends' thoughts, and create a friend list. It's built using Node.js, Express.js, MongoDB, and Mongoose ODM, providing a robust platform for social media interactions.

## Features
- Create, read, update, and delete users and thoughts.
- Add and remove friends for each user.
- Add and remove reactions to thoughts.

## Installation
To install this project, follow these steps:
1. Clone the repository to your local machine:
   ```
   git clone https://github.com/romeocd/mongodb-socialnetwork-api
   ```
2. Navigate to the project directory:
   ```
   cd mongodb-socialnetwork-api
   ```
3. Install the necessary dependencies:
   ```
   npm install
   ```

## Usage
To start the server, run the following command in your terminal:
```
npm start
```
Once the server is running, you can use API testing tools like Postman or Insomnia to interact with the API.

## API Endpoints
- `GET /api/users`: Fetch all users.
- `GET /api/users/:id`: Fetch a single user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.
- `POST /api/users/:userId/friends/:friendId`: Add a friend.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend.
- `GET /api/thoughts`: Fetch all thoughts.
- `GET /api/thoughts/:id`: Fetch a single thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.
- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Models
- `User`: Includes username, email, thoughts, friends, and a virtual for friend count.
- `Thought`: Includes thought text, creation date, username, reactions, and a virtual for reaction count.
- `Reaction`: A subdocument schema in the Thought model, used for reactions.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Contributing
Please contact me at:
GitHub:romeocd
Email: rdumlao07@gmail.com

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Walkthrough Video
Part 1: https://drive.google.com/file/d/19kFymwLpdFuwoUrVw3VY48iDOlfBuQeJ/view

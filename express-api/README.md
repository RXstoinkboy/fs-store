# Task Manager Express API

This is a simple Express API project connected to a MongoDB database. It serves as a task manager API and is primarily intended for learning purposes. It's just a tiny app to train whole full stack cycle with Docker, Express, Next.

## How to Run the Project

# Task Manager Express API

This is a simple Express API project connected to a MongoDB database. It serves as a task manager API and is primarily intended for learning purposes.

## How to Run the Project

To run the project, you have two options:

### Option 1: Run as a Docker Container

To run the project as a Docker container, follow these steps:

1. Clone the repository to your local machine.
2. Install Docker on your machine if you haven't already.
3. Build the Docker image by running the following command in the project directory:
   ```bash
   docker compose build
   ```
4. Start the Docker containers by running the following command:
   ```bash
   docker compose up
   ```
5. The API will be accessible at `http://localhost:3000` (or the port specified in the `PORT` environment variable if provided).

### Option 2: Run locally:

To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command in the project directory:
   ```
   npm install
   ```
3. Set up a MongoDB database and update the connection string in the project's configuration file (`config.js` or similar) to point to your database. (MongoDB connection string should be provided as MONGO_URI env variable)
4. Start the server by running the following command:
   ```
   npm start
   ```
5. The API will be accessible at `http://localhost:3000`. (or port which is specified in PORT env variable if provided)

## API Endpoints

The following endpoints are available:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task by ID
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

Feel free to explore and experiment with the API endpoints for learning purposes.

## Contributing

This project is intended as a learning exercise and is not actively maintained. However, if you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

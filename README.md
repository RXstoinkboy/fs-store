# fs-store

## Express Backend

The Express backend of fs-store implements the following features:

- **Endpoint with Query Implementation**: The backend provides an endpoint that supports query parameters for retrieving specific data.

- **Validation with Zod**: Input data is validated using the Zod library, ensuring that only valid data is processed.

- **MongoDB Connection**: The backend is connected to a MongoDB database, allowing data to be stored and retrieved.

- **Simple Authentication with JWT**: The backend supports authentication using JSON Web Tokens (JWT). Users can obtain a token by providing valid credentials.

- **Token Blacklisting**: The backend has a mechanism to blacklist tokens, allowing users to log out and invalidate their tokens.

- **Protected Route (Profiles)**: The backend includes a protected route for accessing user profiles. Only authenticated users can access this route.

## Vue Client

The Vue client of fs-store is built with the following technologies:

- **Vue-Query**: The client uses Vue-Query for in-memory data caching, allowing efficient data retrieval and manipulation.

- **Vue-Router**: The client utilizes Vue-Router for routing, enabling navigation between different views.

- **Pinia**: Pinia is used as the state management solution for the Vue client, providing a centralized store for managing application state.

- **Vuetify**: The client is styled using Vuetify, a popular Vue UI framework that provides a set of pre-designed components.

- **Authentication Flow (In Progress)**: The client is currently implementing an authentication flow, which will allow users to log in and access their profile information. Only authenticated users will be able to view this information.

Please refer to the respective documentation and source code for more detailed information on the implementation of the Express API and Vue client.
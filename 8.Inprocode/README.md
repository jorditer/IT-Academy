# Sprint 8

This is sprint focused on creating a full-stack project. I decided to create a database using MongoDB, Node and Express. There are 3 mongo collections, 2 of them with a complete CRUD which can be edited through a table and a calendar respectively, the third collection is used to display locations in a MapBox map.

## Project Structure

```
.env
.gitignore
backend/
	config/
		db.js
	controllers/
		coordinates.controller.js
		event.controller.js
		note.controller.js
	models/
		coordinates.model.js
		events.model.js
		note.model.js
	reset/
		events.json
		locations.json
		notes.json
	routes/
		coordinates.route.js
		event.route.js
		note.route.js
	server.js
eslint.config.js
frontend/
	index.html
	src/
		components/
		hooks/
		...
	tsconfig.app.json
	tsconfig.json
	tsconfig.node.json
package.json
tailwind.config.js
vite.config.ts
```

## Backend

The backend is built with Node.js, Express, and MongoDB. It provides RESTful APIs to manage events, notes, and coordinates.

### Configuration

The backend configuration is managed using environment variables defined in the 

#### .env file:
- `MONGO_URL` MongoDB connection string
- `PORT` Port number for the server
- `VITE_MAPBOX_TOKEN`: Mapbox token for map visualization

### Database Connection

The database connection is established in `db.js` using Mongoose.

### Controllers

- Event Controller: Handles **CRUD** operations for events.
- Note Controller: Handles **CRUD** operations for notes.
- Coordinates Controller: Handles fetching coordinates.

### Models

- Event Model: Defines the schema for events.
- Note Model: Defines the schema for notes.
- Coordinates Model: Defines the schema for coordinates.

### Routes

- Event Routes: Defines routes for event operations.
- Note Routes: Defines routes for note operations.
- Coordinates Routes: Defines routes for fetching coordinates.

### Running the Backend

To start the backend server, run:

```sh
npm run dev
```

## Frontend

The frontend is built with React, TypeScript, and Tailwind CSS. It provides a user interface to interact with the backend APIs.

### Components

- App: Main application component.
- Crud: Component for managing events.
- Calendar: Component for managing notes in a calendar view.
- Graphics: Component for visualizing event data.
- Map: Component for visualizing locations on a map.
- Navbar: Navigation bar component.

### Hooks

- useEvents: Custom hook for fetching events.
- useEventMutations: Custom hook for event mutations (create, update, delete).
- useNotes: Custom hook for fetching notes.
- useNoteMutations: Custom hook for note mutations (create, update, delete).
- useCoordinates: Custom hook for fetching coordinates.

### Running the Frontend

To start the frontend development server, run:

```sh
npm run vite
```
## Linting

To lint the codebase, run:

```sh
npm run lint
```
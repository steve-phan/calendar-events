# Getting Started with Create React App

This project was bootstrapped with [Create React App- typescript](https://github.com/facebook/create-react-app).

### 1. Installing -In the project `Root` directory

`yarn` or `npm install`

### 2. Environment variables

`touch .env` (and add `MONGODB_URL=**************`)

### 3. Start the server

`yarn dev` (`netlify dev` under the hook to serve netlify functions and runs server on http://localhost:8888)

### 4. For testing

`yarn test`

### 5. TODO:

- handle multiple events on same day(_Potential solution: if greater than 3 events, we add a show more button to open `Popover` to render all events_)
- implements `next`, `prev` month feature
- drag-drop to sort events
- responsive
- bump test coverage

### [Demo live version](https://calendar-services.netlify.app/)

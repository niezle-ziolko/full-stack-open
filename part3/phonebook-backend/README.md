# Phonebook Application

This is a simple Phonebook application that allows users to manage their contacts. The application consists of a backend built with Cloudflare Workers and a frontend built with React.

All API endpoints are available under: **[https://phonebook-backend.niezle-ziolko.workers.dev/](https://phonebook-backend.niezle-ziolko.workers.dev/)**

## Features

- Add new contacts with a name and phone number.
- View a list of all contacts.
- Delete contacts from the phonebook.
- Filter contacts by name.
- Display information about the number of contacts.

## Technologies Used

- **Backend**: Cloudflare Workers
- **Frontend**: React
- **State Management**: React Hooks
- **Styling**: CSS (or any preferred styling method)

## API Endpoints

### GET /api/persons
- Returns a list of all contacts in JSON format.

### POST /api/persons
- Adds a new contact.
- **Request Body**: 

  ```json
  {
    "name": "Contact Name",
    "number": "Contact Number"
  }
  ```
- Response: Returns the added contact in JSON format.

### GET /api/persons/:id
Returns a specific contact by ID.

### DELETE /api/persons/:id
Deletes a contact by ID.

### PUT /api/persons/:id
- Updates an existing contact's phone number.
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "number": "Updated Number"
  }
  ```
- **Response**:
  - If successful, returns the updated contact in JSON format.
  - If the contact does not exist, returns a 404 error.
  - If the request body is invalid, returns a 400 error.

### GET /info
Returns information about the number of contacts and the current date and time.
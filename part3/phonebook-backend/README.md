# Phonebook Application

This is a simple Phonebook application that allows users to manage their contacts. The application consists of a backend built with Cloudflare Workers and a frontend built with React.

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

- Response: Returns the added contact in JSON format.

### GET /api/persons/:id
Returns a specific contact by ID.

### DELETE /api/persons/:id
Deletes a contact by ID.

### GET /info
Returns information about the number of contacts and the current date and time.
# Part0 - Full Stack Open

This repository contains solutions for Part0 exercises (0.1–0.6) of the Full Stack Open course.

## Project Structure

All tasks for Part0 are organized under the `part0` directory. The project focuses on understanding the basic functioning of web applications by analyzing request/response cycles and user interactions through diagrams. This part does not involve writing any code for actual applications but instead emphasizes grasping fundamental concepts of how browsers and servers communicate.

## Contents

### 0.1: HTML

Reviewed the basics of HTML by reading the [Mozilla HTML tutorial](https://developer.mozilla.org/en-US/docs/Learn/HTML).  
No files were submitted for this exercise, as it was reading-only.

### 0.2: CSS

Reviewed the basics of CSS by reading the [Mozilla CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS).  
No files were submitted for this exercise, as it was reading-only.

### 0.3: HTML Forms

Learned the basics of HTML forms by reading [Mozilla's Your first form tutorial](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form).  
No files were submitted for this exercise, as it was reading-only.

### 0.4: New Note Diagram

Created a diagram illustrating what happens when a user writes a new note and clicks the Save button on the [notes application page](https://studies.cs.helsinki.fi/exampleapp/notes).  
The diagram was made using the Mermaid syntax and demonstrates the following steps:
- User writes in the input field and clicks Save.
- Browser sends a POST request to the server.
- Server processes the new note and responds.
- Browser reloads or re-renders the list of notes with the new addition.

### 0.5: Single Page App Diagram

Created a diagram illustrating the events when a user accesses the [single-page app version](https://studies.cs.helsinki.fi/exampleapp/spa) of the notes application.  
The diagram depicts:
- Browser requests the SPA HTML page.
- Browser fetches necessary CSS and JavaScript files.
- JavaScript runs in the browser and fetches the existing notes data.
- The app dynamically renders the content without additional page reloads.

### 0.6: New Note in Single Page App Diagram

Created a diagram showing what happens when a user creates a new note in the single-page version of the notes application.  
The process includes:
- User types a note and submits it.
- JavaScript sends the new note data to the server using a POST request via Fetch API.
- Server responds confirming the note was received.
- JavaScript updates the page dynamically to include the new note without a full page reload.

## How to View Diagrams

All diagrams were created using [Mermaid syntax](https://mermaid-js.github.io/mermaid/#/).  
To view the diagrams properly, GitHub's Markdown rendering must be used or any Markdown viewer that supports Mermaid diagrams.

## Notes

- Exercises were submitted part-by-part as required. Once exercises for a part were submitted, no further modifications were made.
- If the repository is private, the user `mluukkai` has been added as a collaborator.
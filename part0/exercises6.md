sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types text and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: JavaScript adds the new note to the list in local memory

    Note right of browser: The page updates the list of notes without reloading
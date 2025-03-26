import { MongoClient, ObjectId } from 'mongodb';

// Function that handles fetch events
export default {
    async fetch(request, env) {
        // MongoDB connection URI using credentials from the environment variables
        const uri = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.ama5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const client = new MongoClient(uri);
        let db;

        // Connect to MongoDB
        await client.connect();
        db = client.db(`${env.DB_NAME}`);
        
        // Handle the request using the connected database instance
        return handleRequest(request, db);
    }
};

async function handleRequest(request, db) {
    const url = new URL(request.url);
    const method = request.method;

    // Set CORS headers to allow cross-origin requests
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle preflight requests for CORS
    if (method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    };

    if (url.pathname === '/api/persons' && method === 'GET') {
        // Fetch all persons from the database
        const persons = await db.collection('persons').find({}).toArray();
        
        return new Response(JSON.stringify(persons), { headers });
    } else if (url.pathname === '/info' && method === 'GET') {
        // Display the number of persons and current time
        const count = await db.collection('persons').countDocuments();
        const time = new Date();

        return new Response(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`, {
            headers: { 'Content-Type': 'text/html', ...headers }
        });
    } else if (url.pathname.startsWith('/api/persons/') && method === 'GET') {
        // Fetch a specific person by ID
        const id = url.pathname.split('/').pop();
        const person = await db.collection('persons').findOne({ _id: new ObjectId(id) });

        if (person) {
            return new Response(JSON.stringify(person), { headers });
        } else {
            return new Response(JSON.stringify({ error: 'Person not found' }), { status: 404, headers });
        };
    } else if (url.pathname.startsWith('/api/persons/') && method === 'DELETE') {
        // Delete a person by ID
        const id = url.pathname.split('/').pop();
        const result = await db.collection('persons').deleteOne({ _id: new ObjectId(id) });
    
        if (result.deletedCount === 1) {
            return new Response(null, { status: 204, headers });
        } else {
            return new Response(JSON.stringify({ error: 'Person not found' }), { status: 404, headers });
        };
    } else if (url.pathname === '/api/persons' && method === 'POST') {
        // Add a new person to the database
        const requestBody = await request.json();
        const { name, number } = requestBody;

        // Validate input data
        if (!name || !number) {
            return new Response(JSON.stringify({ error: 'name or number is missing' }), { status: 400, headers });
        };

        // Check if the name is already in use
        const existingPerson = await db.collection('persons').findOne({ name });
        
        if (existingPerson) {
            return new Response(JSON.stringify({ error: 'name must be unique' }), { status: 400, headers });
        };

        // Insert new person into the database
        const newPerson = { name, number };
        const result = await db.collection('persons').insertOne(newPerson);
        newPerson._id = result.insertedId;

        return new Response(JSON.stringify(newPerson), { status: 201, headers });
    } else if (url.pathname.startsWith('/api/persons/') && method === 'PUT') {
        // Update an existing person's details
        const id = url.pathname.split('/').pop();
        const requestBody = await request.json();
        const { name, number } = requestBody;
    
        // Validate input data
        if (!name || !number) {
            return new Response(JSON.stringify({ error: 'name and number are required' }), { status: 400, headers });
        };
    
        // Update the person in the database
        const result = await db.collection('persons').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, number } }
        );
    
        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Person not found' }), { status: 404, headers });
        };
    
        // Retrieve the updated person
        const updatedPerson = await db.collection('persons').findOne({ _id: new ObjectId(id) });
    
        return new Response(JSON.stringify(updatedPerson), { status: 200, headers });
    };

    // Return a 404 response for any unknown endpoint
    return new Response('Not Found', { status: 404, headers });
};
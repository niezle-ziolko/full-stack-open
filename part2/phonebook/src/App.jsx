import { useState, useEffect } from 'react';
import personService from './personService'; // Import the personService module

// Filter Component
const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

// PersonForm Component
const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// Person Component
const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </li>
  );
};

// Persons Component
const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

// App Component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null); // State for notification

  useEffect(() => {
    // Fetch initial data from the server
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setNotification('Error fetching data from server'); // Set error notification
        setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const existingPerson = persons.find(person => person.name === newName);
    
    if (existingPerson) {
      // If the person already exists, ask for confirmation to update the number
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        
        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName(''); // Clear the input field for name
            setNewNumber(''); // Clear the input field for number
            setNotification(`Updated ${returnedPerson.name}'s number`); // Set notification
            setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setNotification(`Error updating ${newName}. Person may have been deleted.`); // Set error notification
            setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
          });
      };
    } else if (newName && newNumber) {
      const newPerson = { name: newName, number: newNumber };
      
      // Use personService to add the new person
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)); // Add the new person to the list
          setNewName(''); // Clear the input field for name
          setNewNumber(''); // Clear the input field for number
          setNotification(`Added ${returnedPerson.name}`); // Set notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        })
        .catch(error => {
          console.error('Error adding person:', error);
          setNotification(`Error adding ${newName}. Please try again.`); // Set error notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        });
    };
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id)); // Update the state to remove the deleted person
          setNotification('Person deleted'); // Set notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setNotification('Error deleting person. Please try again.'); // Set error notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        });
    };
  };

  // Filter persons based on the search term
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && <div className="notification">{notification}</div>} {/* Notification display */}

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleFormSubmit}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
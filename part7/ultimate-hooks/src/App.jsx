import React from "react";
import useField from "./hooks/useField";
import useResource from "./components/useResource";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("https://3005-niezleziolk-fullstackop-75vdjot4u3u.ws-eu118.gitpod.io/notes");
  const [persons, personService] = useResource("https://3005-niezleziolk-fullstackop-75vdjot4u3u.ws-eu118.gitpod.io/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input value={content.value} onChange={content.onChange} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input value={name.value} onChange={name.onChange} /> <br />
        number <input value={number.value} onChange={number.onChange} />
        <button>create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  );
};

export default App;
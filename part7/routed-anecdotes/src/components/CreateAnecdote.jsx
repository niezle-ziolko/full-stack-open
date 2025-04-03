import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/index";

export default function CreateAnecdote({ newAnecdote, setSuccessMessage }) {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    newAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });

    setSuccessMessage(`Anecdote "${content.value}" has been added!`);
    setTimeout(() => setSuccessMessage(""), 5000);

    content.reset();
    author.reset();
    info.reset();
    
    navigate("/");
  };

  return (
    <div>
      <h2>Add new Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url
          <input
            type={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => { content.reset(); author.reset(); info.reset(); }}>
          clear
        </button>
      </form>
    </div>
  );
};
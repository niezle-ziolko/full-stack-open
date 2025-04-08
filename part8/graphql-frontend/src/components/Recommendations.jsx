import { useQuery } from '@apollo/client';

import { MY_GENRES, FILTER_BOOKS } from './queries';

const Recommendations = () => {
  const { loading: loadingGenres, data: genresData } = useQuery(MY_GENRES);
  const favoriteGenres = genresData && genresData.myGenres ? genresData.myGenres : [];

  const { loading: loadingBooks, data: booksData } = useQuery(FILTER_BOOKS, {
    variables: { genre: favoriteGenres.length > 0 ? favoriteGenres[0] : null },
    skip: favoriteGenres.length === 0
  });

  const books = booksData ? booksData.allBooks : [];

  if (loadingGenres || loadingBooks) {
    return <div>Loading...</div>;
  };

  return (
    <div>
      <h2>Favorite Books</h2>
      {favoriteGenres.length === 0 ? (
        <p>No favorite genres found.</p>
      ) : (
        <div>
          <h3>Genres:</h3>
          <ul>
            {favoriteGenres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <h3>Books:</h3>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
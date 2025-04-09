import React, { useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

const BookSubscription = () => {
  const { data, loading } = useSubscription(BOOK_ADDED);

  useEffect(() => {
    if (!loading && data) {
      const book = data.bookAdded;
      alert(`📚 Nowa książka: "${book.title}" autora ${book.author.name}`);
      // Możesz też dodać do listy itp.
    }
  }, [data, loading]);

  return null; // albo np. jakiś log
};

export default BookSubscription;
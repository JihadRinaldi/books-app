// App.tsx
import React, { useEffect, useState } from 'react';
import BookList, { Book } from './components/BookList/BookList';
import { BooksProvider } from './components/FavoritesContext';
import Spinner from './components/Spinner/Spinner';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://my-json-server.typicode.com/cutamar/mock/books')
      .then(response => response.json())
      .then((data: Book[]) => {
        const updatedData = data.map(book => ({
          ...book,
          isCreated: false
        }))
        setBooks(updatedData);
      })
      .catch(error => console.error('Error fetching books:', error))
      .finally(() => setTimeout(() => {
        setIsLoading(false);
      }, 250))
  }, []);

  if (isLoading) {
    return (<Spinner />)
  }

  return (
    <div>
      <h1>📚 Library</h1>
      <BooksProvider>
        <BookList books={books} />
      </BooksProvider>
    </div>
  );
}

export default App;

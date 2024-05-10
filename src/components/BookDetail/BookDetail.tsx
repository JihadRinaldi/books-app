// BookDetail.tsx
import React from 'react';
import './BookDetail.scss';
import ImageWithFallback from '../ImageWithFallback/Image';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
}

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {

  const formattedPublicationDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    } catch(err) {
      return ''
    }
  };
  return (
    <div>
      <h2>{book.title}</h2>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Description: </b>{book.description}</p>
      <p><b>Publication Date: </b>{formattedPublicationDate(book.publicationDate)}</p>
      <ImageWithFallback width={100} height={150} src={book.cover} alt={book.title} />
    </div>
  );
}

export default BookDetail;

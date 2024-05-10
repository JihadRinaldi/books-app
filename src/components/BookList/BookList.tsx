
import React, { useMemo, useState } from 'react';
import { useBooks } from '../FavoritesContext';
import BookDetail from '../BookDetail/BookDetail';
import Pagination from '../Pagination/Pagination';
import './BookList.scss'
import ImageWithFallback from '../ImageWithFallback/Image';
import BookForm, { FormData } from '../BookForm/BookForm';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
  isCreated: boolean;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { favorites, createdBooks, addFavorite, removeFavorite, addBook, handleSetCreatedBooks, removeBook } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [action, setAction] = useState<'create' | 'edit'>('create');
  const itemsPerPage = 5;

  const isFavorite = (id: number) => favorites.some(book => book.id === id);

  const handleFavoriteToggle = (book: Book) => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const handleAddBookSubmit = (data: FormData) => {
    const { author, cover, description, publicationDate, title } = data
    const bookData: Book = {
      id: allBooks.length + 1,
      title,
      author,
      cover,
      description,
      publicationDate,
      isCreated: true,
    }

    addBook(bookData);
    setShowAddBookModal(false);
  };

  const handleEditBookSubmit = (data: FormData) => {
    const { author, cover, description, publicationDate, title, id } = data;
    const editedBook: Book = {
      id: id as number,
      title,
      author,
      cover,
      description,
      publicationDate,
      isCreated: true,
    }
      const updatedCreatedBook = createdBooks.map((book) => {
        if (book.id === editedBook.id) {
          return editedBook;
        }
        return book;
      });
      handleSetCreatedBooks(updatedCreatedBook);
      localStorage.setItem('createdBooks', JSON.stringify(updatedCreatedBook));
      setShowAddBookModal(false);
  }

  const handleAddBook = () => {
    setAction('create');
    setShowAddBookModal(true);
  }

  const handleRemoveBook = (bookId: number) => {
    removeBook(bookId);
  }

  const handleEditBook = (book: Book) => {
    setEditBook(book);
    setAction('edit');
    setShowAddBookModal(true);
  }

  const handleViewDetail = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const allBooks = useMemo(() => {
    return books.concat(createdBooks);

  }, [books, createdBooks])

  const booksByPage = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return allBooks.slice(indexOfFirstItem, indexOfLastItem)
  }, [allBooks, currentPage])

  return (
    <div className="book-list-container">
      <button className='add-book-cta' onClick={handleAddBook}>Add New Book</button>

      <div className="book-list">
        {booksByPage.map(book => (
          <div key={book.id} className="book">
            <div className='book-cta'>
              <button onClick={() => handleFavoriteToggle(book)}>
                {isFavorite(book.id) ? (
                  <img width={16} height={16} src="/icons/heart-filled.svg" alt="Remove from Favorites" />
                ) : (
                  <img width={16} height={16} src="/icons/heart-outlined.svg" alt="Add to Favorites" />
                )}
              </button>
              {book.isCreated ? (
                <>
              <button onClick={() => (handleEditBook(book))}>
                <img width={16} height={16} src="/icons/edit.svg" alt="edit" />
              </button>
              <button onClick={() => (handleRemoveBook(book.id))}>
                <img width={16} height={16} src="/icons/delete.svg" alt="edit" />
              </button>
                </>
            ) : null}
            </div>
            <div onClick={() => handleViewDetail(book)} className='book-container'>
              <ImageWithFallback width={100} height={150} src={book.cover} alt={book.title} />
              <div className='book-content'>
                <h3>{book.title}</h3>
                <p>{`By: ${book.author}`}</p>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          totalItems={books.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      </div>
      {showAddBookModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='modal-title'>
              <h2>{action === 'create' ? 'Add New Book' : 'Edit Book'}</h2>
              <div className='close-modal' onClick={() => setShowAddBookModal(false)}>X</div>
            </div>
            <BookForm action={action} selectedBook={editBook} onCreate={handleAddBookSubmit} onEdit={handleEditBookSubmit} />
          </div>
        </div>
      )}
      {selectedBook && (
        <>
          <div className="full-screen-overlay" onClick={handleCloseModal}>
          </div>
          <div className="book-detail-modal">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <BookDetail book={selectedBook} />
          </div>
        </>
      )}
    </div>
  );
}

export default BookList;
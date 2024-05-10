// FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Book } from './BookList/BookList';


interface BooksContextType {
    favorites: Book[];
    createdBooks: Book[];
    addBook: (book: Book) => void;
    removeBook: (id: number) => void;
    addFavorite: (book: Book) => void;
    removeFavorite: (id: number) => void;
    handleSetCreatedBooks: (book: Book[]) => void;
}

const BooksContext = createContext<BooksContextType>({
    favorites: [],
    createdBooks: [],
    addBook: () => {},
    removeBook: () => {},
    addFavorite: () => {},
    removeFavorite: () => {},
    handleSetCreatedBooks: () => {},
});

export const useBooks = () => useContext(BooksContext);

interface BooksProviderProps {
  children: React.ReactNode
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Book[]>([]);
    const [createdBooks, setCreatedBooks] = useState<Book[]>([]);

    
    const handleSetCreatedBooks = (book: Book[]) => {
        setCreatedBooks(book);
    }

    const addFavorite = (book: Book) => {
        const newFavorite = [...favorites, book];
        setFavorites(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(newFavorite));

    };

    const removeFavorite = (id: number) => {
        const filteredFavorite = favorites.filter(book => book.id !== id);
        setFavorites(filteredFavorite);
        localStorage.setItem('favorites', JSON.stringify(filteredFavorite));
    };

    const removeBook = (id: number) => {
        const filteredBook = createdBooks.filter(book => book.id !==id);
        setCreatedBooks(filteredBook);
        localStorage.setItem('createdBooks', JSON.stringify(filteredBook));
    };

    const addBook = (book: Book) => {
        const newCreatedBook = [...createdBooks, book];
        setCreatedBooks(newCreatedBook);
        localStorage.setItem('createdBooks', JSON.stringify(newCreatedBook));
    }

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        const storedCreated = localStorage.getItem('createdBooks');
        if (storedCreated) {
            setCreatedBooks(JSON.parse(storedCreated));
        }
    }, [])

    return (
        <BooksContext.Provider value={{ favorites, createdBooks, addFavorite, removeFavorite, addBook, removeBook, handleSetCreatedBooks }}>
            {children}
        </BooksContext.Provider>
    );
};
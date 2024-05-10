// AddBookForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import './BookForm.scss'; // Import SCSS file
import { Book } from '../BookList/BookList';

interface AddBookFormProps {
  onCreate: (data: FormData) => void;
  onEdit: (data: FormData) => void;
  selectedBook: Book | null;
  action: 'edit' | 'create';
}

export interface FormData {
  id?: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
}

const BookForm: React.FC<AddBookFormProps> = ({ onCreate: onSubmit, onEdit, selectedBook, action }) => {
  const { handleSubmit, formState, control, setValue, reset } = useForm<FormData>();
  const { errors } = formState
  const [coverPreview, setCoverPreview] = useState<string | null>(null); // State for storing cover preview image

  const handleFormSubmit = (data: FormData) => {
    if (selectedBook) {
      onEdit(data)
    } else {
      onSubmit(data);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string); // Set cover preview
        setValue('cover', reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverPreview(null);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      const {id, author, cover, description, publicationDate, title } = selectedBook
      const defaultFormValue: FormData = {
        id,
        author,
        cover,
        description,
        publicationDate,
        title
      }
      setCoverPreview(cover);
      reset(defaultFormValue);
    }
  }, [reset, selectedBook, setValue])

  return (
    <form className='add-book-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div>
            {errors.title && <span>Title is required</span>}
            <input type="text" {...field} placeholder="Title" />
          </div>
        )}
      />

      <Controller
        name="author"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div>
            {errors.author && <span>Author is required</span>}
            <input type="text" {...field} placeholder="Author" />
          </div>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div>
            {errors.description && <span>Description is required</span>}
            <input type="text" {...field} placeholder="Description" />
          </div>
        )}
      />

      <div>
        {errors.cover && <span>Image is required</span>}
        <input type="file" accept='image/*' onChange={handleCoverChange} />
        {coverPreview && <img src={coverPreview} alt="Cover Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
      </div>

      <Controller
        name="publicationDate"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div>
            {errors.publicationDate && <span>Publication Date is required</span>}
            <input type="date" {...field} />
          </div>
        )}
      />

      <button type="submit">{action === 'create' ? 'Add Book' : 'Edit Book'}</button>
    </form>
  );
};

export default BookForm;
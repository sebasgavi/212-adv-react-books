import React from 'react';
import { BookType } from '../../types/BookType';
import { Box } from '@mui/material';
import { Book } from '../../components/Book/Book';
import { getBooks } from '../../utils/api';
import AddIcon from '@mui/icons-material/Add';
import { BookFormDialog } from '../BookFormDialog/BookFormDialog';
import { BottomRightFab } from '../../components/BottomRightFab/BottomRightFab';

interface BooksListProps {

}

export const BooksList: React.FC<BooksListProps> = () => {

  const [ books, setBooks ] = React.useState<BookType[]>([]);

  const [ open, setOpen ] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }

  React.useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
    });
  }, []);

  const handleBookAdded = () => {
    getBooks().then((books) => {
      setBooks(books);
    });
  }

  return (<Box>
    {books.map((book) => {
      return <Book key={book.title} bookObj={book} />
    })}

    <BookFormDialog
      open={open}
      onClose={handleClose}
      onBookAdded={handleBookAdded}
    />

    <BottomRightFab onClick={handleOpen}>
      <AddIcon />
    </BottomRightFab>
  </Box>);
}
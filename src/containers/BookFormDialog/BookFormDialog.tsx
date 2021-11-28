import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, LinearProgress, Snackbar, Alert } from '@mui/material';
import { addNewBook } from '../../utils/api';
import { BookError } from '../../types/BookError';

interface BookFormDialogProps {
  open: boolean;
  onClose: () => void;
  onBookAdded: () => void;
}

export const BookFormDialog: React.FC<BookFormDialogProps> = ({ open, onClose, onBookAdded }) => {
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState('');
  const [ success, setSuccess ] = React.useState(false);
  const handleClose = () => {
    onClose();
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(loading) return; // si está cargando, ignore lo siguiente
    setError('');
    const title = e.target.title.value;
    setLoading(true); // empieza a cargar
    const res = await addNewBook(title);
    setLoading(false); // termina de cargar
    if(res.status === 'ok') {
      onBookAdded();
      onClose();
      setSuccess(true);
    } else {
      switch(res.message) {
        case BookError.ALREADY_EXISTS:
          setError('There\'s a book with this same title');
          break;
        case BookError.EMPTY_TITLE:
          setError('You must fill the title');
          break;
      }
    }
  }
  const handleCloseSuccess = () => {
    setSuccess(false);
  }
  return (<>
    <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccess}>
      <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
        New book added!
      </Alert>
    </Snackbar>
    <Dialog open={open} onClose={handleClose}>
      {loading && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          New Book
        </DialogTitle>
        <DialogContent>
          <DialogContentText mb={1}>
            Enter the Title for the new Book.
          </DialogContentText>
          <TextField
            error={!!error}
            helperText={error}
            disabled={loading}
            autoFocus
            label="Book title"
            fullWidth
            name="title"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} type="button" onClick={handleClose}>Cancel</Button>
          <Button disabled={loading} type="submit">Save new book</Button>
        </DialogActions>
      </form>
    </Dialog>
  </>);
}
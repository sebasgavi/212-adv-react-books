import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { BooksList } from '../BooksList/BooksList';
import { styled } from '@mui/system';

interface AppProps {

}

const RelativeContainer = styled(Container)({
  position: 'relative',
  minHeight: '100vh',
});

export const App: React.FC<AppProps> = () => {

  return <RelativeContainer maxWidth="md">
    <CssBaseline />
    <BooksList />
  </RelativeContainer>;
}
import { BookError } from '../types/BookError';
import { BookType } from '../types/BookType';

const apiBase = 'http://localhost:3333';
const booksPath = '/books';

export const getBooks = async () => {
  const raw = await fetch(`${apiBase}${booksPath}`, {
    method: 'GET',
  });
  const books: BookType[] = await raw.json();
  return books;
}

export const addNewBook = async (title: string) => {
  const raw = await fetch(`${apiBase}${booksPath}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title }),
  });
  const data: {
    status: 'ok'|'error',
    message?: BookError,
    newBook?: BookType,
  } = await raw.json();
  return data;
}

export const getUser = async () => {
  fetch(`${apiBase}/users`)
}
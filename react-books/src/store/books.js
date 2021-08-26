import {booksAPI} from "../api";

const SET_BOOKS = 'SET_BOOKS';
const SET_FETCHING = 'SET_FETCHING';
const SET_BOOK = 'SET_BOOK';

const initialState = {
  books: [],
  currentBook: {},
  isFetching: false,
}

const books = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload,
      }
    case SET_BOOK:
      return {
        ...state,
        currentBook: action.payload,
      }

    default:
      return state;
  }
}

export const setBooks = data => ({type: SET_BOOKS, payload: data});
export const setBook = data => ({type: SET_BOOK, payload: data});
export const setIsFetching = status => ({type: SET_FETCHING, payload: status});

export const fetchBooks = (page) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await booksAPI.getBooks(page);
    dispatch(setBooks({
      items: response.data,
      totalPagesCount: response.last_page,
      page: response.current_page,
    }));

    dispatch(setIsFetching(false));
  };
};

export const fetchBook = (slug) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await booksAPI.getBook(slug);
    dispatch(setBook(response.item));
    dispatch(setIsFetching(false));
  };
};

export default books;
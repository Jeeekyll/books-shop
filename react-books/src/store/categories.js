import {categoriesAPI} from "../api";

const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_IS_LOADING = 'SET_IS_LOADING';

const initialState = {
  categories: [],
  isLoading: false,
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state;
  }
}

export const setCategories = data => ({type: SET_CATEGORIES, payload: data});
export const setIsLoading = status => ({type: SET_IS_LOADING, payload: status});

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    categoriesAPI.getCategories().then(response => {
      dispatch(setCategories(response.items));
    });
    dispatch(setIsLoading(false));
  }
}

export default categories;
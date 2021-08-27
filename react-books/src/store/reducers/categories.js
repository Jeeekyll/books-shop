import {categoriesAPI} from "../../api";

const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_IS_CURRENT_LOADING = 'SET_IS_CURRENT_LOADING';

const initialState = {
  categories: [],
  currentCategory: {},
  isLoading: false,
  isCurrentLoading: false,
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
    case SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      }
    case SET_IS_CURRENT_LOADING:
      return {
        ...state,
        isCurrentLoading: action.payload,
      }

    default:
      return state;
  }
}

export const setCategories = data => ({type: SET_CATEGORIES, payload: data});
export const setCategory = data => ({type: SET_CATEGORY, payload: data});

export const setIsLoading = status => ({type: SET_IS_LOADING, payload: status});
export const setIsCurrentLoading = status => ({type: SET_IS_CURRENT_LOADING, payload: status});

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const response = await categoriesAPI.getCategories();
    dispatch(setCategories(response.data));
    dispatch(setIsLoading(false));
  }
}

export const fetchCategory = (slug) => {
  return async (dispatch) => {
    if (!slug) return;

    dispatch(setIsCurrentLoading(true));
    const response = await categoriesAPI.getCategory(slug);
    dispatch(setCategory({...response.data}));
    return dispatch(setIsCurrentLoading(false));
  }
}

export default categories;
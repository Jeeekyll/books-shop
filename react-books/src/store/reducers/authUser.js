import {userAPI} from "../../api";

const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_AUTH_USER = 'SET_AUTH_USER';

const initialState = {
  isLoading: false,
  error: false,
  authUser: {},
}

const authUser = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    case SET_AUTH_USER:
      return {
        ...state,
        isLoading: false,
        authUser: payload,
      }

    default:
      return state;
  }
}

const setIsLoading = () => ({type: SET_IS_LOADING});
const setError = data => ({type: SET_ERROR, payload: data});
const setAuthUser = data => ({type: SET_AUTH_USER, payload: data});

export const fetchAuthUser = () => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    const token = localStorage.getItem('token');

    try {
      const response = await userAPI.getAuthUser(token);
      if (response) {
        dispatch(setAuthUser(response.data));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}

export default authUser;
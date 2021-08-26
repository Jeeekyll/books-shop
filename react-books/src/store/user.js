import {userAPI} from "../api";

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_IS_LOADING = 'SET_IS_LOADING';

const initialState = {
  user: {
    isLoggedIn: false,
  },
  isLoading: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {...action.payload},
      }
    case REMOVE_USER:
      return {
        ...state,
        user: {
          isLoggedIn: false,
        },
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

export const setUser = payload => ({type: SET_USER, payload});
export const removeUser = () => ({type: SET_USER});

export const setIsLoading = status => ({type: SET_IS_LOADING, payload: status});


export const fetchUser = token => {
  return async (dispatch) => {
    if (!token) {
      return dispatch(setUser({isLoggedIn: false}));
    }

    dispatch(setIsLoading(true));
    const response = await userAPI.getUser(token);
    dispatch(setUser({
      ...response,
      isLoggedIn: true,
    }));
    dispatch(setIsLoading(false));
  }
}

export const logoutUser = token => {
  return async (dispatch) => {
    if (!token) return;

    dispatch(setIsLoading(true));
    await userAPI.logout(token);
    localStorage.removeItem('token');
    dispatch(removeUser());
    dispatch(setIsLoading(false));
  }
}

export const loginUser = data => {
  return async (dispatch) => {
    if (!data) return;

    dispatch(setIsLoading(true));
    const response = await userAPI.login(data);
    dispatch(setUser({
      ...response.user,
      isLoggedIn: true,
    }));
    localStorage.setItem('token', response.token);
    dispatch(setIsLoading(false));
  }
}

export const registerUser = data => {
  return async (dispatch) => {
    if (!data) return;

    dispatch(setIsLoading(true));
    const response = await userAPI.register(data);
    console.log(response)

    dispatch(setUser({
      ...response.user,
      isLoggedIn: true,
    }));
    localStorage.setItem('token', response.token);
    dispatch(setIsLoading(false));
  }
}

export default user;
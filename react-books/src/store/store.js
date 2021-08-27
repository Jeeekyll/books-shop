import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import user from "./reducers/user";
import books from "./reducers/books";
import categories from "./reducers/categories";
import authUser from "./reducers/authUser";

const rootReducer = combineReducers({
  user,
  books,
  categories,
  authUser,
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

window.store = store;
export default store;
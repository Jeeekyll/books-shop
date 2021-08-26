import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import user from "./user";
import books from "./books";
import categories from "./categories";

const rootReducer = combineReducers({
  user,
  books,
  categories,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
export default store;
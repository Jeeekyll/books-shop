import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import BookSingle from "../pages/Home/BookSingle/BookSingle";
import CategorySingle from "../pages/Categories/CategorySingle";
import User from "../pages/User/User";

export const privateRoutes = [
  {path: '/', component: Home, exact: true},
  {path: '/about', component: About, exact: true},

  {path: '/books/:slug', component: BookSingle, exact: true},
  {path: '/categories/:slug', component: CategorySingle, exact: true},
  {path: '/user', component: User, exact: true}
];

export const publicRoutes = [

  {path: '/login', component: Login, exact: true},
  {path: '/register', component: Register, exact: true},

  {path: '/', component: Home, exact: true},
  {path: '/about', component: About, exact: true},

  {path: '/books/:slug', component: BookSingle, exact: true},
  {path: '/categories/:slug', component: CategorySingle, exact: true},
];
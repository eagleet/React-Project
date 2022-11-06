import { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";

import AuthContext from "../store/auth-context";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () =>{
    authCtx.logout();
    <Redirect to='/' />
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/auth">
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

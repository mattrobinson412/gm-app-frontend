import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
        <ul >
          <li >
            <NavLink className="nav-link" to="/courses">
              Courses
            </NavLink>
          </li>
          <li >
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li >
            <Link  to="/" onClick={logout}>
              Logout {currentUser.first_name || currentUser.username}
            </Link>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul >
          <li >
            <NavLink to="/login">
              Login
            </NavLink>
          </li>
          <li >
            <NavLink to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav >
        <Link to="/">
          Grace Music
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navigation;

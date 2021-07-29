import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
          <h1>See, Hear, Sing</h1>
          <p className="lead">Making music ministry accessible for the everyday churchmen.</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                  </p>
              )}
      </div>
  );
}

export default Homepage;

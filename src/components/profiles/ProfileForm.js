import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import graceMusicApi from "../../api/api";
import UserContext from "../auth/UserContext";

import useTimedMessage from "../hooks/UseTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our message hook,
 * `useTimedMessage`, by switching below.
 *
 * Routed as /profile
 * 
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our message hook
  // const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await graceMusicApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div>
        <h2>Profile</h2>
        <form>
            <div>
            <label>Username</label>
            <p>{formData.username}</p>
            </div>
            <div>
            <label>First Name</label>
            <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Last Name</label>
            <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Email</label>
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Confirm password to make changes:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ?
                <Alert type="success" messages={["Updated successfully."]} />
                : null}

            <button onClick={handleSubmit}>
                Save Changes
            </button>
        </form>
      </div>
  );
}

export default ProfileForm;

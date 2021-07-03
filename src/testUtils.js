import React from "react";
import UserContext from "./components/auth/UserContext";

const demoUser = {
  username: "testuser",
  password: "testpassword",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  is_admin: false
};

const UserProvider =
    ({ children, currentUser = demoUser = () => false }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };

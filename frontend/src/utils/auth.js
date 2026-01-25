/* Save user after login */
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/* Get logged in user */
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/* Check login status */
export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

/* Logout user */
export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

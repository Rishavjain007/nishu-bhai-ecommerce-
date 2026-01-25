/* Save user after login / register */
export const saveUser = (data) => {
  const user = {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,     // user | admin
    token: data.token,
  };

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

/* Check admin */
export const isAdmin = () => {
  const user = getUser();
  return user && user.role === "admin";
};

/* Logout user */
export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

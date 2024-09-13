// Get the authentication token from local storage
export function getAuthToken() {
  return localStorage.getItem("token");
}

// Check if the user is logged in
export function isAuthenticated() {
  const token = getAuthToken();
  return token !== null;
}

// Remove the authentication token (log out the user)
export function logout() {
  localStorage.removeItem("token");
}

// Redirect to login page if not authenticated
export function requireAuth(navigate) {
  if (!isAuthenticated()) {
    navigate("/login");
  }
}

// Set the authentication token (e.g., after login)
export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

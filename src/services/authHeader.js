export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("key"));

  if (user && user.token) {
    return { authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

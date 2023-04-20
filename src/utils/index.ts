import jwt_decode from "jwt-decode";

export const setUserData = (
  id: string,
  username: string,
  accessToken: string
) => {
  sessionStorage.setItem("userId", id);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("accessToken", accessToken);
};

export const getUser = () => {
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  return {
    userId,
    userName,
  };
};

export const checkAuth = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) return false;

  const decode = jwt_decode(accessToken) as { exp: number };

  if (!decode.exp || decode.exp < Date.now() / 1000) {
    return false;
  }

  return true;
};

import jwt from 'jsonwebtoken';

const TOKEN_STORAGE_KEY = 'dakdak-token';

export function setToken(token) {
  console.log(jwt.decode(token));
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getUserInfo() {
  return jwt.decode(localStorage.getItem(TOKEN_STORAGE_KEY));
}

export function isAuthenticated() {
  let token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return (typeof token === String);
}

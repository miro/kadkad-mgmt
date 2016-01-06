// This file is responsible for decoding JWT tokens, and saving &
// deleting them into localStorage.
import jwt from 'jsonwebtoken';
const TOKEN_STORAGE_KEY = 'dakdak-token';


export function setToken(token) {
  console.log('Saving token', token);
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getUserProfile() {
  if (isAuthenticated()) {
    return {
      loggedIn: true,
      profile: jwt.decode(localStorage.getItem(TOKEN_STORAGE_KEY))
    }
  } else {
    return {
      loggedIn: false, profile: {}
    };
  }
}

export function isAuthenticated() {
  let token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return (typeof token === 'string');
}

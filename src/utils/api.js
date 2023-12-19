import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const login = ({ login: email, password }) => {
  return fetch(`${API_URL}/auth/login/`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => handleResponse(res));
};

export const getUsers = ({ token }) => {
  return fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getUser = ({ token }) => {
  return fetch(`${API_URL}/auth/user/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const register = ({ user }) => {
  return fetch(`${API_URL}/auth/registration/`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  })
  .then(res => handleResponse(res));
};

export const editPerson = ({ token, first_name, last_name, middle_name, email }) => {
  return fetch(`${API_URL}/auth/user/`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ first_name, last_name, middle_name, email })
  })
  .then(res => handleResponse(res));
};

export const resetPassword = ({ email }) => {
  return fetch(`${API_URL}/auth/password/reset/`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  })
  .then(res => handleResponse(res));
};

export const updatePassword = ({ new_password1, new_password2, uid, token, }) => {
  return fetch(`${API_URL}/rest-auth/password/reset/confirm/`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ new_password1, new_password2, uid, token, })
  })
  .then(res => handleResponse(res));
};
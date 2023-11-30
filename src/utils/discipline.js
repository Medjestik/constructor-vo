import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getDiscipline = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/disciplines/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addDiscipline = ({ token, programId, discipline }) => {
  return fetch(`${API_URL}/programs/${programId}/disciplines/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ discipline })
  })
  .then(res => handleResponse(res))
};

export const editDiscipline = ({ token, programId, discipline }) => {
  return fetch(`${API_URL}/programs/${programId}/disciplines/${discipline.id}/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ discipline })
  })
  .then(res => handleResponse(res))
};

export const removeDiscipline = ({ token, programId, discipline }) => {
  return fetch(`${API_URL}/programs/${programId}/disciplines/${discipline.id}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const connectAbility = ({ token, disciplineId, abilityId }) => {
  return fetch(`${API_URL}/disciplines/${disciplineId}/attach_ability/${abilityId}/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const disconnectAbility = ({ token, disciplineId, abilityId }) => {
  return fetch(`${API_URL}/disciplines/${disciplineId}/detach_ability/${abilityId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const connectKnowledge = ({ token, disciplineId, knowledgeId }) => {
  return fetch(`${API_URL}/disciplines/${disciplineId}/attach_knowledge/${knowledgeId}/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const disconnectKnowledge = ({ token, disciplineId, knowledgeId }) => {
  return fetch(`${API_URL}/disciplines/${disciplineId}/detach_knowledge/${knowledgeId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};
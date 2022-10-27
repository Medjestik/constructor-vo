import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getCompetenceProfile = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/competence_profile`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addAbilities = ({ token, processId, ability }) => {
  return fetch(`${API_URL}/processes/${processId}/abilities`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ability })
  })
  .then(res => handleResponse(res))
};

export const connectAbilities = ({ token, processId, abilityId }) => {
  return fetch(`${API_URL}/processes/${processId}/attach_ability/${abilityId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const disconnectAbilities = ({ token, processId, abilityId }) => {
  return fetch(`${API_URL}/processes/${processId}/detach_ability/${abilityId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const editAbilities = ({ token, programId, ability }) => {
  return fetch(`${API_URL}/programs/${programId}/abilities/${ability.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ability })
  })
  .then(res => handleResponse(res))
};

export const removeAbilities = ({ token, programId, abilityId }) => {
  return fetch(`${API_URL}/programs/${programId}/abilities/${abilityId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addKnowledge = ({ token, abilityId, knowledge }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/knowledges`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ knowledge })
  })
  .then(res => handleResponse(res))
};

export const connectKnowledge = ({ token, abilityId, knowledgeId }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/attach_knowledge/${knowledgeId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const disconnectKnowledge = ({ token, abilityId, knowledgeId }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/detach_knowledge/${knowledgeId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const editKnowledge = ({ token, programId, knowledge }) => {
  return fetch(`${API_URL}/programs/${programId}/knowledges/${knowledge.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ knowledge })
  })
  .then(res => handleResponse(res))
};

export const removeKnowledge = ({ token, programId, knowledge }) => {
  return fetch(`${API_URL}/programs/${programId}/knowledges/${knowledge.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

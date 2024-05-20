import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getSemesters = ({ token, programId }) => { 
  return fetch(`${API_URL}/programs/${programId}/semesters?short=true/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getDisciplines = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/disciplines?short=true`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getStages = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/stages`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createDiscipline = ({ token, programId, discipline }) => {
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

export const constructDiscipline = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/unassociated_processes/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify()
  })
  .then(res => handleResponse(res))
};

export const attachDiscipline = ({ token, programId, source_id, destination_id }) => {
  return fetch(`${API_URL}/programs/${programId}/combine_disciplines/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ source_id, destination_id })
  })
  .then(res => handleResponse(res))
};

export const addSemester = ({ token, semesterId, disciplineId }) => {
  return fetch(`${API_URL}/semesters/${semesterId}/attach_discipline/${disciplineId}/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const removeSemester = ({ token, semesterId, disciplineId }) => {
  return fetch(`${API_URL}/semesters/${semesterId}/detach_discipline/${disciplineId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
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
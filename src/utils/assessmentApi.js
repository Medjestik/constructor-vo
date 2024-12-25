import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

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

export const getKnowledge = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/knowledges`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getKnowledgeData = ({ token, programId, knowledgeId }) => {
  return fetch(`${API_URL}/programs/${programId}/knowledges/${knowledgeId}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getQuestionsTypes = ({ token }) => {
  return fetch(`${API_URL}/question_types`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getKnowledgeQuestions = ({ token, knowledgeId }) => {
  return fetch(`${API_URL}/knowledges/${knowledgeId}/questions`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createQuestion = ({ token, knowledgeId, question }) => {
  return fetch(`${API_URL}/knowledges/${knowledgeId}/questions/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ question })
  })
  .then(res => handleResponse(res))
};

export const saveQuestion = ({ token, knowledgeId, question, questionId }) => {
  return fetch(`${API_URL}/knowledges/${knowledgeId}/questions/${questionId}/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ question })
  })
  .then(res => handleResponse(res))
};

export const deleteQuestion = ({ token, knowledgeId, questionId }) => {
  return fetch(`${API_URL}/knowledges/${knowledgeId}/questions/${questionId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getTasks = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/tasks`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getAbilities = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/abilities`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getAbilityData = ({ token, abilityId }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/tasks/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const createTask = ({ token, abilityId, task }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/tasks/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ task })
  })
  .then(res => handleResponse(res))
};

export const updateTask = ({ token, abilityId, task, taskId }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/tasks/${taskId}/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ task })
  })
  .then(res => handleResponse(res))
};

export const removeTask = ({ token, abilityId, taskId }) => {
  return fetch(`${API_URL}/abilities/${abilityId}/tasks/${taskId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

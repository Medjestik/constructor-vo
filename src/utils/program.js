import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getProgramList = ({ token }) => {
  return fetch(`${API_URL}/my_programs`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getLevel = ({ token }) => {
  return fetch(`${API_URL}/education_levels`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getDirection = ({ token }) => {
  return fetch(`${API_URL}/education_directions`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addProgram = ({ token, program }) => {
  return fetch(`${API_URL}/programs`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ program })
  })
  .then(res => handleResponse(res))
};

export const editProgram = ({ token, program }) => {
  return fetch(`${API_URL}/programs/${program.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ program })
  })
  .then(res => handleResponse(res))
};

export const removeProgram = ({ token, program }) => {
  return fetch(`${API_URL}/programs/${program.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getProgramItem = ({ token, id }) => {
  return fetch(`${API_URL}/programs/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getProgramRoles = ({ token }) => {
  return fetch(`${API_URL}/program_roles`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};


export const getProgramInfo = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/information`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};


export const addParticipant = ({ token, programId, participant }) => {
  return fetch(`${API_URL}/programs/${programId}/add_participant`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ participant })
  })
  .then(res => handleResponse(res))
};

export const editParticipant = ({ token, programId, participant }) => {
  return fetch(`${API_URL}/programs/${programId}/update_participant`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ participant })
  })
  .then(res => handleResponse(res))
};

export const removeParticipant = ({ token, programId, participant }) => {
  return fetch(`${API_URL}/programs/${programId}/remove_participant/${participant.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(res => handleResponse(res))
};
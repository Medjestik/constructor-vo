import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getShortDisciplines = ({ token, programId }) => {
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

export const getSemesters = ({ token, programId }) => {
	return fetch(`${API_URL}/programs/${programId}/semesters`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
	.then(res => handleResponse(res))
};

export const attachDiscipline = ({ token, semesterId, disciplineId }) => {
	return fetch(`${API_URL}/semesters/${semesterId}/attach_discipline/${disciplineId}/`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
	.then(res => handleResponse(res))
};

export const detachDiscipline = ({ token, semesterId, disciplineId }) => {
	return fetch(`${API_URL}/semesters/${semesterId}/detach_discipline/${disciplineId}/`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
	.then(res => handleResponse(res))
};

export const moveDiscipline = ({ token, sourceId, destinationId, disciplineId }) => {
	return fetch(`${API_URL}/semesters/${sourceId}/move_discipline/${disciplineId}/to/${destinationId}/`, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
	.then(res => handleResponse(res))
};

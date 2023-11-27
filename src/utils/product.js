import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const getProductsData = ({ token, programId }) => {
  return fetch(`${API_URL}/programs/${programId}/products_data`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addProduct = ({ token, programId, product }) => {
  return fetch(`${API_URL}/programs/${programId}/products/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product })
  })
  .then(res => handleResponse(res))
};

export const editProduct = ({ token, programId, product }) => {
  return fetch(`${API_URL}/programs/${programId}/products/${product.id}/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product })
  })
  .then(res => handleResponse(res))
};

export const removeProduct = ({ token, programId, product }) => {
  return fetch(`${API_URL}/programs/${programId}/products/${product.id}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getProduct = ({ token, programId, productId }) => {
  return fetch(`${API_URL}/programs/${programId}/products/${productId }`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

/*export const getProductStageList = ({ token, productId }) => {
  return fetch(`${API_URL}/products/${productId}/stages`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};*/

export const addStage = ({ token, productId, stage }) => {
  return fetch(`${API_URL}/products/${productId}/stages/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ stage })
  })
  .then(res => handleResponse(res))
};

export const editStage = ({ token, productId, stage }) => {
  return fetch(`${API_URL}/products/${productId}/stages/${stage.id}/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ stage })
  })
  .then(res => handleResponse(res))
};

export const removeStage = ({ token, productId, stage }) => {
  return fetch(`${API_URL}/products/${productId}/stages/${stage.id}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const changeOrderStage = ({ token, productId, stages }) => {
  return fetch(`${API_URL}/products/${productId}/stages/reorder/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ stages })
  })
  .then(res => handleResponse(res))
};

/*
export const getProductProcessList = ({ token, stageId }) => {
  return fetch(`${API_URL}/stages/${stageId}/processes`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};*/


export const addProcess = ({ token, stageId, process }) => {
  return fetch(`${API_URL}/stages/${stageId}/processes/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ process })
  })
  .then(res => handleResponse(res))
};

export const editProcess = ({ token, stageId, process }) => {
  return fetch(`${API_URL}/stages/${stageId}/processes/${process.id}/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ process })
  })
  .then(res => handleResponse(res))
};

export const removeProcess = ({ token, stageId, process }) => {
  return fetch(`${API_URL}/stages/${stageId}/processes/${process.id}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const changeOrderProductProcess = ({ token, stageId, processes }) => {
  return fetch(`${API_URL}/stages/${stageId}/processes/reorder/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ processes })
  })
  .then(res => handleResponse(res))
};



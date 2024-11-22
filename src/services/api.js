import axios from 'axios';

const API_URL = 'http://localhost:5026/api';

export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  axios.interceptors.request.use((config) => {
    console.log('Solicitud enviada:', config);
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
// Login
export const login = (credentials) => axios.post(`${API_URL}/Auth/login`, credentials);

// Entidades
export const getEntities = () => axios.get(`${API_URL}/Entities`);
export const createEntity = (entity) => axios.post(`${API_URL}/Entities`, entity);
export const updateEntity = (id, entity) => axios.put(`${API_URL}/Entities/${id}`, entity);
export const deleteEntity = (id) => axios.delete(`${API_URL}/Entities/${id}`);

// Empleados
export const getEmployees = (entityId) =>axios.get(`${API_URL}/Employees/${entityId || ''}`);  
export const createEmployee = (employee) => axios.post(`${API_URL}/Employees`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/Employees/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/Employees/${id}`);

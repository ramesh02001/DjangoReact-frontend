// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/myapp/', // Replace with your API base URL
});

export const registerUser = (data) => {
  return API.post('register/', data);
};

export const loginUser = (data) => {
  return API.post('login/', data);
};

export const getStudents = (token) => {
  return API.get('faculty/students/', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createStudent = (token, data) => {
  return API.post('faculty/create-student/', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStudent = (token, studentId, data) => {
  return API.patch(`faculty/update-student/${studentId}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getStudentProfile = (token) => {
  return API.get('student/profile/', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStudentProfile = (token, data) => {
  return API.patch('student/update-profile/', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

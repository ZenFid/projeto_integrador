import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const submitRegistration = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/cadastro`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw error;
  }
};

export const getRegistrationById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/cadastro/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw error;
  }
};
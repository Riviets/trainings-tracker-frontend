import axios from 'axios';

const API_URL = "http://localhost:3333/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const addUser = async (userData) => {
    try{
        const responce = await axios.post(API_URL, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return responce.data
    }
    catch(err){
        throw new Error('Error adding user')
    }
}

export const getUserInfoById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        throw new Error('Error fetching user info');
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (err) {
      throw new Error('Error updating user');
    }
  };

export const deleteUser = async (userId) => {
    try{
        await axios.delete(`${API_URL}/${userId}`)
    }
    catch(err){
        throw new Error('Error deleting user')
    }
}
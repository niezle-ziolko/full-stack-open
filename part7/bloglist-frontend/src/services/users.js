import axios from 'axios';

const baseUrl = 'https://3003-niezleziolk-fullstackop-75vdjot4u3u.ws-eu118.gitpod.io/api/users';

const getUser = async (id, token) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const getAllUsers = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

export default { getUser, getAllUsers };
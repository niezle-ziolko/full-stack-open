import axios from 'axios';

const baseUrl = 'https://3003-niezleziolk-fullstackop-7urkoi2nkbm.ws-eu118.gitpod.io/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: 'Bearer 12345'
    }
  });
  return request.then(response => response.data);
};

export default { getAll };
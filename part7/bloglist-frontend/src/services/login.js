import axios from 'axios';

const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3003/api/login', { username, password });

    if (response.status === 200) {
      return { username, token: response.data.token };
    } else {
      throw new Error('Login error');
    };
  } catch (error) {
    throw new Error('Server error');
  };
};

export default { login };
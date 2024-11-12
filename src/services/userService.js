import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8000/api/register', { email, phone, username, password });
};

const loginUser = (accountLogin, password) => {
    return axios.post('http://localhost:8000/api/login', { accountLogin, password });
};
export { registerNewUser, loginUser };

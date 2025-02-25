import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8000/api/register', { email, phone, username, password });
};

const loginUser = (accountLogin, password) => {
    return axios.post('http://localhost:8000/api/login', { accountLogin, password });
};

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8000/api/user/read?page=${page}&limit=${limit}`);
}
export { registerNewUser, loginUser, fetchAllUsers };

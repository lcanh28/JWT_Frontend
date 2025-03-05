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

const deleteUser = (user) => {
    return axios.delete("http://localhost:8000/api/user/delete", {data: {id: user.id}})
}
const fetchGroups = () => {
    return axios.get("http://localhost:8000/api/group/read")
}
const createNewUser = (userData) => {
    return axios.post("http://localhost:8000/api/user/create", {...userData})
} 

export { registerNewUser, loginUser, fetchAllUsers, deleteUser, fetchGroups, createNewUser };

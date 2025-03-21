import axios from '../setup/axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('/api/register', { email, phone, username, password });
};

const loginUser = (accountLogin, password) => {
    return axios.post('/api/login', { accountLogin, password });
};

const fetchAllUsers = (page, limit) => {
    return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (user) => {
    return axios.delete("/api/user/delete", {data: {id: user.id}})
}
const fetchGroups = () => {
    return axios.get("/api/group/read")
}
const createNewUser = (userData) => {
    return axios.post("/api/user/create", {...userData})
}
const updateUser = (userData) => {
    return axios.put("/api/user/update", {...userData})
}

export { registerNewUser, loginUser, fetchAllUsers, deleteUser, fetchGroups, createNewUser, updateUser };

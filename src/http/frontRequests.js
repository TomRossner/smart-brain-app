import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch,
}

export const login = async (credentials) => {
    const {email, password} = credentials
    const {data} = await httpService.post(`${BASE_URL}/login`, {email, password});
    console.log(data)
    return data;
}

export const register = async (data) => {
    return await httpService.post(`${BASE_URL}/users`, data);
}

export const updateUser = async (updatedUser) => {
    console.log(updatedUser);
    return await httpService.put(`${BASE_URL}/update-user/${updatedUser.email}`, updatedUser);
}
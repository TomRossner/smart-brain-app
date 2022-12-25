import axios from "axios";

const BASE_URL = "http://localhost:3001/";

export const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch,
}

export const login = async (credentials) => {
    const {data} = await httpService.post(BASE_URL + "sign-in", credentials);
    return data;
}

export const register = async (data) => {
    return await httpService.post(BASE_URL + "register", data);
}

export const getUsers = async () => {
    return await httpService.get(BASE_URL);
}
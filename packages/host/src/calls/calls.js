import { authURL, baseURL } from "./utils";
import axios from "axios";

export async function login(email, password) {
    try {
        const response = await axios.post(authURL + 'login', {
            email,
            password,
        });

        return response;
    } catch (error) {
        console.error(error);
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(authURL + 'logout');

        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getBooks = async () => {
    try {
        const response = await axios.get(`${baseURL}`);

        return response;
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteBook = (id) => {
    try {
        const response = axios.delete(`${baseURL}${id}`);

        return response;
    }
    catch (error) {
        console.error(error);
    }
}

export const createBook = (book) => {
    try {
        const response = axios.post(`${baseURL}`, book);

        return response;
    }
    catch (error) {
        console.error(error);
    }
}

export const updateBook = (id, book) => {
    try {
        const response = axios.patch(`${baseURL}${id}`, book);

        return response;
    }
    catch (error) {
        console.error(error);
    }
}
import { User } from "../dtos/user";
import { ersClient } from "./ers-client";
import { NewUser } from "../dtos/new-user";

export async function addUser(newUser: NewUser) {
    let response = await ersClient.post('/users', newUser);
    return await response.data;
}

export async function getUsers() {
    return await ersClient.get('/users');
}

export async function getUserById(id: number) {
    return await ersClient.get(`/users/${id}`);
}

export async function getUserByUniqueKey(key: string, value: string) {
    return await ersClient.get(`/users?${key}=${value}`);
}

export async function updateUser(updatedUser: NewUser) {
    let response = await ersClient.put('/users', updatedUser);
    return response.data;
}

export async function deleteUserById(id: number) {
    return await ersClient.delete(`/users/${id}`);
}

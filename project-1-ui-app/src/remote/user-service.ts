import { User } from "../dtos/user";
import { ersClient } from "./ers-client";
import { NewUser } from "../dtos/new-user";

export async function addUser(username: string, password: string, firstName: string, lastName: string, email: string, role: string) {
    let response = await ersClient.post('/users', {username, password, firstName, lastName, email, role});
    return (await response).data;
} 

export async function getUsers() {
    let response = await ersClient.get('/users');
    return await response.data;
}

export async function getUserById(id: number) {
    let response = ersClient.get(`/users/${id}`);
    return (await response).data;
}

export async function logout() {
    
}

export async function updateUser(u: NewUser) {
    let response = await ersClient.put('/users', {u});
    return await response.data;
}

export async function deleteUserById(id: number) {
    let response = await ersClient.delete(`/users/${id}`);
    return;
}

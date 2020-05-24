
import { ersClient } from "./ers-client";

import { Reimb } from "../dtos/reimb";
import { User } from "../dtos/user";

export async function addReimb(newRimb: Reimb, user: User) {
    let response = await ersClient.post('/reimbs', {newRimb, user});
    return (await response).data;
} 

export async function getReimbs() {
    let response = await ersClient.get('/reimbs');
    return await response.data;
}

export async function getReimbsByUser(username:string) {
    console.log('made it here ui');
    console.log(username);
    
    let response = await ersClient.get(`/reimbs/${username}`);
    console.log(response)
    return await(response.data)
}

export async function getReimbById(id: number) {
    return await ersClient.get(`/reimbs/${id}`);
}


export async function updateReimb(updatedReimb: Reimb) {
    let response = await ersClient.put('/reimbs', updatedReimb);
    return response.data;
}

export async function deleteReimbById(id: number) {
    return await ersClient.delete(`/reimbs/${id}`);
}

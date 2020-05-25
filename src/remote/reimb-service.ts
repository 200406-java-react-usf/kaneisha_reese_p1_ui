
import { ersClient } from "./ers-client";

import { Reimb } from "../dtos/reimb";
import { User } from "../dtos/user";

export async function addReimb(newReimb: Reimb, user: User) {
    console.log(newReimb);
    
    let response = await ersClient.post('/reimbs', {newReimb, user});
    return (await response).data;
} 

export async function getReimbs(...user:User[]) {
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


export async function updateReimb(updatedReimb: Reimb, manager: User) {
    console.log('made it here ui');
    console.log(updatedReimb);
    console.log(manager);
    
    
    let response = await ersClient.put('/reimbs', {updatedReimb, manager});
    return await response.data;
}

export async function deleteReimbById(id: number) {
    return await ersClient.delete(`/reimbs/${id}`);
}


import { ersClient } from "./ers-client";

import { Reimb } from "../dtos/reimb";



export async function getReimbs() {
    return await ersClient.get('/reimb');
}

export async function getReimbsByUser(username:string) {
    return await ersClient.get(`/reimb/${username}`)
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

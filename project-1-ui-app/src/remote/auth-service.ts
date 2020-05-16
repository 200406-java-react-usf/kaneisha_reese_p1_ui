import { User } from "../dtos/user";
import { ersClient } from "./ers-client";

export async function authenticate(username: string, password: string): Promise<User> {
    let response = await ersClient.post('/auth', {username, password});
    return await response.data;
}

export async function invalidateSession() {
    return await ersClient.post('/auth');
}

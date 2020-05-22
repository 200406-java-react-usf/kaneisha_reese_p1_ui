export class User {

    user_id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string

    constructor(
        id: number, 
        un: string,
        pw: string, 
        fn: string, 
        ln: string, 
        email: string,
        role: string) 
    {
        this.user_id = id;
        this.password = pw;
        this.username = un;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.role = role;
    }
}
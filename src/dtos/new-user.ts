export class NewUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: string;
    constructor(fn: string, ln: string, email: string, un: string, pw: string, role: string) 
    {
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.username = un;
        this.password = pw;
        this.role=role;
    }
}

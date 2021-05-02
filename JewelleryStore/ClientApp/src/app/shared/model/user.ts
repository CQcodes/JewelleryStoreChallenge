import { Role } from "./role";

export class User{
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    token?: string;
    role: Role;
}
export enum Role {
    User, Admin
}

export interface UserModel {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role?: Role;
}
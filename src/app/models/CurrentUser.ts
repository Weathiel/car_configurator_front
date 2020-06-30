import { Role } from './Role';

export class CurrentUser {
    username: string;
    email: string;
    password: string;
    role: Role[];
    token: string;
}

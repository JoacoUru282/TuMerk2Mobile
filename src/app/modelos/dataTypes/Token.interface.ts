export interface Token{
    scopes?: string[];
    email?:string;
    sub?: number;
    iss?: string;
    iat?: number;
    exp?: number;
}
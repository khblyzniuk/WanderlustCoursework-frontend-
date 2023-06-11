import jwt from 'jwt-decode' // import dependency
export default function decryptToken(token:string) : any{
    try {
        return parseJwt(token);
    } catch (error) {
        throw new Error(`Error decoding token: ${token}`);
    }
};

function parseJwt(token:string) {
    if (!token)
        return;
    return jwt(token);
}
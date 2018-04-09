export const ISAUTH = token => !!(token);

export const AUTHENTICATE = (token, username, id) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('id', id);
}

export const DEAUTHENTICATE = () => localStorage.clear();




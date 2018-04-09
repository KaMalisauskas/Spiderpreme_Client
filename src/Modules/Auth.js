export const ISAUTH = token => !!(token);

export const AUTHENTICATE = (token, username) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
}

export const DEAUTHENTICATE = () => localStorage.clear();




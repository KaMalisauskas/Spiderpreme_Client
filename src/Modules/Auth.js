export const ISAUTH = token => !!(token);

export const AUTHENTICATE = token => localStorage.setItem('jwtToken', token);

export const DEAUTHENTICATE = () => localStorage.clear();




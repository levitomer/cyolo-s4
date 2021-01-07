import requests from '.';

export const Auth = {
    current: () => requests.get('/user'),
    login: (username) => requests.post('/login', { user: { username } }),
    register: (username) => requests.post('/users', { user: { username } }),
    save: (user) => requests.put('/user', { user }),
};

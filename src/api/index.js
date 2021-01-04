import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import app from './stores/app';
import auth from './stores/auth';
const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'api/v1/';

const handleErrors = (err) => {
    if (err && err.response && err.response.status === 401) {
        auth.logout();
    }
    return err;
};

const responseBody = (res) => res.body;

const tokenPlugin = (req) => {
    if (app.token) {
        req.set('authorization', `Token ${app.token}`);
    }
};

const requests = {
    delete: (url) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: (url) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

export default requests;

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8000/';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('users/user/'),
  login: (username, password) =>
    requests.post('users/login/', {username, password }),
  register: (username,firstName , lastName , password) =>
    requests.post('users/', { username, first_name : firstName , last_name:lastName ,  password}),
  save: user =>
    requests.put('users/user', { user }),
  logout: () => 
    requests.get('logout/'),
};

const Packages = {
  all: () =>
    requests.get(`packages/`),
  perUser:() => 
    requests.get(`packages/user/`)  ,
  del: id =>
    requests.del(`packages/${id}`),
  byId: id =>
    requests.get(`packages/${id}`),
  update: (id , title , body , longitude , largitude) =>
    requests.put(`packages/${id}`, {title , body , longitude , largitude}),
  create: (title , body , longitude , largitude ) =>
    requests.post('packages/', { title , body , longitude , largitude })
};



export default {
  Packages,
  Auth,
  setToken: _token => { token = _token; }
};

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
    requests.get('user/'),
  login: (username, password) =>
    requests.post('login/', {username, password }),
  register: (username,firstName , lastName , password , userType) =>
    requests.post('signup/', { username, firstName , lastName ,  password , userType}),
  save: user =>
    requests.put('user', { user })
};

const Parcels = {
  all: () =>
    requests.get(`parcels/`),
  perUser:(id) => 
    requests.get(`parcels/${id}`)  ,
  del: id =>
    requests.del(`parcels/${id}`),
  byId: id =>
    requests.post(`parcels/${id}`),
  update: (id , title , body , longitude , largitude) =>
    requests.put(`parcels/${id}`, {title , body , longitude , largitude}),
  create: (title , body , longitude , largitude ) =>
    requests.post('parcels/', { title , body , longitude , largitude })

};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const Delivery = {

}
export default {
  Parcels,
  Auth,
  Profile,
  Delivery,
  setToken: _token => { token = _token; }
};

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
  register: (username, firstName , lastName , password) =>
    requests.post('users/', { username, first_name : firstName , last_name:lastName ,  password}),
  save: (firstName , lastName) =>
    requests.put('users/user/', { first_name : firstName , last_name:lastName }),
  logout: () => 
    requests.get('users/logout/'),
};

const Packages = {
  all: () =>
    requests.get(`packages/`),
  byFilter : (filter) => 
    requests.get(`packages/${filter}`),
  perUser:() => 
    requests.get(`packages/user/notrecovered/`)  ,
  perUserRecovered: () =>
    requests.get(`packages/user/recovered/`),
  perUserNotRecovered: () =>
    requests.get(`packages/user/notrecovered/`),
  del: id =>
    requests.del(`packages/${id}`),
  byId: id =>
    requests.get(`packages/${id}`),
  
  update: (id , title , body ) =>
    requests.put(`packages/${id}`, {title , body }),
  create: (content , contentType ,from , fromWilaya) =>
    requests.post(`packages/`, { content,content_type :contentType ,from,from_wilaya :fromWilaya })

};

const Helps = {
  all: () =>
    requests.get(`requests/`),
  create: () =>
    requests.get(`requests/`),
};

const Donations = {
  
}


export default {
  Packages,
  Helps,
  Auth,
  Donations,
  setToken: _token => { token = _token; }
};

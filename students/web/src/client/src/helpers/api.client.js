import qs from 'querystring';
import config from 'config';

const baseApiUrl = config.baseApiUrl;

let _token = config.jwtSecret;

export function setToken(token) {
  _token = token;
}

function buildUrl(path, queryStringObject) {
  return `${baseApiUrl}/${path}?${qs.stringify(queryStringObject)}`;
}

const getJsonHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Bearer ${_token}`,
});

const postJsonHeaders = () => ({
  ...getJsonHeaders(),
  'Content-Type': 'application/json',
});

const postFileHeaders = () => ({
  Authorization: `Bearer ${_token}`,
});

const responseHandler = (response) => {
  if (response.status >= 500) {
    return response.text()
      .then(text => Promise.reject({ serverError: text }));
  }

  if (response.status >= 400) {
    const isJSON = response.headers.get('Content-Type').includes('application/json');

    if (isJSON) {
      return response.json()
        .then(data => Promise.reject({ ...data, isBadRequest: true }));
    }

    return response.text()
      .then(text => Promise.reject({ serverError: text }));
  }

  return Promise.resolve(response.json());
};

export function get(path, queryStringObject) {
  return fetch(buildUrl(path, queryStringObject), {
    headers: getJsonHeaders(),
  })
    .then(responseHandler);
}

export function put(path, queryStringObject, body) {
  return fetch(buildUrl(path, queryStringObject), {
    method: 'PUT',
    headers: postJsonHeaders(),
    body: JSON.stringify(body),
  })
    .then(responseHandler);
}

export function post(path, queryStringObject, body) {
  return fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    headers: postJsonHeaders(),
    body: JSON.stringify(body),
  })
    .then(responseHandler);
}

export function file(path, queryStringObject, body) {
  return fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    headers: postFileHeaders(),
    body,
  })
    .then(responseHandler);
}

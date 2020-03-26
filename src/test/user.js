import request from './request';

default export function getUserName(userID) {
  return request(`/users/${userID}`).then(user => user.name);
}


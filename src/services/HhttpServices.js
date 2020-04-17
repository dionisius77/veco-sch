import axios from 'axios';
const server = 'http://localhost:5000/'

export const HTTP_SERVICE = {
  get(url) {
    return axios(server + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  post(request) {
    return axios(server + request.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: request.data
    });
  }
}
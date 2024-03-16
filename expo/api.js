import axios from 'axios';

const ENV = '10.18.18.100'

export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get('http://' + ENV + url)
        .then(res => {
            resolve(res.data);
        })
        .catch(error => {
            reject(error);
        })
  });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post('http://' + ENV + url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            })
    });
}
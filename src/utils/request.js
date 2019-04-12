import { getSession } from './session';
import config from '../config';
const axios = require('axios');

const baseUrl = config.host;
export default function (opt = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = `SessionKey ${getSession()}` ;
    axios({
      method: 'get',
      baseURL:baseUrl,
      timeout: 6000,
      // headers: {
      //   'access-control-allow': '*',
      //   'Access-Control-Allow-Origin': '*'
      // },
      ...opt
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      if(err.response && err.response.status === 401) {
        window.location = '/login'
      }
      reject(err.response)
    })
  })
}


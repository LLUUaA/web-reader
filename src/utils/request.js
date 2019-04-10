import { getSession } from './session';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/';
export default function (opt = {}) {
  return new Promise((resolve, reject) => {
    // opt.url = baseUrl + opt.url || '';
    axios.defaults.headers.common['Authorization'] = `SessionKey ${getSession()}` ;
    axios({
      method: 'get',
      baseURL:baseUrl,
      timeout: 6000,
      headers: {
        'access-control-allow': '*',
        'Access-Control-Allow-Origin': '*'
      },
      ...opt
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      if(err.response && err.response.status === 401) {
        this.$router.push('/login')
      }
      reject(err.response)
    })
  })
}


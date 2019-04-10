import request from '../utils/request';

export function login(basic) {
    return request({
        method:'post',
        url: '/account/login',
        headers: {'Authorization': `BASIC ${basic}`},
    })
}
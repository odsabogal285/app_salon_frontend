import api from '../lib/axios'

export default {
    register (data) {
        return api.post('/register', data);
    },
    login (data) {
        return api.post('/login', data);
    },
    auth (data) {
        return api.get('/me')
    }
}
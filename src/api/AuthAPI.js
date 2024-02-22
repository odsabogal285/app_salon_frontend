import api from '../lib/axios'

export default {
    register (data) {
        return api.post('/register', data);
    },
    login (data) {
        return api.post('/login', data);
    },
    auth () {
        return api.get('/me')
    },
    admin () {
        return api.get('/admin')
    },
    forgotPassword (data) {
        return api.post('/forgot-password', data)
    },
    verifyPasswordResetToken (token) {
        return api.get(`/forgot-password/${token}`)
    },
    updatePassword (token, data) {
        return api.post(`/forgot-password/${token}`, data)
    }
}
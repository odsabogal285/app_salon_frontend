import api from "@/lib/axios.js";

export default  {
    create (data) {
        return api.post('/appointments', data);
    },
    getByDate (date) {
        return api.get(`/appointments?date=${date}`);
    },
    getUserAppointments () {
        return api.get('/appointments-user');
    },
    getById (id) {
        return api.get(`/appointments/${id}/edit`)
    },
    update(id, data) {
        return api.put(`/appointments/${id}`, data)
    },
    destroy(id) {
        return api.delete(`/appointments/${id}`)
    }
}
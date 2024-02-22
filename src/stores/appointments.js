import {defineStore} from "pinia";
import {ref, computed, onMounted, inject, watch} from "vue";
import AppointmentAPI from "@/api/AppointmentAPI.js";
import {convertDate} from "@/helpers/dates.js";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import appointmentAPI from "@/api/AppointmentAPI.js";

export const useAppointmentsStore = defineStore('appointmenst', () => {

    const appointmentId = ref('');
    const services = ref([]);
    const date = ref('');
    const time = ref('');
    const hours = ref([]);
    const appointmentsByDate = ref([]);

    const toast = inject('toast');
    const router = useRouter();
    const user = useUserStore();

    onMounted(() => {
        const startHour = 10;
        const endHour = 19;
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour+':00')
        }
    });

    watch (date, async () => {
        time.value = '';
        if (date.value === '') return
        const {data} = await AppointmentAPI.getByDate(convertDate(date.value));
        console.log('entra aqui');
        if (appointmentId.value) {
            appointmentsByDate.value = data.data.appointments.filter(appointment => appointment.id !== appointmentId.value);
            time.value = data.data.appointments.filter(appointment => appointment.id === appointmentId.value)[0]?.time;
        }else {
            appointmentsByDate.value = data.data.appointments;
        }
    })

    function setSelectedAppointment (appointment) {
        //console.log(appointment);
        services.value = appointment.services;
        date.value = appointment.date_formatted;
        time.value = appointment.time;
        appointmentId.value = appointment.id;
    }
    function onServiceSelected(service) {
        if(services.value.some(selectedService => selectedService.id === service.id)) {
            services.value = services.value.filter(selectedService => selectedService.id !== service.id);
        } else {
            if (services.value.length === 2) {
                alert('Máximo 2 servicios por cita')
                return
            }
            services.value.push(service)
        }

    }

    async function saveAppointment () {
        const appointment = {
            services: services.value.map(service => service.id),
            date: convertDate(date.value),
            time: time.value,
            total_amount: totalAmount.value
        }

        try {
            if (appointmentId.value) {
                const { data } = await AppointmentAPI.update(appointmentId.value, appointment);
                toast.open({
                    message: data.data.message,
                    type: 'success'
                });

            } else{
                const { data } = await AppointmentAPI.create(appointment);
                toast.open({
                    message: data.data.message,
                    type: 'success'
                });

            }

            clearAppointmentData();
            user.getUserAppointments();
            router.push({name: 'my-appointments'});

        } catch (error) {
            console.log(error)
        }

    }

    function clearAppointmentData () {
        services.value = []
        date.value = '';
        time.value = '';
        appointmentId.value = '';
    }

    async function cancelAppointment (id) {
        try {
            if(confirm('¿Desea cancelar?')) {
                const { data } = await appointmentAPI.destroy(id);

                toast.open({
                    message: data.data.message,
                    type: 'success'
                });
                user.userAppointments = user.userAppointments.filter(appointment => appointment.id !== id);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service.id === id);
    });

    const noServicesSelected = computed(() => services.value.length === 0);

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0);
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value?.length
    });

    const isDateSelected = computed(() => {
        return !!date.value;
    });

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour);
        }
    });

    return {
        services,
        date,
        hours,
        time,
        setSelectedAppointment,
        onServiceSelected,
        saveAppointment,
        clearAppointmentData,
        cancelAppointment,
        isServiceSelected,
        isValidReservation,
        isDateSelected,
        noServicesSelected,
        totalAmount,
        disableTime
    }
})
import {defineStore} from "pinia";
import {ref, computed, onMounted, inject, watch} from "vue";
import AppointmentAPI from "@/api/AppointmentAPI.js";
import {convertDate} from "@/helpers/dates.js";
import {useRouter} from "vue-router";

export const useAppointmentsStore = defineStore('appointmenst', () => {

    const services = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');
    const appointmentsByDate = ref([]);

    const toast = inject('toast');
    const router = useRouter();

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
        appointmentsByDate.value = data.data.appointments;
        console.log(data, convertDate(date.value));
    })

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

    async function createAppointment () {
        const appointment = {
            services: services.value.map(service => service.id),
            date: convertDate(date.value),
            time: time.value,
            total_amount: totalAmount.value
        }

        try {
            const { data } = await AppointmentAPI.create(appointment);

            console.log(data);

            toast.open({
                message: data.data.message,
                type: 'success'
            });

            clearAppointmentData();
            router.push({name: 'my-appointments'});

        } catch (error) {
            console.log(error)
        }

    }

    function clearAppointmentData () {
        services.value = []
        date.value = '';
        time.value = '';
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service.id === id);
    });

    const noServicesSelected = computed(() => services.value.length === 0);

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0);
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
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
        onServiceSelected,
        createAppointment,
        isServiceSelected,
        isValidReservation,
        isDateSelected,
        noServicesSelected,
        totalAmount,
        disableTime
    }
})
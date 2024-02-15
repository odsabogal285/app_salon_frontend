import {defineStore} from "pinia";
import {ref, computed, onMounted} from "vue";

export const useAppointmentsStore = defineStore('appointmenst', () => {

    const services = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');

    onMounted(() => {
        const startHour = 10;
        const endHour = 19;
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour+':00')
        }
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

    function createAppointment () {
        const appointment = {
            services: services.value.map(service => service.id),
            date: date.value,
            time: time.value,
            totalAmount: totalAmount.value
        }
        console.log(appointment);
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

    return {
        services,
        date,
        hours,
        time,
        onServiceSelected,
        createAppointment,
        isServiceSelected,
        isValidReservation,
        noServicesSelected,
        totalAmount
    }
})
import {defineStore} from "pinia";
import {ref, computed} from "vue";

export const useAppointmentsStore = defineStore('appointmenst', () => {

    const services = ref([]);
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

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service.id === id);
    });

    const noServicesSelected = computed(() => services.value.length === 0);

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0);
    })

    return {
        services,
        onServiceSelected,
        isServiceSelected,
        noServicesSelected,
        totalAmount
    }
})
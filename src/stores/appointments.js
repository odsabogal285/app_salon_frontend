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

    return {
        onServiceSelected,
        isServiceSelected
    }
})
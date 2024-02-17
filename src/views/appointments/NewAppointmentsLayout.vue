<script setup>
 import {onMounted} from "vue";
  import { useRoute } from 'vue-router'
  import {useAppointmentsStore} from "@/stores/appointments.js";

  const appointments = useAppointmentsStore();

  onMounted(() => {
    appointments.clearAppointmentData();
  })
  const route = useRoute();
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
        :to="{name: 'new-appointment'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'new-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >
      Servicios
    </RouterLink>
    <RouterLink
        :to="{name: 'appointments-details'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'appointments-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"

    >
      Cita y resumen
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView/>
  </div>
</template>
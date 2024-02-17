<script setup>
  import { onMounted } from "vue";
  import { useRoute, useRouter } from 'vue-router'
  import AppointmentAPI from "@/api/AppointmentAPI.js";
  import {useAppointmentsStore} from "@/stores/appointments.js";

  const appointment = useAppointmentsStore();
  const route = useRoute();
  const router = useRouter();
  const {id} = route.params


  onMounted(async () => {
    try {
      const {data} = await AppointmentAPI.getById(id);
      console.log(data.data.appointment);
      appointment.setSelectedAppointment(data.data.appointment)
    } catch (error) {
      console.log(error);
      router.push({name: 'my-appointments'})
    }
  })


</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
        :to="{name: 'edit-appointment'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >
      Servicios
    </RouterLink>
    <RouterLink
        :to="{name: 'edit-appointments-details'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'edit-appointments-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"

    >
      Cita y resumen
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView/>
  </div>
</template>

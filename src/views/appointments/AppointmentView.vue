<script setup>
  import SelectedService from "@/components/SelectedService.vue";
  import {useAppointmentsStore} from "@/stores/appointments.js";
  import {formatCurrency} from "@/helpers/index.js";


  const appointments = useAppointmentsStore();
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white">Detaller Cita y Resumen</h2>
  <p class="text-white text-lg">A continuación verifica la información y confirma tu cita</p>

  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

  <p v-if="appointments.noServicesSelected" class="text-2xl text-white text-center"> No hay servicios seleccionados</p>
  <div v-else class="grid gap-5">
    <SelectedService
      v-for="service in appointments.services"
      :key="service.id"
      :service="service"
    />

    <p class="text-right text-white text-2xl">Total a pagar:
      <span class="font-black">{{formatCurrency(appointments.totalAmount)}}</span>
    </p>
  </div>

</template>
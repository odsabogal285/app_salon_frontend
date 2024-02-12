import {ref, onMounted} from "vue";
import {defineStore} from 'pinia'
import ServicesAPI from "@/api/ServicesAPI.js";

export const useServicesStore = defineStore('services', () => {

   const services = ref([]);

   onMounted(async () => {
      try {

         const { data } = await ServicesAPI.all();
         services.value = data.data;
      } catch (error) {
         console.log(error)
      }
   })

   return {
      services
   }
});
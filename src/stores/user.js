import {ref, onMounted, computed} from "vue";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import AuthAPI from "@/api/AuthAPI.js";
import AppointmentAPI from "@/api/AppointmentAPI.js";

export const useUserStore = defineStore('user', () => {

    const router = useRouter();
    const user = ref({});
    const userAppointments = ref([]);
    const loading = ref(true);

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth();
            user.value = data.data.user;
            await getUserAppointments();
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false;
        }
    });

    async function getUserAppointments () {
        try {
            const {data}  = await  AppointmentAPI.getUserAppointments();
            userAppointments.value = data.data.appointment
            console.log(data.data.appointment);
        } catch (error) {
            console.log(error)
        }
    }

    const getUserName = computed(() =>  user.value?.name ? user.value?.name : '' );

    const noAppointments =  computed(() => userAppointments.value.length === 0);
    function logout () {
        localStorage.removeItem('AUTH_TOKEN');
        user.value = {};
        router.push({name: 'login'});
    }

    return {
        user,
        userAppointments,
        loading,
        logout,
        getUserName,
        noAppointments,
        getUserAppointments
    }
})
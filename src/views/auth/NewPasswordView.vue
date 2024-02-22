<script setup>
  import {onMounted, inject, ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import authAPI from "@/api/AuthAPI.js";
  import AuthAPI from "@/api/AuthAPI.js";

  const toast = inject('toast');
  const route = useRoute();
  const router = useRouter();
  const {token} = route.params;

  const validToken = ref(false)

  onMounted(async () => {
    try {

      const {data} = await AuthAPI.verifyPasswordResetToken(token);
      validToken.value = true;

    } catch (error) {
      console.log(error);
      toast.open({
        message: error.response.data.error,
        type: 'error'
      })
    }
  });

  const handleSubmit = async ({password}) =>  {
    try {
      const {data} = await AuthAPI.updatePassword(token, {password});
      console.log(data);
      toast.open({
        message: data.data.message,
        type: 'success'
      });
      setTimeout(() => {
        router.push({name: 'login'})
      }, 500);
    } catch (error) {
      toast.open({
        message: error.response.data.error,
        type: 'error'
      });
    }
  }
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10"> Nuevo Password </h1>
    <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>

    <FormKit
        id="newPasswordForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
      <FormKit
          type="password"
          label="Password"
          name="password"
          placeholder="Password de usuario - Min 8 Caracteres"
          validation="required|length:8"
          :validation-messages="{
          required: 'El password es obligatorio',
          length: 'El password debe contener al menos 8 caracteres'
        }"
      />

      <FormKit type="submit"> Guardar Password</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white"> Token no válido</p>
</template>

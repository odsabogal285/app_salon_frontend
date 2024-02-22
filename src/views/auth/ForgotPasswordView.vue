<script setup>
  import authAPI from "@/api/AuthAPI.js";
  import {inject} from 'vue'
  import {reset} from "@formkit/vue";

  const toast = inject('toast');
  const handleSubmit = async ({email}) => {
    try {
      const {data} = await authAPI.forgotPassword({email});
      console.log(data.data.message);
      toast.open({
        message: data.data.message,
        type: 'success'
      });

      reset('forgotPassword');

    } catch (error) {
      console.log(error.response.data.error);
      toast.open({
        message: error.response.data.error,
        type: 'error'
      });
    }
  }

</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10"> Olvide mi password</h1>
  <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

  <FormKit
      id="forgotPassword"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSubmit"
  >
    <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Email del usuario"
        validation="required|email"
        :validation-messages="{
          required: 'El email es obligatorio',
          email: 'Email no valido'
        }"
    />

    <FormKit type="submit"> Enviar instrucciones</FormKit>
  </FormKit>
</template>

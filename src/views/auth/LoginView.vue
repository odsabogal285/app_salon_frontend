<script setup>
  import {inject} from 'vue'
  import AuthAPI from "@/api/AuthAPI.js";
  import {reset} from "@formkit/vue";

  const toast = inject('toast');
  const handleSubmit = async (formData) => {
    try {

      const {data, status} =  await AuthAPI.login(formData);
      localStorage.setItem('AUTH_TOKEN', data.data.token);

      if (data.response === "success" && status === 200) {
        toast.open({
          message: 'Usuario correcto',
          type: 'success'
        });
        reset('loginForm');
      }

    } catch (error) {
      if(error.response.status === 406 && Array.isArray(error.response.data.error)) {
        error.response.data.error.forEach(item => {
          toast.open({
            message: item,
            type: 'error'
          });
        });
      } else {
        toast.open({
          message: error.response.data.error,
          type: 'error'
        });
      }
    }
  }
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10"> Iniciar Sesión </h1>
  <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>
  <FormKit
      id="loginForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSubmit"
  >
    <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Email de registro"
        validation="required|email"
        :validation-messages="{
          required: 'El email es obligatorio',
          email: 'Email no valido'
        }"
    />

    <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Password de usuario"
        validation="required"
        :validation-messages="{
          required: 'El password es obligatorio',
        }"
    />

    <FormKit type="submit"> Inicia Sesión </FormKit>
  </FormKit>
</template>

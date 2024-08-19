// plugins/toasties.ts
import { ref } from 'vue';
import { defineNuxtPlugin } from '#app';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin(nuxtApp => {
  const snackbar = ref(false);
  const snackbarMessage = ref('');

  const showSnackbar = (message: string) => {
    snackbarMessage.value = message;
    snackbar.value = true;
  };
    
  const notificar = (
    message: string,
    options: any = {}
  ) => {
    const delay = options.delay ?? 500
    toast(message, {
      delay: delay,
      position: toast.POSITION.BOTTOM_CENTER,
      ...options,
    });
  };

  nuxtApp.provide('toasties', {
    show: showSnackbar,
    snackbar,
    snackbarMessage,
    notificar,
  });
});

<template>
  <VContainer class="centrar">
    <VCard width="450" class="ma-auto">
      <VCardTitle class="text-center">
        {{ titulo }} Filme Favorito
      </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="processarFormulario">
          <VTextField
            label="Titulo"
            v-model="campos.titulo"
            required
            :disabled="carregando"
          />
          <VTextField
            label="Sinopse"
            v-model="campos.sinopse"
            required
            :disabled="carregando"
          />
          <VBtn 
            variant="tonal"
            type="submit"
            :loading="carregando"
            block>
            {{ carregando ? 'Processando...' : 'Salvar' }}
          </VBtn>
          <VBtn 
            class="mt-2"
            variant="tonal"
            color="error"
            @click="navigateTo('/')"
            :disabled="carregando"
            block>
            Cancelar
          </VBtn>
        </VForm>
      </VCardText>
    </VCard>
  </VContainer>
  <VSnackbar v-model="snackbar" :timeout="1000" color="info">
    {{ snackbarMessage }}
  </VSnackbar>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useNuxtApp } from '#app';

const { $toasties } = useNuxtApp();
const carregando = ref(false);
const filmeStore = useFilmeStore();
const { cadastrar, atualizar, setFilmeAtual } = filmeStore;
const { filmeAtual } = storeToRefs(filmeStore);
const snackbar = $toasties.snackbar;
const snackbarMessage = $toasties.snackbarMessage;

const campos = reactive({
  titulo: filmeAtual.value ? filmeAtual.value.titulo : '',
  sinopse: filmeAtual.value ? filmeAtual.value.sinopse : '',
});

const validarCamposFormulario = () => {
  if (!campos.titulo.trim() || !campos.sinopse.trim()) {
    $toasties.notificar('Por favor, preencha todos os campos obrigatórios', { type: 'error' });
    return false;
  }
  return true;
};

const processarFormulario = async () => {
  if (carregando.value || !validarCamposFormulario())
    return;

  carregando.value = true;
  
  try {
    if (filmeAtual.value) {
      await atualizar({ ...campos, _id: filmeAtual.value._id });
    } else {
      await cadastrar(campos);
    }
    await nextTick();
    $toasties.notificar(`Item processado com sucesso`, { type: 'success' });
  } catch (error: any) {
    await nextTick();
    $toasties.notificar('Erro ao processar o formulário', { type: 'error' });
  } finally {
    setTimeout(() => {
      carregando.value = false;
      // resetarCampos();
    }, 500);
  }
};

const resetarCampos = () => {
  campos.titulo = '';
  campos.sinopse = '';
};

// watch(carregando, (novoValor) => {
//   if (!novoValor) {
//     resetarCampos();
//   }
// });

const titulo = computed(() => filmeAtual.value ? 'Editar' : 'Cadastrar');

onUnmounted(() => {
  setFilmeAtual(null);
});
</script>

<style scoped>
.centrar {
  display: flex;
  align-items: center;
  height: 80vh;
}
</style>

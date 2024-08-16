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
          />
          <VTextField
            label="Sinopse"
            v-model="campos.sinopse"
          />
          <VBtn 
            variant="tonal"
            type="submit"
            :loading="carregando"
            block>
            Salvar
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

  <VSnackbar v-model="snackbar" :timeout="3000" color="info">
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

const campos = reactive({
  titulo: filmeAtual.value ? filmeAtual.value.titulo : '',
  sinopse: filmeAtual.value ? filmeAtual.value.sinopse : '',
});

const processarFormulario = async () => {
  carregando.value = true;
  let acao = filmeAtual.value ? 'atualizado' : 'adicionado';
  try {
    if (filmeAtual.value) {
      await atualizar({ ...campos, _id: filmeAtual.value._id });
    } else {
      await cadastrar(campos);
    }
    $toasties.notificar(`Item ${acao} com sucesso`);
    resetarCampos();
  } catch (error) {
    $toasties.notificar('Erro ao processar o formulário');
  } finally {
    carregando.value = false;
  }
};

const resetarCampos = () => {
  campos.titulo = '';
  campos.sinopse = '';
};

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

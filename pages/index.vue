<template>
  <VContainer class="d-flex flex-column align-center">
    <VRow>
      <VCol>
        <VBtn 
          icon="mdi-plus"
          @click="navigateTo('/formularioFilme')"
        />
      </VCol>
    </VRow>
    <VRow v-if="filmes.length > 0">
      <VCol>
        <VTable>
          <thead>
            <tr>
              <th>Título</th>
              <th>Sinopse</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="filme in filmes" :key="filme._id">
              <td>{{ filme.titulo }}</td>
              <td>{{ filme.sinopse }}</td>
              <td>
                <VBtn 
                  variant="text" 
                  color="warning" 
                  icon="mdi-eye" 
                  @click="navegarAoFormulario(filme)"
                />
                <VBtn 
                  variant="text" 
                  color="error" 
                  icon="mdi-delete" 
                  @click="abrirModalConfirmacao(filme)"
                />
              </td>
            </tr>
          </tbody> 
        </VTable>
      </VCol>
    </VRow>
    <VRow v-else>
      <VCol>
        <p>Nenhum registro encontrado.</p>
      </VCol>
    </VRow>
    <VDialog v-model="modalAberto" max-width="500">
      <VCard>
        <VCardTitle>Confirmação</VCardTitle>
        <VCardText>
          Você tem certeza que deseja excluir o item "{{ itemAtual?.titulo }}"?
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="red darken-1" text @click="modalAberto = false">Cancelar</VBtn>
          <VBtn color="green darken-1" text @click="confirmarExclusao">Confirmar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const filmeStore = useFilmeStore();
const { obterFilmes, remover, setFilmeAtual } = filmeStore;
const { filmes } = storeToRefs(filmeStore);

await obterFilmes();

const modalAberto = ref(false);
const itemAtual = ref<IFilme | null>(null);

const abrirModalConfirmacao = (filme: IFilme) => {
  itemAtual.value = filme;
  modalAberto.value = true;
};

const confirmarExclusao = async () => {
  if (itemAtual.value) {
    await remover(itemAtual.value._id);
    modalAberto.value = false;
  }
};

const navegarAoFormulario = (filme: IFilme) => {
  setFilmeAtual(filme);
  navigateTo('/formularioFilme');
};
</script>

<style scoped>

</style>

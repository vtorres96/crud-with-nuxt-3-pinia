<template>
  <VContainer class="centrar">
    <VCard width="450" class="ma-auto">
      <VCardTitle class="text-center">
        {{ titulo }} FIlme Favorito
      </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="procesarFormulario">
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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const carregando = ref(false);
const filmeStore = useFilmeStore()
const {cadastrar, atualizar, setFilmeAtual} = filmeStore
const {filmeAtual} = storeToRefs(filmeStore)

const campos = reactive({
  titulo: filmeAtual.value ? filmeAtual.value.titulo : '',
  sinopse: filmeAtual.value ? filmeAtual.value.sinopse : '',
})

const procesarFormulario = async()=>{
  carregando.value = true;
  if(filmeAtual.value){
    await atualizar({...campos, _id: filmeAtual.value._id})
  }else{
    await cadastrar(campos)
  }
  carregando.value = false;
}

const titulo = computed(()=> filmeAtual.value ? 'Editar' : 'Cadastrar')

onUnmounted(()=>{
  setFilmeAtual(null)
})
</script>

<style scoped>
.centrar{
  display: flex;
  align-items: center;
  height: 80vh;
}
</style>
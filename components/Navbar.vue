<template>
  <VAppBar>
    <span @click="navigateTo('/')">{{ title }}</span>
  </VAppBar>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>

</style>
<template>
  <div class="d-flex justify-center">
    <v-card width="300px">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{ cv.firstName + ' ' + cv.lastName }}</v-card-title>
      <v-card-text> Body text </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useCVStore();
const { cv } = storeToRefs(store);
</script>

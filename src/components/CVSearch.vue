<template>
  <v-row>
    <v-col cols="12">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-sheet max-height="75vh" class="overflow-y-auto overflow-x-hidden">
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="12" sm="4" md="3" xl="2">
            <c-v-preview :cv="{ id: n }" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/store/cv-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import CVPreview from './CVPreview.vue';

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const tab = ref(0);
const search = ref('');

async function next() {
  tab.value = tab.value + 1;
}
async function submit() {
  console.log(entryCV.value);
}
</script>

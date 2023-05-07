<template>
  <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end" class="mb-10">
    <v-tab :value="0">Start</v-tab>
    <v-tab :value="1">Personal Info</v-tab>
    <v-tab :value="2">Qualifications</v-tab>
    <v-tab :value="3">Experience</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item :key="0" :value="0">
      <v-container fluid>
        <CVEntryStep0 @on-next="next" />
      </v-container>
    </v-window-item>

    <v-window-item :key="1" :value="1">
      <v-container fluid>
        <CVEntryStep1 @on-next="next" />
      </v-container>
    </v-window-item>

    <v-window-item :key="2" :value="2">
      <v-container fluid>
        <CVEntryStep2 @on-next="next" />
      </v-container>
    </v-window-item>

    <v-window-item :key="3" :value="3">
      <v-container fluid>
        <CVEntryStep3 @on-submit="submit" />
      </v-container>
    </v-window-item>
  </v-window>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import CVEntryStep0 from './CVEntryStep0.vue';
import CVEntryStep1 from './CVEntryStep1.vue';
import CVEntryStep2 from './CVEntryStep2.vue';
import CVEntryStep3 from './CVEntryStep3.vue';

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const tab = ref(0);

async function next() {
  tab.value = tab.value + 1;
}
async function submit() {
  console.log(entryCV.value);
}
</script>

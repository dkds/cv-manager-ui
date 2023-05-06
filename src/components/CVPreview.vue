<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      class="align-end text-white"
      :src="`https://randomuser.me/api/portraits/men/${props.cv?.id}.jpg`"
      height="150px"
      cover
    >
      <v-card-title>John Doe</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-2"> Colombo </v-card-subtitle>
    <v-card-text class="py-1">
      <div class="pb-2">JavaScript, Frontend Development</div>
      <div><span class="font-weight-bold">3 years</span> of experience</div>
      <div>with <span class="font-weight-bold">BSc</span></div>
    </v-card-text>

    <v-card-actions class="py-1">
      <v-spacer></v-spacer>
      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/store/cv-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const props = defineProps({
  cv: { type: Object },
});

const tab = ref(0);

async function next() {
  tab.value = tab.value + 1;
}
async function submit() {
  console.log(entryCV.value);
}
</script>

<style scoped lang="scss">
.v-card-title {
  text-shadow: 0 2px 1px #1e1e1e;
  background: linear-gradient(0, rgb(14 14 14 / 51%) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>

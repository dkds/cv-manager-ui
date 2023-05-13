<template>
  <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end" class="mb-10 mx-sm-4" show-arrows>
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
  <div class="ma-4">
    <v-alert v-model="showAlert" border="start" variant="tonal" closable close-label="Close Alert" color="error">
      {{ alertText }}
    </v-alert>
  </div>
</template>

<script lang="ts" setup>
import { delay } from '@/services/util';
import { useCVStore } from '@/stores/cv-store';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import CVEntryStep0 from './CVEntryStep0.vue';
import CVEntryStep1 from './CVEntryStep1.vue';
import CVEntryStep2 from './CVEntryStep2.vue';
import CVEntryStep3 from './CVEntryStep3.vue';

const cvStore = useCVStore();
const { entryCV } = storeToRefs(cvStore);

cvStore.setCVInProgress();

const tab = ref(0);
const alertText = ref('');
const showAlert = ref(false);

watch(showAlert, async (visible) => {
  if (visible) {
    await delay(3000);
    showAlert.value = false;
  }
});

const rules = {
  email: { required },
  category: { required },
  firstName: { required },
  lastName: { required },
  phone: { required },
  addressCity: { required },
  skills: { required },
  noOfGCSEPasses: { required },
  primaryEducationLevel: { required },
  experienceTotal: { required },
};
const vuelidate = useVuelidate(rules, entryCV);

async function next() {
  tab.value = tab.value + 1;
}
async function submit() {
  console.log(entryCV.value);
  const valid = await vuelidate.value.$validate();
  if (valid) {
    cvStore.submitCV();
  } else {
    showAlert.value = true;
    alertText.value = 'Please fill in all required fields in other steps';
  }
}
</script>

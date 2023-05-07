<template>
  <form>
    <v-row>
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.primaryEducationLevel"
          :error-messages="vuelidate.primaryEducationLevel.$errors.map((e) => e.$message as string)"
          label="Primary Education Level"
          required
          @input="vuelidate.primaryEducationLevel.$touch"
          @blur="vuelidate.primaryEducationLevel.$touch"
        />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.secondaryEducationLevel"
          :error-messages="vuelidate.secondaryEducationLevel.$errors.map((e) => e.$message as string)"
          label="Secondary Education Level"
          required
          @input="vuelidate.secondaryEducationLevel.$touch"
          @blur="vuelidate.secondaryEducationLevel.$touch"
        />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.higherEducationLevel"
          :error-messages="vuelidate.higherEducationLevel.$errors.map((e) => e.$message as string)"
          label="Higher Education Level"
          required
          @input="vuelidate.higherEducationLevel.$touch"
          @blur="vuelidate.higherEducationLevel.$touch"
        />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="py-2">
        <v-text-field v-model="professionalQualifications1" label="Professional Qualifications - 1" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="professionalQualifications2" label="Professional Qualifications - 2" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="professionalQualifications3" label="Professional Qualifications - 3" />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="flex-row">
        <div class="d-flex flex-row">
          <v-btn class="d-flex" @click="clear"> clear </v-btn>
          <v-spacer />
          <v-btn class="d-flex" color="primary" @click="next"> next </v-btn>
        </div>
      </v-col>
    </v-row>
  </form>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const emit = defineEmits(['on-next', 'on-submit']);

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const rules = {
  primaryEducationLevel: { required },
  secondaryEducationLevel: { required },
  higherEducationLevel: { required },
};
const professionalQualifications1 = ref(entryCV.value.professionalQualifications[0]);
const professionalQualifications2 = ref(entryCV.value.professionalQualifications[1]);
const professionalQualifications3 = ref(entryCV.value.professionalQualifications[2]);

watch([professionalQualifications1, professionalQualifications2, professionalQualifications3], () => {
  const professionalQualifications = [];
  if (professionalQualifications1.value) {
    professionalQualifications.push(professionalQualifications1.value);
  }
  if (professionalQualifications2.value) {
    professionalQualifications.push(professionalQualifications2.value);
  }
  if (professionalQualifications3.value) {
    professionalQualifications.push(professionalQualifications3.value);
  }

  store.updateCV({ professionalQualifications });
});

const vuelidate = useVuelidate(rules, entryCV);

function clear() {
  vuelidate.value.$reset();
  store.resetCV([
    'primaryEducationLevel',
    'secondaryEducationLevel',
    'higherEducationLevel',
    'professionalQualifications',
  ]);
}
async function next() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-next');
  }
}
</script>

<template>
  <form>
    <v-row>
      <v-col cols="12" md="6" class="py-2">
        <v-select
          v-model="entryCV.category"
          :items="categories"
          :error-messages="vuelidate.category.$errors.map((e) => e.$message as string)"
          label="Preferred Category"
          required
          @input="vuelidate.category.$touch"
          @blur="vuelidate.category.$touch"
        />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.email"
          :error-messages="vuelidate.email.$errors.map((e) => e.$message as string)"
          label="Email"
          required
          @input="vuelidate.email.$touch"
          @blur="vuelidate.email.$touch"
        />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="flex-row">
        <div class="d-flex flex-row">
          <v-spacer />
          <v-btn class="d-flex" @click="next"> next </v-btn>
        </div>
      </v-col>
    </v-row>
  </form>
</template>

<script lang="ts" setup>
import { useCVEntryStore } from '@/store/cv-entry';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['on-next']);

const store = useCVEntryStore();
const { entryCV } = storeToRefs(store);

const categories = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Other'];

const rules = {
  email: { required, email },
  category: { required },
};

const vuelidate = useVuelidate(rules, entryCV);

async function next() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-next');
  }
}
</script>

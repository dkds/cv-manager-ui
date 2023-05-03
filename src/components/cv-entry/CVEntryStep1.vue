<template>
  <form>
    <v-row>
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

    <v-row class="mt-8">
      <v-col cols="12" md="6" class="py-2">
        <v-select
          v-model="entryCV.designation"
          :items="designation"
          :error-messages="vuelidate.designation.$errors.map((e) => e.$message as string)"
          label="Designation"
          required
          @input="vuelidate.designation.$touch"
          @blur="vuelidate.designation.$touch"
        />
      </v-col>
      <v-col cols="12" md="6" class="py-2 hidden-sm-and-down"></v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.firstName"
          :error-messages="vuelidate.firstName.$errors.map((e) => e.$message as string)"
          label="First Name"
          required
          @input="vuelidate.firstName.$touch"
          @blur="vuelidate.firstName.$touch"
        />
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.lastName"
          :error-messages="vuelidate.lastName.$errors.map((e) => e.$message as string)"
          label="Last Name"
          required
          @input="vuelidate.lastName.$touch"
          @blur="vuelidate.lastName.$touch"
        />
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.phone"
          :error-messages="vuelidate.phone.$errors.map((e) => e.$message as string)"
          label="Phone Number"
          required
          @input="vuelidate.phone.$touch"
          @blur="vuelidate.phone.$touch"
        />
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field v-model="entryCV.phoneAlternative" label="Alternative Phone Number" />
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.addressLine1"
          :error-messages="vuelidate.addressLine1.$errors.map((e) => e.$message as string)"
          label="Address Line 1"
          required
          @input="vuelidate.addressLine1.$touch"
          @blur="vuelidate.addressLine1.$touch"
        />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="entryCV.addressLine2" label="Address Line 2" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.addressCity"
          :error-messages="vuelidate.addressCity.$errors.map((e) => e.$message as string)"
          label="Address City"
          required
          @input="vuelidate.addressCity.$touch"
          @blur="vuelidate.addressCity.$touch"
        />
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12" class="text-right">
        <v-btn class="me-4" @click="vuelidate.$validate"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script lang="ts" setup>
import { useCVEntryStore } from '@/store/cv-entry';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';

const store = useCVEntryStore();
const { entryCV } = storeToRefs(store);

const designation = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Rev', 'Other'];

const rules = {
  email: { required, email },
  designation: { required },
  firstName: { required },
  lastName: { required },
  phone: { required },
  addressLine1: { required },
  addressCity: { required },
};

const vuelidate = useVuelidate(rules, entryCV);

function clear() {
  vuelidate.value.$reset();
  store.resetCV();
}
</script>

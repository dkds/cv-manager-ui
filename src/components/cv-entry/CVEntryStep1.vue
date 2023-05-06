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

    <v-row class="mt-10">
      <v-col cols="12" md="6" class="py-2">
        <v-select v-model="entryCV.designation" :items="designations" label="Designation" />
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
      <v-col cols="12" md="6" class="py-2">
        <v-select v-model="entryCV.age" :items="ageRanges" label="Age" />
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-select v-model="entryCV.gender" :items="genders" label="Gender" />
      </v-col>
    </v-row>

    <v-row class="mt-10">
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

    <v-row class="mt-10">
      <v-col cols="12" class="py-2">
        <v-text-field v-model="entryCV.addressLine1" label="Address Line 1" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="entryCV.addressLine2" label="Address Line 2" />
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.addressCity"
          :error-messages="vuelidate.addressCity.$errors.map((e) => e.$message as string)"
          label="Nearest City"
          required
          @input="vuelidate.addressCity.$touch"
          @blur="vuelidate.addressCity.$touch"
        />
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-checkbox v-model="entryCV.preferRemote" label="Prefer Remote" />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="flex-row">
        <div class="d-flex flex-row">
          <v-btn class="d-flex" @click="clear"> clear </v-btn>
          <v-spacer />
          <v-btn class="d-flex" @click="next"> next </v-btn>
        </div>
      </v-col>
    </v-row>
  </form>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/store/cv-store';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['on-next', 'on-submit']);

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const designations = ['Prefer not to say', 'Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Rev', 'Other'];
const ageRanges = ['Prefer not to say', '18-25', '26-30', '31-35', '36-45', '46-50', 'More than 50'];
const genders = ['Prefer not to say', 'Man', 'Woman', 'Other'];

const rules = {
  email: { required, email },
  firstName: { required },
  lastName: { required },
  phone: { required },
  addressCity: { required },
};

const vuelidate = useVuelidate(rules, entryCV);

function clear() {
  vuelidate.value.$reset();
  store.resetCV([
    'designation',
    'firstName',
    'lastName',
    'age',
    'gender',
    'phone',
    'phoneAlternative',
    'addressLine1',
    'addressLine2',
    'addressCity',
    'preferRemote',
  ]);
}
async function next() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-next');
  }
}
</script>

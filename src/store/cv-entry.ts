import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCVEntryStore = defineStore('cv-entry', () => {
  const initialCV = {
    email: '',
    designation: null,
    firstName: '',
    lastName: '',
    phone: '',
    phoneAlternative: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
  };

  const entryCV = ref({ ...initialCV });

  const resetCV = () => {
    entryCV.value = { ...initialCV };
  };

  return { initialCV, entryCV, resetCV };
});

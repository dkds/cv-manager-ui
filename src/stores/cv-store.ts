import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCVStore = defineStore('cv-entry', () => {
  const initialCV = {
    category: null,
    email: '',
    designation: null,
    firstName: '',
    lastName: '',
    phone: '',
    phoneAlternative: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
    preferRemote: null,
    age: null,
    gender: null,
    primaryEducationLevel: '',
    secondaryEducationLevel: '',
    higherEducationLevel: '',
    professionalQualifications: [] as string[],
    experienceTotal: null,
    experiences: [] as string[],
  };

  const entryCV = ref({ ...initialCV });
  const cv = ref({ ...initialCV });

  const resetCV = (fields: Array<keyof typeof initialCV>) => {
    if (fields) {
      entryCV.value = {
        ...entryCV.value,
        ...fields.reduce((acc: object, field: string) => ({ ...acc, [field]: (<any>initialCV)[field] }), {}),
      };
    } else {
      entryCV.value = { ...initialCV };
    }
  };

  const updateCV = (newValues: Partial<typeof initialCV>) => {
    entryCV.value = {
      ...entryCV.value,
      ...newValues,
    };
  };

  return { initialCV, entryCV, resetCV, updateCV, cv };
});

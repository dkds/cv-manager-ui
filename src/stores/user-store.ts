import { ApiStatus } from '@/services/constants';
import { delay } from '@/services/util';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface User {
  email: string;
  password: string;
  name?: string;
  photo?: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<{ data: User | null; status: ApiStatus }>({
    data: null,
    status: ApiStatus.INIT,
  });

  const currentUser = computed(() => user.value.data);
  const userLoading = computed(() => user.value.status === ApiStatus.LOADING);

  const setUser = async (newUser: User) => {
    user.value.status = ApiStatus.LOADING;
    await delay(2000);
    user.value.data = {
      ...user.value.data,
      ...newUser,
    };
    user.value.status = ApiStatus.SUCCESS;
  };

  const clearUser = async () => {
    user.value.status = ApiStatus.LOADING;
    await delay(2000);
    user.value.data = null;
    user.value.status = ApiStatus.SUCCESS;
  };

  return { userLoading, currentUser, setUser, clearUser };
});

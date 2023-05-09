import UserInfo from '@/components/UserInfo.vue';
import { useUserStore } from '@/stores/user-store';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createVuetify } from 'vuetify';

describe('UserInfo.vue', () => {
  let vuetify: any;

  enableAutoUnmount(afterEach);

  beforeEach(() => {
    vuetify = createVuetify();
    setActivePinia(createPinia());
  });

  test('shows current user email as username', async () => {
    const user = { email: 'test', password: 'test' };
    const wrapper = mount(UserInfo, {
      global: {
        plugins: [vuetify],
      },
    });

    const userStore = useUserStore();
    await userStore.setUser(user);

    expect(wrapper.find('.v-list-item-title').text()).toEqual(user.email);
  });
});

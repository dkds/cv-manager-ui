<template>
  <v-card width="auto">
    <template #title>
      <div v-if="showAlert" class="my-3">
        <v-alert v-model="showAlert" border="start" variant="tonal" closable close-label="Close Alert" color="error">
          <template #text>
            <span class="font-weight-medium text-body-1"> {{ props.alertText }}</span>
          </template>
        </v-alert>
      </div>
      <v-tabs v-model="tab" color="deep-purple-accent-4" grow>
        <v-tab :value="Tabs.SIGN_IN">Sign in</v-tab>
        <v-tab :value="Tabs.REGISTER">Register</v-tab>
      </v-tabs>
    </template>
    <v-window v-model="tab">
      <v-window-item :key="Tabs.SIGN_IN" :value="Tabs.SIGN_IN">
        <Login @on-login="login" @on-close="cancel" />
      </v-window-item>
      <v-window-item :key="Tabs.REGISTER" :value="Tabs.REGISTER">
        <Register @on-register="register" @on-close="cancel" />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { User, useUserStore } from '@/stores/user-store';
import { ref } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';
import { watch } from 'vue';
import { delay } from '@/services/util';

const userStore = useUserStore();

const emit = defineEmits(['on-close']);
const props = defineProps({
  alertText: {
    type: String,
    required: false,
    default: '',
  },
});

enum Tabs {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

const showAlert = ref(false);
const tab = ref(Tabs.SIGN_IN);

watch(
  () => props.alertText,
  (text) => {
    showAlert.value = !!text.length;
  }
);
watch(showAlert, async (visible) => {
  if (visible) {
    await delay(3000);
    showAlert.value = false;
  }
});

async function register(user: User) {
  userStore.setUser(user);
}
async function login(user: User) {
  userStore.setUser(user);
}
async function cancel() {
  emit('on-close');
}
</script>

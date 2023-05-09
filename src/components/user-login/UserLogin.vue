<template>
  <v-card width="auto">
    <template #title>
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

const userStore = useUserStore();

const emit = defineEmits(['on-close']);

enum Tabs {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

const tab = ref(Tabs.SIGN_IN);

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

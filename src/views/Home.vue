<template>
  <v-app id="inspire">
    <v-app-bar app flat scroll-behavior="elevate" scroll-threshold="0">
      <v-toolbar-title>Employ Me</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs me-4">
        <v-btn prepend-icon="mdi-file-search" variant="text" to="search"> Search </v-btn>
        <v-btn prepend-icon="mdi-file-document-plus" variant="text" to="cv"> Start Building CV </v-btn>
      </v-toolbar-items>

      <v-btn class="hidden-xs me-4" icon>
        <v-icon>mdi-account</v-icon>

        <v-dialog v-if="!currentUser" v-model="showRegister" activator="parent" persistent width="720">
          <user-login @on-close="showRegister = !showRegister" />
        </v-dialog>

        <v-menu v-if="currentUser" activator="parent" open-on-hover :close-on-content-click="false">
          <user-info @on-logout="logout" />
        </v-menu>
      </v-btn>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="showDrawer = !showDrawer" />
    </v-app-bar>

    <v-navigation-drawer v-model="showDrawer" temporary location="right" class="hidden-sm-and-up">
      <template v-slot:prepend>
        <v-list-item
          v-if="currentUser"
          lines="two"
          :prepend-avatar="currentUser?.photo"
          :title="currentUser?.email || currentUser?.name"
          subtitle="Logged in"
        >
          <template #append>
            <v-btn icon flat @click="logout" :loading="userLoading">
              <v-icon>mdi-logout</v-icon>
              <v-tooltip activator="parent">Logout</v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </template>

      <v-list class="py-1" density="compact" nav>
        <v-list-item v-if="!currentUser" :active="false" prepend-icon="mdi-account" title="Login" value="login">
          <v-dialog v-model="showRegisterMobile" activator="parent" persistent width="720">
            <user-login @on-close="showRegisterMobile = !showRegisterMobile" />
          </v-dialog>
        </v-list-item>
        <v-divider class="my-1"></v-divider>
        <v-list-item prepend-icon="mdi-file-search" title="Search" value="search" to="search" />
        <v-list-item prepend-icon="mdi-file-document-plus" title="Start Building CV" value="cv" to="cv" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-sheet class="my-5" min-height="70vh" rounded="lg">
          <v-row>
            <v-col class="px-8 py-5" cols="12">
              <router-view />
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import UserInfo from '@/components/UserInfo.vue';
import UserLogin from '@/components/user-login/UserLogin.vue';
import { useUserStore } from '@/stores/user-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUserStore();
const { currentUser, userLoading } = storeToRefs(userStore);

const showDrawer = ref(false);
const showRegister = ref(false);
const showRegisterMobile = ref(false);

async function logout() {
  showRegister.value = false;
  showRegisterMobile.value = false;
  userStore.clearUser();
}
</script>

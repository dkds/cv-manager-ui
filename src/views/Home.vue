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
        <v-menu activator="parent" open-on-hover :close-on-content-click="false">
          <v-card min-width="300">
            <v-list-item
              lines="two"
              prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
              title="Jane Smith"
              subtitle="Logged in"
            >
              <template #append>
                <v-btn icon flat>
                  <v-icon>mdi-logout</v-icon>
                  <v-tooltip activator="parent">Logout</v-tooltip>
                </v-btn>
              </template>
            </v-list-item>
          </v-card>
        </v-menu>
      </v-btn>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="showDrawer = !showDrawer" />
    </v-app-bar>

    <v-navigation-drawer v-model="showDrawer" temporary location="right" class="hidden-sm-and-up">
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          title="Jane Smith"
          subtitle="Logged in"
        >
          <template #append>
            <v-btn icon flat>
              <v-icon>mdi-logout</v-icon>
              <v-tooltip activator="parent">Logout</v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
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
import { ref } from 'vue';

const showDrawer = ref(false);
</script>

<template>
  <v-img src="@/assets/employment-agency-transformed.jpeg" />
  <div class="d-flex justify-center mt-7">
    <v-btn color="deep-purple-accent-4" to="/cv-entry"> Get Started </v-btn>
  </div>
  <div class="text-center mt-5">
    <h2 class="py-5">Looking for a job?</h2>
    <h2 class="pb-5">Need to create a CV that stands out from the rest?</h2>
    <p class="pb-5">
      Click on the
      <span class="deep-purple-accent-4"> <router-link to="/cv-entry"> Get Started </router-link></span>
      button to enter your details and have CV made in a few minutes!
    </p>
    <p class="pb-5">Sign up and submit. <br /></p>
    <p>We will connect you with the employers.</p>
  </div>
</template>

<script lang="ts" setup></script>

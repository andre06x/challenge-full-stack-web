<template>
  <v-app>
    <Sidebar v-if="shouldShowSidebar" />
    <Snackbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue';
import Snackbar from './components/Snackbar.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const shouldShowSidebar = computed(() => route.meta.layout !== false);


</script>


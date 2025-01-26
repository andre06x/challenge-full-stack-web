<template>
    <v-snackbar
      v-model="snackbarStore.isVisible"
      :color="snackbarStore.color"
      location="top right"
      absolute
      timeout="3000"
    >
      {{ snackbarStore.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text @click="snackbarStore.closeSnackbar" v-bind="attrs">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { snackbarStore } from '@/store/snackbarStore';
</script>

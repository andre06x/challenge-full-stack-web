<template>
  <v-container class="text-center py-16">
    <h1 class="text-6xl font-bold mb-6">404</h1>
    <p class="text-lg mb-6">Ops! A página que você tentou acessar não foi encontrada.</p>
    <v-btn color="primary" :to="'/'" large>Voltar para a Página Inicial</v-btn>
  </v-container>
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>

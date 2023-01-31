<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <v-app>
    <TheHeader></TheHeader>>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <TheFooter></TheFooter>
  </v-app>
</template>

<style>
.v-container {
  max-width: 1280px;
}
</style>

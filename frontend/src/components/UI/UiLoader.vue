<script setup lang="ts">
defineProps<{ isLoading: boolean }>();
</script>

<template>
  <div
    v-if="isLoading"
    class="progress-circular-wrapper d-flex flex-wrap justify-center align-center align-content-center"
  >
    <v-progress-circular
      :size="50"
      color="info"
      indeterminate
    ></v-progress-circular>
    <div class="w-100 text-center mt-5">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.progress-circular-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>

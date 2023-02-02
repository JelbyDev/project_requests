<script setup lang="ts">
import ProjectsSection from '@/components/ProjectsSection.vue';
</script>

<template>
  <div>
    <ui-page-title>Список проектов</ui-page-title>
    <ProjectsSection></ProjectsSection>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: relative;
  min-height: 150px;
}
</style>

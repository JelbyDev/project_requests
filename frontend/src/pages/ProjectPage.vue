<script setup lang="ts">
import { toRefs } from 'vue';
import { useProjectSingleStore } from '@/stores/projectSingle';
import ProjectSection from '@/components/ProjectSection.vue';

const { project } = toRefs(useProjectSingleStore());
</script>

<template>
  <ui-page-title v-if="project">{{ project.name }}</ui-page-title>
  <ProjectSection></ProjectSection>
</template>

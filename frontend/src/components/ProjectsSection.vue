<script setup lang="ts">
import { toRefs } from 'vue';
import { useProjectsListStore } from '@/stores/projectsList';
import ProjectsSectionButtons from './ProjectsSectionButtons.vue';

const { projects, isLoadingProjects } = toRefs(useProjectsListStore());
</script>

<template>
  <div>
    <Teleport to="main">
      <ui-loader :is-loading="isLoadingProjects"></ui-loader>
    </Teleport>

    <div v-if="!isLoadingProjects">
      <v-row v-if="projects.length">
        <v-col cols="12" v-for="project in projects" :key="project.id">
          <v-card
            :title="project.name"
            :to="`/projects/${project.id}`"
            class="w-100"
            variant="outlined"
          >
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="py-12 text-h5 text-center">Список проектов пуст</div>

      <ProjectsSectionButtons></ProjectsSectionButtons>
    </div>
  </div>
</template>

<style scoped></style>

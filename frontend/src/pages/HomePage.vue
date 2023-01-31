<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects';

const projectStore = useProjectsStore();
</script>
<template>
  <div>
    <ui-page-title>Список проектов</ui-page-title>
    <v-row v-if="projectStore.projects.length > 10">
      <v-col cols="auto">
        <v-btn color="info">Новый проект</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="info">Новая заявка</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        v-for="project in projectStore.projects"
        :key="project.id"
      >
        <v-card
          :title="project.name"
          :to="`/projects/${project.id}`"
          class="w-100"
          variant="outlined"
        >
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-end">
      <v-col cols="auto">
        <v-btn color="info">Новый проект</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="info">Новая заявка</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>

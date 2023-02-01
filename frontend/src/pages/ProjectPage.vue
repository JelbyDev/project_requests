<script setup lang="ts">
import ProjectRequestsList from '@/components/ProjectRequestsList.vue';
import { useProjectSingle } from '@/composables/useProjectSingle';
import { useRoute } from 'vue-router';

const { projectId } = useRoute().params;
const {
  project,
  isLoadingProject,
  isLoadingRequests,
  bindRequests,
  unbindRequests,
} = useProjectSingle(Number(projectId));
</script>

<template>
  <div>
    <Teleport to="main">
      <ui-loader :is-loading="isLoadingProject"></ui-loader>
    </Teleport>

    <template v-if="project">
      <ui-page-title>{{ project.name }}</ui-page-title>

      <v-row>
        <v-col cols="6">
          <ProjectRequestsList
            list-title="Задачи проекта"
            :is-loading-requests="isLoadingRequests"
            :requests="bindRequests"
          ></ProjectRequestsList>
        </v-col>

        <v-col cols="6">
          <ProjectRequestsList
            list-title="Задачи без проекта"
            :is-loading-requests="isLoadingRequests"
            :requests="unbindRequests"
          ></ProjectRequestsList>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

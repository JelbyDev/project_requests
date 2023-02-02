<script setup lang="ts">
import { toRefs } from 'vue';
import ProjectRequestsList from '@/components/ProjectRequestsList.vue';
import { useProjectSingleStore } from '@/stores/projectSingle';
import { useRoute } from 'vue-router';

const {
  projectId,
  project,
  isLoadingProject,
  isLoadingRequests,
  projectRequests,
  freeRequests,
} = toRefs(useProjectSingleStore());

projectId.value = Number(useRoute().params?.projectId);
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
            :requests="projectRequests"
          ></ProjectRequestsList>
        </v-col>

        <v-col cols="6">
          <ProjectRequestsList
            list-title="Задачи без проекта"
            :is-loading-requests="isLoadingRequests"
            :requests="freeRequests"
          ></ProjectRequestsList>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

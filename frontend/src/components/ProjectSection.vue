<script setup lang="ts">
import { toRefs } from 'vue';
import { useProjectSingleStore } from '@/stores/projectSingle';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import ProjectSectionRequests from '@/components/ProjectSectionRequests.vue';

const {
  projectId,
  project,
  isLoadingProject,
  isLoadingRequests,
  projectRequests,
  freeRequests,
} = toRefs(useProjectSingleStore());

projectId.value = Number(useRoute().params?.projectId);
onBeforeRouteLeave(() => {
  console.log('1');
  projectId.value = 0;
});
</script>

<template>
  <div>
    <Teleport to="main">
      <ui-loader :is-loading="isLoadingProject"></ui-loader>
    </Teleport>

    <div v-if="project">
      <div class="mb-10">
        <ProjectSectionRequests
          list-title="Задачи проекта"
          :is-loading-requests="isLoadingRequests"
          :requests="projectRequests"
        ></ProjectSectionRequests>
      </div>

      <div>
        <ProjectSectionRequests
          list-title="Задачи без проекта"
          :is-loading-requests="isLoadingRequests"
          :requests="freeRequests"
        ></ProjectSectionRequests>
      </div>
    </div>
  </div>
</template>

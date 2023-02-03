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
const { loadRequests } = useProjectSingleStore();

const pageProjectId = Number(useRoute().params?.projectId);
if (pageProjectId === projectId.value) {
  loadRequests();
  isLoadingProject.value = false;
} else {
  projectId.value = pageProjectId;
}

onBeforeRouteLeave(() => {
  isLoadingProject.value = true;
});
</script>

<template>
  <div>
    <Teleport to="main">
      <ui-loader :is-loading="isLoadingProject"></ui-loader>
    </Teleport>

    <div v-if="project && !isLoadingProject">
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

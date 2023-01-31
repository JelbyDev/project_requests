<script setup lang="ts">
import { ref } from 'vue';
import ProjectCreateOrUpdateForm from '@/components/ProjectCreateOrUpdateForm.vue';
import { useProjectsStore } from '@/stores/projects';

const projectStore = useProjectsStore();
const isVisibleProjectForm = ref<boolean>(false);
function setIsVisibleProjectForm(flag: boolean) {
  isVisibleProjectForm.value = flag;
}
</script>
<template>
  <div>
    <ui-page-title>Список проектов</ui-page-title>

    <Teleport to="main">
      <ui-loader :is-loading="projectStore.isLoadingProjects"></ui-loader>
    </Teleport>

    <template v-if="!projectStore.isLoadingProjects">
      <v-row v-if="projectStore.projects.length">
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
      <div v-else class="py-12 text-h5 text-center">Список проектов пуст</div>

      <v-row class="justify-end">
        <v-col cols="auto">
          <v-btn color="info" @click="setIsVisibleProjectForm(true)"
            >Новый проект</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn color="info">Новая заявка</v-btn>
        </v-col>
      </v-row>
    </template>

    <ui-modal
      :is-visible="isVisibleProjectForm"
      @close="setIsVisibleProjectForm"
    >
      <template #header>Форма проекта</template>
      <template #body>
        <ProjectCreateOrUpdateForm
          @success="setIsVisibleProjectForm(false)"
        ></ProjectCreateOrUpdateForm>
      </template>
    </ui-modal>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: relative;
  min-height: 150px;
}
</style>

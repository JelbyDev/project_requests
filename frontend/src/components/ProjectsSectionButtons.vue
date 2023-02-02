<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types';
import { useProjectsListStore } from '@/stores/projectsList';
import ProjectCreateOrUpdateForm from '@/components/ProjectCreateOrUpdateForm.vue';

const { createProject, updateProject } = useProjectsListStore();

const isVisibleProjectForm = ref<boolean>(false);
function setIsVisibleProjectForm(flag: boolean) {
  isVisibleProjectForm.value = flag;
}

function onSubmitProjectForm(project: Project) {
  let sendFunction = null;

  if (project.id) {
    sendFunction = updateProject;
  } else {
    sendFunction = createProject;
  }

  sendFunction(project).then(() => {
    setIsVisibleProjectForm(false);
  });
}
</script>

<template>
  <div>
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

    <ui-modal
      :is-visible="isVisibleProjectForm"
      @close="setIsVisibleProjectForm"
    >
      <template #header>Форма проекта</template>
      <template #body>
        <ProjectCreateOrUpdateForm
          @submit="onSubmitProjectForm"
        ></ProjectCreateOrUpdateForm>
      </template>
    </ui-modal>
  </div>
</template>

<style scoped></style>

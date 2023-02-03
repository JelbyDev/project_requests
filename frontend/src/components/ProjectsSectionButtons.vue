<script setup lang="ts">
import { ref } from 'vue';
import type { Project, Request } from '@/types';
import { useProjectsListStore } from '@/stores/projectsList';
import ProjectCreateOrUpdateForm from '@/components/ProjectCreateOrUpdateForm.vue';
import RequestCreateOrUpdateForm from '@/components/RequestCreateOrUpdateForm.vue';

const { createProject, createRequest } = useProjectsListStore();

const isVisibleProjectForm = ref<boolean>(false);
function setIsVisibleProjectForm(flag: boolean) {
  isVisibleProjectForm.value = flag;
}

function onSubmitProjectForm(project: Project) {
  createProject(project).then(() => {
    setIsVisibleProjectForm(false);
  });
}

const isVisibleRequestForm = ref<boolean>(false);
function setIsVisibleRequestForm(flag: boolean) {
  isVisibleRequestForm.value = flag;
}

function onSubmitRequestForm(request: Request) {
  createRequest(request).then(() => {
    setIsVisibleRequestForm(false);
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
        <v-btn color="info" @click="setIsVisibleRequestForm(true)"
          >Новая заявка</v-btn
        >
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

    <ui-modal
      :is-visible="isVisibleRequestForm"
      @close="setIsVisibleRequestForm"
    >
      <template #header>Форма заявки</template>
      <template #body>
        <RequestCreateOrUpdateForm
          @submit="onSubmitRequestForm"
        ></RequestCreateOrUpdateForm>
      </template>
    </ui-modal>
  </div>
</template>

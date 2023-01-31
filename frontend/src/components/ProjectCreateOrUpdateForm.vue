<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types';
import { useProjectsStore } from '@/stores/projects';
import useValidationProjectForm from '@/composables/useValidationProjectForm';

const props = defineProps<{
  project?: Project;
}>();
const emits = defineEmits<{ (e: 'success'): void }>();
const projectStore = useProjectsStore();
const { isFormValid, validationRules } = useValidationProjectForm();
const isSendingForm = ref<boolean>(false);
const formProject = ref<Project>(
  props.project ? { ...props.project } : { name: '' },
);

function sendForm() {
  isSendingForm.value = true;
  let sendFunction = null;

  if (formProject.value.id) {
    sendFunction = projectStore.updateProject;
  } else {
    sendFunction = projectStore.createProject;
  }

  sendFunction(formProject.value)
    .then(() => {
      emits('success');
    })
    .finally(() => {
      isSendingForm.value = false;
    });
}
</script>

<template>
  <v-form novalidate v-model="isFormValid">
    <v-text-field
      v-model="formProject.name"
      :rules="validationRules.name"
      class="mb-2"
      label="Название"
      variant="outlined"
      autofocus
      required
    ></v-text-field>
    <div class="text-center">
      <v-btn
        size="large"
        color="info"
        :disabled="!isFormValid"
        :loading="isSendingForm"
        @click="sendForm"
      >
        Сохранить
      </v-btn>
    </div>
  </v-form>
</template>

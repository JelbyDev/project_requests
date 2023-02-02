<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types';
import useValidationProjectForm from '@/composables/useValidationProjectForm';

const props = defineProps<{
  project?: Project;
}>();
const emits = defineEmits<{ (e: 'submit', formProject: Project): void }>();

const { isFormValid, validationRules } = useValidationProjectForm();

const isSendingForm = ref<boolean>(false);
const formProject = ref<Project>(
  props.project ? { ...props.project } : { name: '' },
);

function onSubmit() {
  isSendingForm.value = true;
  emits('submit', formProject.value);
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
        @click="onSubmit"
      >
        Сохранить
      </v-btn>
    </div>
  </v-form>
</template>

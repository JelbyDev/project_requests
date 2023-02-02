<script setup lang="ts">
import { ref } from 'vue';
import type { Request } from '@/types';
import useValidationRequestForm from '@/composables/useValidationRequestForm';

const props = defineProps<{
  request?: Request;
}>();
const emits = defineEmits<{ (e: 'submit', formRequest: Request): void }>();

const { isFormValid, validationRules } = useValidationRequestForm();

const isSendingForm = ref<boolean>(false);
const formRequest = ref<Request>(
  props.request
    ? { ...props.request }
    : { name: '', description: '', project_id: 0, status_code: '' },
);

function onSubmit() {
  isSendingForm.value = true;
  emits('submit', formRequest.value);
}
</script>

<template>
  <v-form novalidate v-model="isFormValid">
    <v-text-field
      v-model="formRequest.name"
      :rules="validationRules.name"
      class="mb-2"
      label="Название"
      variant="outlined"
      autofocus
      required
    ></v-text-field>

    <v-textarea
      v-model="formRequest.description"
      :rules="validationRules.description"
      class="mb-2"
      label="Описание"
      variant="outlined"
      autofocus
      required
    ></v-textarea>

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

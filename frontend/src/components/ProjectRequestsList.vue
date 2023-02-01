<script setup lang="ts">
import type { Request } from '@/types';
import ProjectRequestsBindButton from '@/components/ProjectRequestsBindButton.vue';
import ProjectRequestsUnbindButton from '@/components/ProjectRequestsUnbindButton.vue';

defineProps<{
  listTitle: string;
  requests: Request[];
  isLoadingRequests: boolean;
}>();
</script>

<template>
  <div class="text-h5 mb-5 text-center">{{ listTitle }}</div>
  <div v-if="isLoadingRequests" class="loader-wrapper">
    <ui-loader :is-loading="isLoadingRequests">Загружаю задачи...</ui-loader>
  </div>
  <v-row v-else-if="requests.length">
    <v-col cols="12" v-for="request in requests" :key="request.id">
      <v-card :to="`/requests/${request.id}`" class="w-100" variant="outlined">
        <div class="d-flex justify-space-between align-center">
          <v-card-title>{{ request.name }}</v-card-title>

          <v-card-actions class="pa-0 pr-2">
            <ProjectRequestsBindButton
              v-if="!request.project_id"
              :request-id="request.id ?? 0"
            >
              Привязать
            </ProjectRequestsBindButton>

            <ProjectRequestsUnbindButton v-else :request-id="request.id ?? 0">
              Отвязать
            </ProjectRequestsUnbindButton>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <div v-else class="py-12 text-h5 text-center">В данном списке нет задач</div>
</template>

<style scoped>
.loader-wrapper {
  position: relative;
  min-height: 150px;
}
</style>

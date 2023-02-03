<script setup lang="ts">
import { toRefs } from 'vue';
import { useRequestSingleStore } from '@/stores/requestSingle';
import RequestSectionStatusesPrevButton from '@/components/RequestSectionStatusesPrevButton.vue';
import RequestSectionStatusesNextButton from '@/components/RequestSectionStatusesNextButton.vue';

const {
  requestId,
  currentStatus,
  nextStatuses,
  prevStatus,
  isLoadingStatuses,
} = toRefs(useRequestSingleStore());
</script>

<template>
  <div class="text-h5 mt-10 mb-3">Информация по статусам</div>
  <div v-if="isLoadingStatuses" class="loader-wrapper">
    <ui-loader :is-loading="isLoadingStatuses">
      Загружаю информацию по статусам...
    </ui-loader>
  </div>
  <div v-else-if="currentStatus">
    <v-row>
      <v-col cols="auto">
        <div class="text-subtitle-2 mb-1">Предыдущий</div>
        <div v-if="prevStatus">
          <RequestSectionStatusesPrevButton
            :request-id="requestId"
            :prev-status-id="prevStatus.id"
          >
            {{ prevStatus.name }}
          </RequestSectionStatusesPrevButton>
        </div>
        <div v-else>Нет доступных статусов</div>
      </v-col>

      <v-col cols="auto">
        <div class="text-subtitle-2 mb-1">Текущий</div>
        <v-btn variant="outlined" color="info" disabled>
          {{ currentStatus.name }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <div class="text-subtitle-2 mb-1">Следующие</div>
        <div v-if="nextStatuses.length">
          <div v-for="status in nextStatuses" :key="status.id" class="mb-5">
            <RequestSectionStatusesNextButton
              :request-id="requestId"
              :next-status-id="status.id"
            >
              {{ status.name }}
            </RequestSectionStatusesNextButton>
          </div>
        </div>
        <div v-else>Нет доступных статусов</div>
      </v-col>
    </v-row>
  </div>
  <div v-else>Информация по статусам отсутствует</div>
</template>

<style scoped>
.loader-wrapper {
  position: relative;
  min-height: 150px;
}
</style>

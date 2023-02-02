<script setup lang="ts">
import { toRefs } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { useRequestSingleStore } from '@/stores/requestSingle';

const {
  requestId,
  request,
  isLoadingRequest,
  currentStatus,
  nextStatuses,
  prevStatus,
  isLoadingStatuses,
} = toRefs(useRequestSingleStore());
const pageRequestId = Number(useRoute().params?.requestId);
if (pageRequestId === requestId.value) isLoadingRequest.value = false;
requestId.value = pageRequestId;

onBeforeRouteLeave(() => {
  isLoadingRequest.value = true;
});
</script>

<template>
  <div>
    <Teleport to="main">
      <ui-loader :is-loading="isLoadingRequest"></ui-loader>
    </Teleport>

    <div v-if="request && !isLoadingRequest">
      <div class="text-h5 mb-3">Описание</div>
      {{ request.description }}

      <div class="text-h5 mt-10 mb-3">Статус</div>
      <div v-if="isLoadingStatuses" class="loader-wrapper">
        <ui-loader :is-loading="isLoadingStatuses">
          Загружаю информацию по статусам...
        </ui-loader>
      </div>
      <div v-else>
        <div>Текущий статус: {{ currentStatus?.name }}</div>
        <div>
          Следующие статусы:
          <div v-for="status in nextStatuses" :key="status.id">
            {{ status.name }}
          </div>
        </div>
        <div>
          Предыдущй:
          {{ prevStatus?.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: relative;
  min-height: 150px;
}
</style>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { useRequestSingleStore } from '@/stores/requestSingle';

const { requestId, request, isLoadingRequest } = toRefs(
  useRequestSingleStore(),
);
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
      Текущий статус: {{ request.current_status?.name }}
    </div>
  </div>
</template>

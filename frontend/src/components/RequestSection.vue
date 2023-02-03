<script setup lang="ts">
import { toRefs } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { useRequestSingleStore } from '@/stores/requestSingle';
import RequestSectionStatuses from '@/components/RequestSectionStatuses.vue';

const { requestId, request, isLoadingRequest } = toRefs(
  useRequestSingleStore(),
);
const pageRequestId = Number(useRoute().params?.requestId);
if (pageRequestId === requestId.value) {
  isLoadingRequest.value = false;
} else {
  requestId.value = pageRequestId;
}

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

      <RequestSectionStatuses></RequestSectionStatuses>
    </div>
  </div>
</template>

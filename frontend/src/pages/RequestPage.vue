<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRequestApi } from '@/api/Request';
import type { Request } from '@/types';

const router = useRouter();
const route = useRoute();

const requestId = ref<number>(Number(route.params?.requestId));
const isLoadingRequest = ref<boolean>(true);
const request = ref<Request | null>(null);

getRequestApi(requestId.value).then((requestFromApi) => {
  if (requestFromApi) {
    request.value = { ...requestFromApi };
    isLoadingRequest.value = false;
  } else {
    router.push('/not-found');
  }
});
</script>

<template>
  <Teleport to="main">
    <ui-loader :is-loading="isLoadingRequest"></ui-loader>
  </Teleport>

  <div v-if="request">
    <ui-page-title>{{ request.name }}</ui-page-title>
    <div>Описание: {{ request.description }}</div>
    <div>Текущий статус: {{ request.status_code }}</div>
  </div>
</template>

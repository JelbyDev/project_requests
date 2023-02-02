import { watch, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Request, Status } from '@/types';
import { useRouter } from 'vue-router';
import { getRequestApi } from '@/api/Request';
import { getNextStatusesApi, getPrevStatusApi } from '@/api/Status';

export const useRequestSingleStore = defineStore('request-single', () => {
  const router = useRouter();
  const requestId = ref<number>(0);

  const request = ref<Request | null>(null);
  const currentStatus = ref<Status | null>(null);
  const nextStatuses = ref<Status[]>([]);
  const prevStatus = ref<Status | null>(null);
  const isLoadingRequest = ref<boolean>(true);
  const isLoadingStatuses = ref<boolean>(true);

  async function loadRequest(): Promise<void> {
    const requestFromApi = await getRequestApi(requestId.value);
    if (requestFromApi) {
      request.value = { ...requestFromApi };
      loadNextAndPrevStatusesInfo();
      isLoadingRequest.value = false;
    } else {
      router.push('/not-found');
    }
  }

  async function loadNextAndPrevStatusesInfo() {
    if (request.value?.current_status) {
      const statusId = request.value.current_status.id;
      const statusesPromises = await Promise.allSettled([
        getNextStatusesApi(statusId),
        getPrevStatusApi(statusId),
      ]);

      if (statusesPromises[0].status === 'fulfilled') {
        nextStatuses.value = [...statusesPromises[0].value];
      }

      if (statusesPromises[1].status === 'fulfilled') {
        prevStatus.value = statusesPromises[1].value;
      }

      currentStatus.value = { ...request.value?.current_status };

      isLoadingStatuses.value = false;
    }
  }

  watch(requestId, () => {
    loadRequest();
  });

  return {
    requestId,
    request,
    isLoadingRequest,
    currentStatus,
    nextStatuses,
    prevStatus,
    isLoadingStatuses,
  };
});

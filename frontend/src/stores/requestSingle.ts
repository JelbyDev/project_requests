import { watch, ref } from 'vue';
import { defineStore } from 'pinia';
import type { RequestDetail, Status } from '@/types';
import { useRouter } from 'vue-router';
import {
  getRequestApi,
  setPrevRequestStatusApi,
  setNextRequestStatusApi,
} from '@/api/Request';
import { getNextStatusesApi, getPrevStatusApi } from '@/api/Status';

export const useRequestSingleStore = defineStore('request-single', () => {
  const router = useRouter();
  const requestId = ref<number>(0);

  const request = ref<RequestDetail | null>(null);
  const currentStatus = ref<Status | null>(null);
  const nextStatuses = ref<Status[]>([]);
  const prevStatus = ref<Status | null>(null);
  const isLoadingRequest = ref<boolean>(true);
  const isLoadingStatuses = ref<boolean>(true);

  async function loadRequest(): Promise<void> {
    const requestFromApi = await getRequestApi(requestId.value);
    if (requestFromApi) {
      request.value = { ...requestFromApi };
      loadStatuses();
      isLoadingRequest.value = false;
    } else {
      router.push('/not-found');
    }
  }

  async function loadStatuses() {
    isLoadingStatuses.value = true;

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

      currentStatus.value = { ...request.value.current_status };
    }

    isLoadingStatuses.value = false;
  }

  async function setPrevRequestStatus(requestId: number, prevStatusId: number) {
    const requestFromApi = await setPrevRequestStatusApi(
      requestId,
      prevStatusId,
    );
    if (requestFromApi) reloadStatuses(requestFromApi);
  }

  async function setNextRequestStatus(requestId: number, statusId: number) {
    const requestFromApi = await setNextRequestStatusApi(requestId, statusId);
    if (requestFromApi) reloadStatuses(requestFromApi);
  }

  function reloadStatuses(newRequest: RequestDetail) {
    if (request.value?.current_status) {
      request.value.current_status = newRequest.current_status;
    }
    loadStatuses();
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
    setPrevRequestStatus,
    setNextRequestStatus,
  };
});

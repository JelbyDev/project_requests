import { watch, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Request } from '@/types';
import { useRouter } from 'vue-router';
import { getRequestApi } from '@/api/Request';

export const useRequestSingleStore = defineStore('request-single', () => {
  const router = useRouter();
  const requestId = ref<number>(0);

  const request = ref<Request | null>(null);
  const isLoadingRequest = ref<boolean>(true);

  async function loadRequest(): Promise<void> {
    getRequestApi(requestId.value).then((requestFromApi) => {
      if (requestFromApi) {
        request.value = { ...requestFromApi };
        isLoadingRequest.value = false;
      } else {
        router.push('/not-found');
      }
    });
  }

  watch(requestId, () => {
    loadRequest();
  });

  return {
    requestId,
    request,
    isLoadingRequest,
  };
});

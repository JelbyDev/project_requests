import { onMounted, onUpdated, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Project, Request } from '@/types';
import { getProjectApi, getProjectRequestsApi } from '@/api/Project';
import {
  getFreeRequestsApi,
  bindRequestToProjectApi,
  unbindRequestToProjectApi,
} from '@/api/Request';
import { useRouter, useRoute } from 'vue-router';

export const useProjectSingleStore = defineStore('project-single', () => {
  const router = useRouter();
  const projectId = Number(useRoute().params?.projectId);

  const project = ref<Project | null>(null);
  const requests = ref<Request[]>([]);
  const isLoadingProject = ref<boolean>(true);
  const isLoadingRequests = ref<boolean>(true);

  const projectRequests = computed<Request[]>(() => {
    return requests.value.filter((request) => request.project_id);
  });

  const freeRequests = computed<Request[]>(() => {
    return requests.value.filter((request) => !request.project_id);
  });

  async function loadProject(): Promise<void> {
    const projectsFromApi = await getProjectApi(projectId);
    if (projectsFromApi) {
      project.value = { ...projectsFromApi };
      loadRequests();
      isLoadingProject.value = false;
    } else {
      router.push('/not-found');
    }
  }

  async function loadRequests(): Promise<void> {
    const requestsPromises = await Promise.allSettled([
      getFreeRequestsApi(),
      getProjectRequestsApi(projectId),
    ]);

    for (const requestsPromise of requestsPromises) {
      if (
        requestsPromise.status === 'fulfilled' &&
        requestsPromise.value.length
      ) {
        requests.value = [...requests.value, ...requestsPromise.value];
      }
    }

    isLoadingRequests.value = false;
  }

  async function bindRequestToProject(requestId: number) {
    if (requestId && projectId) {
      const requestFromApi = await bindRequestToProjectApi(
        requestId,
        projectId,
      );

      if (requestFromApi) updateRequestInStoreById(requestId, requestFromApi);
    }
  }

  async function unbindRequestToProject(requestId: number) {
    if (requestId) {
      const requestFromApi = await unbindRequestToProjectApi(requestId, 0);

      if (requestFromApi) updateRequestInStoreById(requestId, requestFromApi);
    }
  }

  function updateRequestInStoreById(
    requestId: number,
    newRequest: Request,
  ): void {
    const foundRequestIndex = requests.value.findIndex(
      (request) => request.id === requestId,
    );
    if (foundRequestIndex !== -1)
      requests.value[foundRequestIndex] = { ...newRequest };
  }

  onMounted(() => {
    loadProject();
  });

  return {
    project,
    isLoadingProject,
    isLoadingRequests,
    freeRequests,
    projectRequests,
    bindRequestToProject,
    unbindRequestToProject,
  };
});

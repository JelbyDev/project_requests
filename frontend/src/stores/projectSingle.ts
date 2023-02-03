import { watch, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Project, Request } from '@/types';
import { getProjectApi, getProjectRequestsApi } from '@/api/Project';
import {
  getFreeRequestsApi,
  bindRequestToProjectApi,
  unbindRequestToProjectApi,
} from '@/api/Request';
import { useRouter } from 'vue-router';

export const useProjectSingleStore = defineStore('project-single', () => {
  const router = useRouter();
  const projectId = ref<number>(0);

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
    const projectFromApi = await getProjectApi(projectId.value);
    if (projectFromApi) {
      project.value = { ...projectFromApi };
      loadRequests();
      isLoadingProject.value = false;
    } else {
      router.push('/not-found');
    }
  }

  async function loadRequests(): Promise<void> {
    isLoadingRequests.value = true;

    let freeRequests: Request[] = [];
    let projectRequests: Request[] = [];

    const requestsPromises = await Promise.allSettled([
      getProjectRequestsApi(projectId.value),
      getFreeRequestsApi(),
    ]);

    if (requestsPromises[0].status === 'fulfilled') {
      projectRequests = [...requestsPromises[0].value];
    }

    if (requestsPromises[1].status === 'fulfilled') {
      freeRequests = [...requestsPromises[1].value];
    }

    requests.value = [...projectRequests, ...freeRequests];
    isLoadingRequests.value = false;
  }

  async function bindRequestToProject(requestId: number) {
    if (requestId && projectId.value) {
      const requestFromApi = await bindRequestToProjectApi(
        requestId,
        projectId.value,
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

  watch(projectId, () => {
    if (projectId.value !== 0) loadProject();
  });

  return {
    projectId,
    project,
    isLoadingProject,
    isLoadingRequests,
    loadRequests,
    freeRequests,
    projectRequests,
    bindRequestToProject,
    unbindRequestToProject,
  };
});

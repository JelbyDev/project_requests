import { onMounted, ref, computed } from 'vue';
import type { Project, Request } from '@/types';
import { apiGetProject, apiGetProjectRequests } from '@/api/Projects';
import { apiGetUnbindRequests } from '@/api/Request';
import { useRouter } from 'vue-router';

export function useProjectSingle(projectId: number) {
  const router = useRouter();

  const project = ref<Project | null>(null);
  const requests = ref<Request[]>([]);
  const isLoadingProject = ref<boolean>(true);
  const isLoadingRequests = ref<boolean>(true);

  const bindRequests = computed(() => {
    return requests.value.filter((request) => request.project_id);
  });

  const unbindRequests = computed(() => {
    return requests.value.filter((request) => !request.project_id);
  });

  function loadProject(): void {
    apiGetProject(projectId).then((response) => {
      if (response) {
        project.value = { ...response };
        loadProjectRequests();
        isLoadingProject.value = false;
      } else {
        router.push('/not-found');
      }
    });
  }

  async function loadProjectRequests(): Promise<void> {
    const requestsPromises = await Promise.allSettled([
      apiGetUnbindRequests(),
      apiGetProjectRequests(projectId),
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

  onMounted(() => {
    loadProject();
  });

  return {
    project,
    isLoadingProject,
    isLoadingRequests,
    bindRequests,
    unbindRequests,
  };
}

import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Project, Request } from '@/types';
import { getProjectsApi, createProjectApi } from '@/api/Project';
import { createRequestApi } from '@/api/Request';

export const useProjectsListStore = defineStore('projects-list', () => {
  const projects = ref<Project[]>([]);
  const isLoadingProjects = ref<boolean>(true);

  async function loadProjects(): Promise<void> {
    const projectsFromApi: Project[] = await getProjectsApi();
    if (projectsFromApi.length) projects.value = [...projectsFromApi];
    isLoadingProjects.value = false;
  }

  async function createProject(project: Project): Promise<void> {
    const projectFromApi = await createProjectApi(project);
    if (projectFromApi?.id) projects.value.push(projectFromApi);
  }

  async function createRequest(request: Request): Promise<void> {
    const requestFromApi = await createRequestApi(request);
  }

  onMounted(() => {
    loadProjects();
  });

  return { projects, isLoadingProjects, createProject, createRequest };
});

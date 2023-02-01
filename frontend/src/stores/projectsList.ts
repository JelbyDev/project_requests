import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Project } from '@/types';
import {
  getProjectsApi,
  createProjectApi,
  updateProjectApi,
} from '@/api/Project';

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

  async function updateProject(project: Project): Promise<void> {
    const projectFromApi = await updateProjectApi(project);
    if (projectFromApi?.id) {
      const updatedProjectIndex = projects.value.findIndex(
        (project: Project) => project.id === projectFromApi.id,
      );
      projects.value[updatedProjectIndex] = { ...projectFromApi };
    }
  }

  onMounted(() => {
    loadProjects();
  });

  return { projects, isLoadingProjects, createProject, updateProject };
});

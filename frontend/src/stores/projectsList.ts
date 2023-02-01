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
    const response: Project[] = await getProjectsApi();
    if (response.length) projects.value = [...response];
    isLoadingProjects.value = false;
  }

  async function createProject(project: Project): Promise<void> {
    const response = await createProjectApi(project);
    if (response?.id) projects.value.push(response);
  }

  async function updateProject(project: Project): Promise<void> {
    const response = await updateProjectApi(project);
    if (response?.id) {
      const updatedProjectIndex = projects.value.findIndex(
        (project: Project) => project.id === response.id,
      );
      projects.value[updatedProjectIndex] = { ...response };
    }
  }

  onMounted(() => {
    loadProjects();
  });

  return { projects, isLoadingProjects, createProject, updateProject };
});

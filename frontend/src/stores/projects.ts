import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Project } from '@/types';
import {
  apiGetProjects,
  apiCreateProject,
  apiUpdateProject,
} from '@/api/Projects';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);

  async function loadProjects(): Promise<void> {
    const response: Project[] = await apiGetProjects();
    if (response.length) projects.value = [...response];
  }

  async function createProject(project: Project): Promise<void> {
    const response = await apiCreateProject(project);
    if (response.id) projects.value.push(response);
  }

  async function updateProject(project: Project): Promise<void> {
    const response = await apiUpdateProject(project);
    if (response.id) {
      const updatedProjectIndex = projects.value.findIndex(
        (project: Project) => project.id === response.id,
      );
      projects.value[updatedProjectIndex] = { ...response };
    }
  }

  onMounted(() => {
    loadProjects();
  });

  return { projects, createProject, updateProject };
});

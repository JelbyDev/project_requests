import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Project } from '@/types';
import { getProjects } from '@/api/Projects';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);

  async function loadProjects() {
    const response = await getProjects();
    projects.value = [...response];
  }

  onMounted(() => {
    loadProjects();
  });

  return { projects };
});

import $apiInstance from '@/api/AxiosInstance';
import type { Project } from '@/types';

export async function apiGetProjects(): Promise<Project[]> {
  const response = await $apiInstance.get('/projects');
  return response.data;
}

export async function apiCreateProject(project: Project): Promise<Project> {
  const response = await $apiInstance.post('/project', project);
  return response.data;
}

export async function apiUpdateProject(project: Project): Promise<Project> {
  const response = await $apiInstance.patch('/project', project);
  return response.data;
}

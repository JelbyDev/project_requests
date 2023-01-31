import $apiInstance from '@/api/AxiosInstance';
import type { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  const response = await $apiInstance.get('/projects');
  return response.data;
}

import $apiInstance from '@/api/AxiosInstance';
import type { Project, Request } from '@/types';

export async function getProjectsApi(): Promise<Project[]> {
  let result: Project[] = [];
  try {
    const response = await $apiInstance.get('/projects');
    result = response.data;
  } catch (error) {
    alert('Ошибка получения списка проектов');
  }
  return result;
}

export async function getProjectApi(
  projectId: number,
): Promise<Project | null> {
  let result: Project | null = null;
  try {
    const response = await $apiInstance.get(`/project/${projectId}`);
    result = response.data;
  } catch (error) {
    alert('Ошибка получения информации о проекте');
  }
  return result;
}

export async function getProjectRequestsApi(
  projectId: number,
): Promise<Request[]> {
  let result: Request[] = [];
  try {
    const response = await $apiInstance.get(`/project/${projectId}/requests`);
    result = response.data;
  } catch (error) {
    alert('Ошибка получения заявок проекта');
  }
  return result;
}

export async function createProjectApi(
  project: Project,
): Promise<Project | null> {
  let result: Project | null = null;
  try {
    const response = await $apiInstance.post('/project', project);
    result = response.data;
  } catch (error) {
    alert('Ошибка добавления проекта');
  }
  return result;
}

export async function updateProjectApi(
  project: Project,
): Promise<Project | null> {
  const result: Project | null = null;
  try {
    const response = await $apiInstance.patch('/project', project);
    return response.data;
  } catch (error) {
    alert('Ошибка редактирования проекта');
  }
  return result;
}

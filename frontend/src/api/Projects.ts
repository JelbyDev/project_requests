import $apiInstance from '@/api/AxiosInstance';
import type { Project } from '@/types';

export async function apiGetProjects(): Promise<Project[]> {
  let result: Project[] = [];
  try {
    const response = await $apiInstance.get('/projects');
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function apiGetProject(
  projectId: number,
): Promise<Project | null> {
  let result: Project | null = null;
  try {
    const response = await $apiInstance.get(`/project/${projectId}`);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function apiGetProjectRequests(
  projectId: number,
): Promise<Request[]> {
  let result: Request[] = [];
  try {
    const response = await $apiInstance.get(`/project/${projectId}/requests`);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function apiCreateProject(
  project: Project,
): Promise<Project | null> {
  let result: Project | null = null;
  try {
    const response = await $apiInstance.post('/project', project);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function apiUpdateProject(
  project: Project,
): Promise<Project | null> {
  const result: Project | null = null;
  try {
    const response = await $apiInstance.patch('/project', project);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

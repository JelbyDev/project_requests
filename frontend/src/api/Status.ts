import $apiInstance from '@/api/AxiosInstance';
import type { Status } from '@/types';

export async function getNextStatusesApi(statusId: number): Promise<Status[]> {
  let result: Status[] = [];
  try {
    const response = await $apiInstance.get(`/status/next/${statusId}`);
    result = response.data;
  } catch (error) {
    alert('Ошибка получения новых статусов');
  }
  return result;
}

export async function getPrevStatusApi(
  statusId: number,
): Promise<Status | null> {
  let result: Status | null = null;
  try {
    const response = await $apiInstance.get(`/status/prev/${statusId}`);
    result = response.data;
  } catch (error) {
    alert('Ошибка получения предыдущих статусов');
  }
  return result;
}

import $apiInstance from '@/api/AxiosInstance';
import type { Status } from '@/types';

export async function getNextStatusesApi(statusId: number): Promise<Status[]> {
  let result: Status[] = [];
  try {
    const response = await $apiInstance.get(`/statuses/next/${statusId}`);
    result = response.data;
  } catch (error) {
    alert(error);
  }
  return result;
}

export async function getPrevStatusApi(
  statusId: number,
): Promise<Status | null> {
  let result: Status | null = null;
  try {
    const response = await $apiInstance.get(`/statuses/prev/${statusId}`);
    result = response.data;
  } catch (error) {
    alert(error);
  }
  return result;
}

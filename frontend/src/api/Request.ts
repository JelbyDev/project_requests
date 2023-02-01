import $apiInstance from '@/api/AxiosInstance';
import type { Request } from '@/types';

export async function apiGetUnbindRequests(): Promise<Request[]> {
  let result: Request[] = [];
  try {
    const response = await $apiInstance.get(`/requests`);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

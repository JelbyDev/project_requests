import $apiInstance from '@/api/AxiosInstance';
import type { Request, RequestDetail, Status } from '@/types';

export async function getFreeRequestsApi(): Promise<Request[]> {
  let result: Request[] = [];
  try {
    const response = await $apiInstance.get(`/requests`);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function getRequestApi(
  requestId: number,
): Promise<RequestDetail | null> {
  let result: RequestDetail | null = null;
  try {
    const response = await $apiInstance.get(`/request/${requestId}`);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function createRequestApi(
  request: Request,
): Promise<Request | null> {
  let result: Request | null = null;
  try {
    const response = await $apiInstance.post('/request', request);
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function updateRequestApi(
  request: Request,
): Promise<Request | null> {
  const result: Request | null = null;
  try {
    const response = await $apiInstance.patch('/request', request);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function bindRequestToProjectApi(
  requestId: number,
  projectId: number,
): Promise<Request | null> {
  let result: Request | null = null;
  try {
    const response = await $apiInstance.post(
      `/request/${requestId}/bind/${projectId}`,
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function unbindRequestToProjectApi(
  requestId: number,
  projectId: number,
): Promise<Request | null> {
  let result: Request | null = null;
  try {
    const response = await $apiInstance.post(
      `/request/${requestId}/unbind/${projectId}`,
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function setNextRequestStatusApi(
  requestId: number,
  nextStatusId: number,
): Promise<RequestDetail | null> {
  let result: RequestDetail | null = null;
  try {
    const response = await $apiInstance.post(
      `/request/${requestId}/status/next`,
      { id: nextStatusId },
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function setPrevRequestStatusApi(
  requestId: number,
  prevStatusId: number,
): Promise<RequestDetail | null> {
  let result: RequestDetail | null = null;
  try {
    const response = await $apiInstance.post(
      `/request/${requestId}/status/prev`,
      { id: prevStatusId },
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

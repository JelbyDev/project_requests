import $apiInstance from '@/api/AxiosInstance';
import type { Request, RequestDetail } from '@/types';

export async function getFreeRequestsApi(): Promise<Request[]> {
  let result: Request[] = [];
  try {
    const response = await $apiInstance.get(`/requests`);
    result = response.data;
  } catch (error) {
    alert('Ошибка получения заявок, которые не привязаны к проекту');
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
    alert('Ошибка информации о заявке');
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
    alert('Ошибка добавления заявки');
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
    alert('Ошибка редактирования заявки');
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
    alert('Ошибка привязки заявки к проекту');
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
    alert('Ошибка отвязки заявки от проекта');
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
    alert('Ошибка обновления статуса заявки');
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
    alert('Ошибка обновления статуса заявки');
  }
  return result;
}

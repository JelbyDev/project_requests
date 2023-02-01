export interface Project {
  id?: number;
  name: string;
}

export interface Request {
  id?: number;
  name: string;
  description: string;
  project_id: number;
  status_code: string;
}

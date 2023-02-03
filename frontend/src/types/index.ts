export interface Project {
  id?: number;
  name: string;
}

export interface Request {
  id?: number;
  name: string;
  description: string;
  project_id: number;
  status_id: number;
}

export interface RequestDetail extends Request {
  current_status: Status | null;
}

export interface Status {
  id: number;
  status_code: string;
  name: string;
  parent_id: number;
}

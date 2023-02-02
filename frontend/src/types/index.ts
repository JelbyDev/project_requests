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
  current_status?: Status;
  next_statuses?: Status;
  prev_statuses?: Status;
}

export interface Status {
  id: number;
  status_code: string;
  name: string;
  parent_id: number;
}

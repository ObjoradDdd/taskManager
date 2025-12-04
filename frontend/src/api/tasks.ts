import { api } from "./client";
export const TasksAPI = {
  list: (projectId: string) => api(`/projects/${projectId}/tasks`),
};

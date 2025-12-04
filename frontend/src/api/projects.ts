import { api } from "./client";
export const ProjectsAPI = {
  list: (subjectId: string) => api(`/subjects/${subjectId}/projects`),
};

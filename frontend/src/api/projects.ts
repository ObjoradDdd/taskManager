import { api } from "./client";
export const ProjectsAPI = {
  list: (subjectId: string) => api(`/project/${subjectId}/projects`),
  create: (title: string, subjectId: string) =>
    api("/project", {
      method: "POST",
      body: JSON.stringify({ title, subjectId}),
    }),
  update: (id: string, data: { title?: string, deadline?: Date}) =>
    api(`/project/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    api(`/project/${id}`, {
      method: "DELETE",
    }),
  leave: (id: string) =>
    api(`/project/${id}/leave`, {
      method: "POST",
    }),
  addUsers: (projectId: string, userEmails: string[]) =>
    api(`/project/${projectId}/users`, {
      method: "POST",
      body: JSON.stringify({ emails : userEmails }),
    }),
};

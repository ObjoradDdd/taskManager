import { api } from "./client";
export const ProjectsAPI = {
  list: (subjectId: string) => api(`/project/${subjectId}/projects`),
  create: (title: string, subjectId: string, deadline: Date) =>
    api("/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subjectId, deadline}),
    }),
  update: (id: string, data: { title?: string, deadline?: Date}) =>
    api(`/project/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails : userEmails }),
    }),
};

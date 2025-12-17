import { api } from "./client";
export const SubjectsAPI = {
  listAdmin: () => api("/subject/admin"),
  listMember: () => api("/subject"),
  create: (title: string) =>
    api("/subject", {
      method: "POST",
      body: JSON.stringify({ title }),
    }),
  update: (id: string, data: { title?: string }) =>
    api(`/subject/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    api(`/subject/${id}`, {
      method: "DELETE",
    }),
  leave: (id: string) =>
    api(`/subject/${id}/leave`, {
      method: "POST",
    }),
  addUsers: (subjectId: string, userEmails: string[]) =>
    api(`/subject/${subjectId}/users`, {
      method: "POST",
      body: JSON.stringify({ emails : userEmails }),
    }),
};

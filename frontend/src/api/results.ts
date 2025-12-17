import { api } from "./client";
export const ResultsAPI = {
  list: async (projectId: string) => {
    const response = await api(`/result/${projectId}/results`);
    return Array.isArray(response) ? response : (response?.results || []);
  },
  create: (description: string, title: string, projectId: string, deadline: Date) =>
    api("/result", {
      method: "POST",
      body: JSON.stringify({ title, projectId, description, deadline}),
    }),
  update: (id: string, data: { title: string; description: string; deadline: Date }) =>
    api(`/result/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    api(`/result/${id}`, {
      method: "DELETE",
    }),
  addCodependent: (dependedResultId: string, codependentResultId: string) =>
    api("/result/dependency", {
      method: "POST",
      body: JSON.stringify({ dependedResultId, codependentResultId }),
    }),
  changeStatus: (id: string, data: { status: string}) => 
    api(`/result/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  assign: (id: string) =>
    api(`/result/${id}`, {
      method: "POST",
    }),
  unassign: (id: string) =>
    api(`/result/${id}/uu`, {
      method: "POST",
    }),
};

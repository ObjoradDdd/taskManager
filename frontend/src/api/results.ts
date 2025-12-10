import { api } from "./client";
export const ResultsAPI = {
  list: (projectId: string) => api(`/result/${projectId}/results`),
  create: (description: string, title: string, subjectId: string, deadline: Date) =>
    api("/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subjectId, description, deadline }),
    }),
  update: (id: string, data: { title: string; description: string; deadline: Date }) =>
    api(`/result/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    api(`/result/${id}`, {
      method: "DELETE",
    }),
  addCodependent: (dependentResultId: string, codependentResultId: string) =>
    api("/result/dependency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dependentResultId, codependentResultId }),
    }),
  changeStatus: (id: string, data: { status: string}) => 
    api(`/result/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  assign: (id: string) =>
    api(`/result/${id}/uu`, {
      method: "POST",
    }),
};

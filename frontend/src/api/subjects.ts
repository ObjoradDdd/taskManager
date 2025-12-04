import { api } from "./client";
export const SubjectsAPI = {
  list: () => api("/subjects"),
};

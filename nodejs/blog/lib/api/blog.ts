import { API_BASE_URL } from "~/constants";
import type { components } from "~/openapi.gen";
export type BlogsResponse = components["responses"]["BlogsResponse"]["content"]["application/json"];

export const getBlogs = () => {
  return $fetch<BlogsResponse>(`${API_BASE_URL}/api/blogs`, {
    method: "GET",
  });
};

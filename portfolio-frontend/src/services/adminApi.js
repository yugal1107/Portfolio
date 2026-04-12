const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status})`);
  }

  return payload;
};

export const adminLogin = async (username, password) => {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const adminLogout = async () => {
  return request("/admin/logout", { method: "POST" });
};

export const getAdminMe = async () => {
  return request("/admin/me");
};

export const getAdminSettings = async () => {
  const payload = await request("/admin/content/settings");
  return payload.data;
};

export const updateAdminSettings = async (data) => {
  return request("/admin/content/settings", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const getAdminProjects = async () => {
  const payload = await request("/admin/content/projects");
  return payload.data;
};

export const createAdminProject = async (data) => {
  return request("/admin/content/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAdminProject = async (id, data) => {
  return request(`/admin/content/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteAdminProject = async (id) => {
  return request(`/admin/content/projects/${id}`, { method: "DELETE" });
};

export const getAdminSkillGroups = async () => {
  const payload = await request("/admin/content/skill-groups");
  return payload.data;
};

export const createAdminSkillGroup = async (data) => {
  return request("/admin/content/skill-groups", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAdminSkillGroup = async (id, data) => {
  return request(`/admin/content/skill-groups/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteAdminSkillGroup = async (id) => {
  return request(`/admin/content/skill-groups/${id}`, { method: "DELETE" });
};

export const createAdminSkill = async (data) => {
  return request("/admin/content/skills", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAdminSkill = async (id, data) => {
  return request(`/admin/content/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteAdminSkill = async (id) => {
  return request(`/admin/content/skills/${id}`, { method: "DELETE" });
};

export const getAdminStories = async () => {
  const payload = await request("/admin/content/stories");
  return payload.data;
};

export const getAdminContactMessages = async () => {
  const payload = await request("/admin/content/contact-messages");
  return payload.data;
};

export const updateAdminContactMessageStatus = async (id, status) => {
  return request(`/admin/content/contact-messages/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};

export const deleteAdminContactMessage = async (id) => {
  return request(`/admin/content/contact-messages/${id}`, {
    method: "DELETE",
  });
};

export const getAdminStoryById = async (id) => {
  const payload = await request(`/admin/content/stories/${id}`);
  return payload.data;
};

export const createAdminStory = async (data) => {
  return request("/admin/content/stories", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAdminStory = async (id, data) => {
  return request(`/admin/content/stories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteAdminStory = async (id) => {
  return request(`/admin/content/stories/${id}`, { method: "DELETE" });
};

export const uploadAdminFile = async (file, options = {}) => {
  const formData = new FormData();
  formData.append("file", file);

  if (options.folder) {
    formData.append("folder", options.folder);
  }
  if (options.publicIdPrefix) {
    formData.append("publicIdPrefix", options.publicIdPrefix);
  }
  if (options.format) {
    formData.append("format", options.format);
  }

  const response = await fetch(`${API_BASE_URL}/admin/upload/file`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || `Upload failed (${response.status})`);
  }

  return payload.data;
};

export const transformCloudinaryUrl = (url, transformation = "f_auto,q_auto") => {
  if (!url || typeof url !== "string") {
    return url;
  }

  if (!url.includes("/upload/")) {
    return url;
  }

  if (url.includes(`/upload/${transformation}/`)) {
    return url;
  }

  return url.replace("/upload/", `/upload/${transformation}/`);
};

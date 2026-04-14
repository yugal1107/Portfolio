const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000/api";

const fetchJson = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getPublicHome = async () => {
  const payload = await fetchJson("/public/home");
  return payload.data;
};

export const getPublicStories = async () => {
  const payload = await fetchJson("/public/stories");
  return payload.data;
};

export const getPublicStoryBySlug = async (slug) => {
  const payload = await fetchJson(`/public/stories/${slug}`);
  return payload.data;
};

export const submitContactMessage = async (contactPayload) => {
  const response = await fetch(`${API_BASE_URL}/public/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactPayload),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }

  return payload;
};

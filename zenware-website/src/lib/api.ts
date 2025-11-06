// API utility functions for admin operations

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest(
  url: string,
  options: RequestInit = {}
): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.error || `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  return response.json()
}

// Projects API
export const projectsApi = {
  getAll: () => apiRequest('/api/admin/projects'),
  getById: (id: string) => apiRequest(`/api/admin/projects/${id}`),
  create: (data: Record<string, unknown>) => apiRequest('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Record<string, unknown>) => apiRequest(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/api/admin/projects/${id}`, {
    method: 'DELETE',
  }),
}

// Services API
export const servicesApi = {
  getAll: () => apiRequest('/api/admin/services'),
  getById: (id: string) => apiRequest(`/api/admin/services/${id}`),
  create: (data: Record<string, unknown>) => apiRequest('/api/admin/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Record<string, unknown>) => apiRequest(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/api/admin/services/${id}`, {
    method: 'DELETE',
  }),
}

// Blog Posts API
export const blogPostsApi = {
  getAll: () => apiRequest('/api/admin/blog-posts'),
  getById: (id: string) => apiRequest(`/api/admin/blog-posts/${id}`),
  create: (data: Record<string, unknown>) => apiRequest('/api/admin/blog-posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Record<string, unknown>) => apiRequest(`/api/admin/blog-posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/api/admin/blog-posts/${id}`, {
    method: 'DELETE',
  }),
}

// Contacts API
export const contactsApi = {
  getAll: () => apiRequest('/api/admin/contacts'),
  delete: (id: string) => apiRequest(`/api/admin/contacts/${id}`, {
    method: 'DELETE',
  }),
}

// Newsletters API
export const newslettersApi = {
  getAll: () => apiRequest('/api/admin/newsletters'),
  update: (id: string, data: Record<string, unknown>) => apiRequest(`/api/admin/newsletters/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/api/admin/newsletters/${id}`, {
    method: 'DELETE',
  }),
}

// Users API
export const usersApi = {
  getAll: () => apiRequest('/api/admin/users'),
  getById: (id: string) => apiRequest(`/api/admin/users/${id}`),
  create: (data: Record<string, unknown>) => apiRequest('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Record<string, unknown>) => apiRequest(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/api/admin/users/${id}`, {
    method: 'DELETE',
  }),
}

// Stats API
export const statsApi = {
  get: () => apiRequest('/api/admin/stats'),
}
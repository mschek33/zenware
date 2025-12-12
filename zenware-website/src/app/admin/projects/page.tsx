'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import ProjectModal from '@/components/admin/ProjectModal'

interface Project {
  id: string
  name: string
  slug: string
  tagline?: string
  description: string
  longDescription?: string
  image?: string
  status: 'development' | 'beta' | 'live'
  category: 'regenerative' | 'consciousness' | 'sovereign' | 'ai'
  tags: string[]
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminProjects() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchProjects()
    }
  }, [status, router])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/projects')
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const projects = await response.json()
      setProjects(projects)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      setProjects(prev => prev.filter(p => p.id !== projectId))
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete project. Please try again.')
    }
  }

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      let response: Response

      if (editingProject) {
        // Update existing project
        response = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        })
      } else {
        // Create new project
        response = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save project')
      }

      const savedProject = await response.json()

      if (editingProject) {
        setProjects(prev => prev.map(p => p.id === editingProject.id ? savedProject : p))
      } else {
        setProjects(prev => [savedProject, ...prev])
      }

      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to save project:', error)
      const message = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to save project: ${message}`)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory
    return matchesSearch && matchesCategory
  })

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Projects</h2>
            <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
          </div>
          <button
            onClick={handleCreateProject}
            className="kortex-button-primary mt-4 sm:mt-0 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </button>
        </div>

        {/* Filters */}
        <div className="kortex-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="kortex-input pl-10 w-full"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="kortex-input w-full"
              >
                <option value="all">All Categories</option>
                <option value="regenerative">Regenerative</option>
                <option value="consciousness">Consciousness</option>
                <option value="sovereign">Sovereign</option>
                <option value="ai">AI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="kortex-card animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="kortex-card text-center py-12">
            <p className="text-gray-400 text-lg">No projects found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="kortex-card group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
                    {project.tagline && (
                      <p className="text-sm text-gray-400 mb-2">{project.tagline}</p>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'live'
                          ? 'bg-green-500/20 text-green-400'
                          : project.status === 'beta'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                        {project.status}
                      </span>
                      <span className="kortex-badge-primary">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="kortex-badge text-xs">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="kortex-badge text-xs">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Modal */}
        {isModalOpen && (
          <ProjectModal
            project={editingProject}
            onSave={handleSaveProject}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  )
}
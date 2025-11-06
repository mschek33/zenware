'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus } from 'lucide-react'

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

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  tagline: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(['development', 'beta', 'live']),
  category: z.enum(['regenerative', 'consciousness', 'sovereign', 'ai']),
  demoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean(),
})

type ProjectForm = z.infer<typeof projectSchema>

interface ProjectModalProps {
  project?: Project | null
  onSave: (projectData: Partial<Project>) => Promise<void>
  onClose: () => void
}

export default function ProjectModal({ project, onSave, onClose }: ProjectModalProps) {
  const [tags, setTags] = useState<string[]>(project?.tags || [])
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || [])
  const [newTag, setNewTag] = useState('')
  const [newTech, setNewTech] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      name: project.name,
      slug: project.slug,
      tagline: project.tagline || '',
      description: project.description,
      longDescription: project.longDescription || '',
      image: project.image || '',
      status: project.status,
      category: project.category,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
    } : {
      name: '',
      slug: '',
      tagline: '',
      description: '',
      longDescription: '',
      image: '',
      status: 'development' as const,
      category: 'ai' as const,
      demoUrl: '',
      githubUrl: '',
      featured: false,
    }
  })

  // Generate slug from name
  const watchName = watch('name')
  useEffect(() => {
    if (watchName && !project) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setValue('slug', slug)
    }
  }, [watchName, setValue, project])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()])
      setNewTech('')
    }
  }

  const removeTech = (techToRemove: string) => {
    setTechStack(techStack.filter(tech => tech !== techToRemove))
  }

  const onSubmit = async (data: ProjectForm) => {
    setIsSubmitting(true)
    try {
      await onSave({
        ...data,
        tags,
        techStack,
      })
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-2xl bg-[#111111] border border-[#2a2a2a] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">
              {project ? 'Edit Project' : 'Create New Project'}
            </h3>
            <p className="text-gray-400 mt-1">
              {project ? 'Update project details' : 'Add a new project to your portfolio'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  {...register('name')}
                  className="kortex-input w-full"
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL Slug *
                </label>
                <input
                  {...register('slug')}
                  className="kortex-input w-full"
                  placeholder="project-url-slug"
                />
                {errors.slug && (
                  <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tagline
              </label>
              <input
                {...register('tagline')}
                className="kortex-input w-full"
                placeholder="Brief tagline for the project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="kortex-input w-full"
                placeholder="Brief description of the project"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Long Description
              </label>
              <textarea
                {...register('longDescription')}
                rows={5}
                className="kortex-input w-full"
                placeholder="Detailed description of the project"
              />
            </div>

            {/* Status and Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status *
                </label>
                <select {...register('status')} className="kortex-input w-full">
                  <option value="development">Development</option>
                  <option value="beta">Beta</option>
                  <option value="live">Live</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select {...register('category')} className="kortex-input w-full">
                  <option value="regenerative">Regenerative</option>
                  <option value="consciousness">Consciousness</option>
                  <option value="sovereign">Sovereign</option>
                  <option value="ai">AI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured
                </label>
                <div className="flex items-center mt-3">
                  <input
                    {...register('featured')}
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-300">Feature this project</span>
                </div>
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Demo URL
                </label>
                <input
                  {...register('demoUrl')}
                  className="kortex-input w-full"
                  placeholder="https://demo.example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  {...register('githubUrl')}
                  className="kortex-input w-full"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                {...register('image')}
                className="kortex-input w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="kortex-input flex-1"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="kortex-button px-3"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="kortex-badge-primary flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-purple-300 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tech Stack
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  className="kortex-input flex-1"
                  placeholder="Add technology"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="kortex-button px-3"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="kortex-badge flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="text-gray-300 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="kortex-button flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="kortex-button-primary flex-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
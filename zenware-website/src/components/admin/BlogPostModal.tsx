'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  published: boolean
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  image: z.string().optional(),
  published: z.boolean(),
  category: z.string().min(1, 'Category is required'),
})

type BlogPostForm = z.infer<typeof blogPostSchema>

interface BlogPostModalProps {
  post?: BlogPost | null
  onSave: (postData: Partial<BlogPost>) => Promise<void>
  onClose: () => void
}

export default function BlogPostModal({ post, onSave, onClose }: BlogPostModalProps) {
  const [tags, setTags] = useState<string[]>(post?.tags || [])
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post ? {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      image: post.image || '',
      published: post.published,
      category: post.category,
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      published: false,
      category: 'conscious-tech',
    }
  })

  // Generate slug from title
  const watchTitle = watch('title')
  useEffect(() => {
    if (watchTitle && !post) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setValue('slug', slug)
    }
  }, [watchTitle, setValue, post])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const onSubmit = async (data: BlogPostForm) => {
    setIsSubmitting(true)
    try {
      await onSave({
        ...data,
        tags,
      })
    } catch (error) {
      console.error('Failed to save blog post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-2xl bg-[#111111] border border-[#2a2a2a] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
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
              {post ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <p className="text-gray-400 mt-1">
              {post ? 'Update your blog post content' : 'Write and publish a new blog post'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Post Title *
                </label>
                <input
                  {...register('title')}
                  className="kortex-input w-full"
                  placeholder="Enter post title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL Slug *
                </label>
                <input
                  {...register('slug')}
                  className="kortex-input w-full"
                  placeholder="post-url-slug"
                />
                {errors.slug && (
                  <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                {...register('excerpt')}
                rows={2}
                className="kortex-input w-full"
                placeholder="Brief excerpt or summary (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                {...register('content')}
                rows={12}
                className="kortex-input w-full"
                placeholder="Write your blog post content here..."
              />
              {errors.content && (
                <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            {/* Category and Publishing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select {...register('category')} className="kortex-input w-full">
                  <option value="conscious-tech">Conscious Tech</option>
                  <option value="ai-integration">AI Integration</option>
                  <option value="new-earth">New Earth</option>
                  <option value="regenerative">Regenerative</option>
                  <option value="spiritual-tech">Spiritual Tech</option>
                  <option value="business">Business</option>
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image URL
                </label>
                <input
                  {...register('image')}
                  className="kortex-input w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Publishing Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Publishing
              </label>
              <div className="flex items-center mt-2">
                <input
                  {...register('published')}
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-300">Publish immediately</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
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
              {tags.length === 0 && (
                <p className="text-gray-500 text-sm mt-2">No tags added yet</p>
              )}
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
                {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
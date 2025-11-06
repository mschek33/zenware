'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit, Trash2, Search, Eye, Calendar, User } from 'lucide-react'
import BlogPostModal from '@/components/admin/BlogPostModal'

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

export default function AdminBlogPosts() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated') {
      fetchBlogPosts()
    }
  }, [status, router])

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockBlogPosts: BlogPost[] = [
        {
          id: '1',
          title: 'The Future of Conscious AI',
          slug: 'future-of-conscious-ai',
          excerpt: 'Exploring how artificial intelligence can be developed with consciousness and ethics at its core.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          published: true,
          category: 'conscious-tech',
          tags: ['AI', 'Consciousness', 'Ethics'],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          publishedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          title: 'Building Regenerative Technology Systems',
          slug: 'building-regenerative-tech-systems',
          excerpt: 'How technology can contribute to healing and regeneration of our planet.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          published: false,
          category: 'regenerative',
          tags: ['Technology', 'Sustainability', 'Regeneration'],
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z'
        },
        {
          id: '3',
          title: 'AI Integration in New Earth Systems',
          slug: 'ai-integration-new-earth-systems',
          excerpt: 'Integrating AI technologies with spiritual and ecological principles.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          published: true,
          category: 'new-earth',
          tags: ['AI', 'New Earth', 'Integration'],
          createdAt: '2024-01-03T00:00:00Z',
          updatedAt: '2024-01-03T00:00:00Z',
          publishedAt: '2024-01-03T00:00:00Z'
        }
      ]
      
      setBlogPosts(mockBlogPosts)
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePost = () => {
    setEditingPost(null)
    setIsModalOpen(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setIsModalOpen(true)
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    
    try {
      setBlogPosts(prev => prev.filter(p => p.id !== postId))
    } catch (error) {
      console.error('Failed to delete blog post:', error)
    }
  }

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const updatedPost = {
        ...post,
        published: !post.published,
        publishedAt: !post.published ? new Date().toISOString() : undefined,
        updatedAt: new Date().toISOString()
      }
      setBlogPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p))
    } catch (error) {
      console.error('Failed to toggle publish status:', error)
    }
  }

  const handleSavePost = async (postData: Partial<BlogPost>) => {
    try {
      if (editingPost) {
        const updatedPost = { ...editingPost, ...postData, updatedAt: new Date().toISOString() }
        setBlogPosts(prev => prev.map(p => p.id === editingPost.id ? updatedPost : p))
      } else {
        const newPost: BlogPost = {
          id: Date.now().toString(),
          ...postData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: postData.published ? new Date().toISOString() : undefined,
        } as BlogPost
        setBlogPosts(prev => [newPost, ...prev])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to save blog post:', error)
    }
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published)
    return matchesSearch && matchesStatus
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
            <h2 className="text-3xl font-bold text-white">Blog Posts</h2>
            <p className="text-gray-400 mt-1">Manage your blog content</p>
          </div>
          <button
            onClick={handleCreatePost}
            className="kortex-button-primary mt-4 sm:mt-0 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Published</p>
                <p className="text-2xl font-bold text-white">
                  {blogPosts.filter(p => p.published).length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-white">
                  {blogPosts.filter(p => !p.published).length}
                </p>
              </div>
            </div>
          </div>
          <div className="kortex-card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold text-white">{blogPosts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="kortex-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="kortex-input pl-10 w-full"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="kortex-input w-full"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="kortex-card animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-gray-700 rounded mb-4"></div>
                  </div>
                  <div className="ml-4">
                    <div className="h-8 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="kortex-card text-center py-12">
            <p className="text-gray-400 text-lg">No blog posts found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or create your first post</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="kortex-card group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.published 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="kortex-badge-primary text-xs">
                        {post.category}
                      </span>
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="kortex-badge text-xs">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className="kortex-badge text-xs">
                          +{post.tags.length - 4}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Created {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Published {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        post.published
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
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

        {/* Blog Post Modal */}
        {isModalOpen && (
          <BlogPostModal
            post={editingPost}
            onSave={handleSavePost}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  )
}
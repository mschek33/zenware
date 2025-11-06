'use client'

import { X, Mail, Phone, Building, Calendar, DollarSign, Clock, User } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  projectType?: string
  budgetRange?: string
  timeline?: string
  message: string
  createdAt: string
  userId?: string
}

interface ContactModalProps {
  contact: Contact
  onClose: () => void
}

export default function ContactModal({ contact, onClose }: ContactModalProps) {
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
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{contact.name}</h3>
                <p className="text-gray-400">Contact Details</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Contact Information</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {contact.phone && (
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                      <Phone className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-white hover:text-green-400 transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.company && (
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                      <Building className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Company</p>
                        <p className="text-white">{contact.company}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-xs text-gray-400">Submitted</p>
                      <p className="text-white">
                        {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Project Details</h4>
                
                <div className="space-y-3">
                  {contact.projectType && (
                    <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                      <p className="text-xs text-gray-400 mb-1">Project Type</p>
                      <span className="kortex-badge-primary">{contact.projectType}</span>
                    </div>
                  )}

                  {contact.budgetRange && (
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                      <DollarSign className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-xs text-gray-400">Budget Range</p>
                        <p className="text-white">{contact.budgetRange}</p>
                      </div>
                    </div>
                  )}

                  {contact.timeline && (
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                      <Clock className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Timeline</p>
                        <p className="text-white">{contact.timeline}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Message</h4>
              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-[#2a2a2a]">
              <a
                href={`mailto:${contact.email}`}
                className="kortex-button-primary flex-1 text-center"
              >
                Reply via Email
              </a>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="kortex-button flex-1 text-center"
                >
                  Call Contact
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
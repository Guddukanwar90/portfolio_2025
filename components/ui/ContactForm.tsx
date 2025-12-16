/**
 * Contact form component
 * Glass card form with client-side validation and multiple integration options
 */
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motionVariants'
import { Send, Mail, Copy, Check } from 'lucide-react'

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

type Status = '' | 'sending' | 'success' | 'error'

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('')
  const [copied, setCopied] = useState<boolean>(false)

  /* Handle input + textarea change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error while typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  /* Client-side validation */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* Form submit */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  /* Copy email */
  const copyEmail = (): void => {
    navigator.clipboard.writeText('rathoreguddu425@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-light">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-text-muted text-lg">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-8 md:p-12 card-shadow"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-strong rounded-lg bg-transparent text-text-light"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-strong rounded-lg bg-transparent text-text-light"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 glass-strong rounded-lg bg-transparent text-text-light resize-none"
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg"
            >
              <Send size={18} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-center">
                ✓ Message sent successfully!
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-center">
                ✗ Something went wrong. Please try again.
              </p>
            )}
          </form>

          {/* Email copy */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 mx-auto"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm

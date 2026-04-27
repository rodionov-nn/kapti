'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type FormData = {
  name: string
  email: string
  message: string
}

export const ContactForm: React.FC<{ recipientEmail?: string | null }> = ({ recipientEmail }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('idle')
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ...(recipientEmail ? { recipientEmail } : {}),
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setStatus('success')
      reset()
    } catch (error) {
      console.error('Error submitting form', error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input 
          id="name" 
          placeholder="Ваше имя" 
          {...register('name', { required: 'Это поле обязательно' })} 
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="Ваш email" 
          {...register('email', { 
            required: 'Это поле обязательно',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email адрес'
            }
          })} 
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Сообщение</Label>
        <Textarea 
          id="message" 
          placeholder="Ваше сообщение" 
          rows={5}
          {...register('message', { required: 'Это поле обязательно' })} 
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </Button>

      {status === 'success' && (
        <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
          Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
        </p>
      )}
      
      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.
        </p>
      )}
    </form>
  )
}

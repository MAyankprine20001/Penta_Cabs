
// src/hooks/useQuickInquiry.ts
'use client';

import { useState } from 'react';
import { QuickInquiryData } from '@/types/booking';

export const useQuickInquiry = () => {
  const [inquiryData, setInquiryData] = useState<QuickInquiryData>({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof QuickInquiryData, value: string) => {
    setInquiryData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!inquiryData.name.trim()) newErrors.name = 'Name is required';
    if (!inquiryData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(inquiryData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!inquiryData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!inquiryData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Inquiry Data:', inquiryData);
      alert('Inquiry sent successfully! We will contact you soon.');
      setInquiryData({ name: '', mobile: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    inquiryData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};

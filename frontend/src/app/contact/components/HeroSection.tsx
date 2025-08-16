'use client';
import React from 'react';
import { theme } from '@/styles/theme';
export const HeroSection: React.FC = () => {
    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse"
                    style={{ backgroundColor: theme.colors.accent.gold + '10' }}
                />
                <div
                    className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000"
                    style={{ backgroundColor: theme.colors.secondary.amber + '10' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in">
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
                        style={{ color: theme.colors.text.primary }}
                    >
                        Let&apos;s connect and get to know each other
                    </h1>
                    <p
                        className="text-lg md:text-xl max-w-3xl leading-relaxed"
                        style={{ color: theme.colors.text.secondary }}
                    >
                        We&apos;re here to make your journey exceptional. Whether you have questions about our services,
                        need assistance with bookings, or want to share feedback, we&apos;d love to hear from you.
                    </p>
                </div>
            </div>
        </section>
    )
}
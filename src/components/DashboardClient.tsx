'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    supportEmail: '',
    knowledge: '',
    tokenLeft: '',

  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  // Fetch initial data
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ownerId })
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFormData({
              businessName: data.businessName || '',
              supportEmail: data.supportEmail || '',
              knowledge: data.knowledge || '',
              tokenLeft: data.creditsRemaining?.toString() || '0',
            });
          }
        }
        setStatus('idle');
      } catch (error) {
        console.error("Failed to fetch settings", error);
        setStatus('error');
        setMessage('Failed to load settings.');
      }
    };

    if (ownerId) {
      fetchSettings();
    }
  }, [ownerId]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerId,
          ...formData
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Settings saved successfully!');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(errorData.message || 'Error saving settings.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred.');
    }
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#eef1f6] text-gray-900 font-sans overflow-hidden relative selection:bg-gray-300 flex flex-col">

      {/* Abstract Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>

      {/* Navigation */}
      <nav
        className="
    mb-10
    bg-white/40
    backdrop-blur-2xl
    border border-white/60
    rounded-2xl
    px-6 py-4
    flex items-center justify-between
    shadow-[0_8px_32px_rgba(31,38,135,0.08)]
  "
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div
            className="
        h-10 w-10
        rounded-xl
        bg-gray-900
        text-white
        flex items-center justify-center
        font-bold
      "
          >
            AI
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              SupportAI
            </h2>

            <p className="text-xs text-gray-500">
              Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <Link
            href="/"
            className="
        px-4 py-2
        rounded-xl
        text-gray-700
        hover:bg-white/60
        transition-all
      "
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="
        px-4 py-2
        rounded-xl
        bg-gray-900
        text-white
        shadow-lg
      "
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/billing"
            className="
        px-4 py-2
        rounded-xl
        text-gray-700
        hover:bg-white/60
        transition-all
      "
          >
            Billing
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <div
            className="
        inline-flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-amber-50
        border border-amber-200
      "
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>

            <span className="text-sm text-gray-500">
              Credits
            </span>

            <span className="font-semibold text-amber-700">
              {formData.tokenLeft}
            </span>
          </div>

          <Link
            href="/dashboard/billing"
            className="
        inline-flex items-center gap-2
        bg-amber-500
        hover:bg-amber-600
        text-white
        px-4 py-2
        rounded-xl
        font-medium
        transition-all
        shadow-md
      "
          >
            + Buy Credits
          </Link>

        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-4xl" /* Increased width from max-w-2xl to max-w-4xl */
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
              Configure Your Agent
            </h1>
            <p className="text-gray-600">
              Set up your business details and provide the knowledge base for your AI support agent.
            </p>
          </motion.div>

          {/* Glass Form Card */}
          <motion.div
            variants={fadeUp}
            className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
          >
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[2rem]"></div>

            {status === 'loading' ? (
              <div className="flex justify-center items-center h-96 relative z-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Business Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="businessName" className="text-sm font-semibold text-gray-700 ml-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      required
                      className="w-full bg-white/60 border border-white/80 text-gray-800 rounded-xl px-4 py-3 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* Support Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="supportEmail" className="text-sm font-semibold text-gray-700 ml-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      id="supportEmail"
                      name="supportEmail"
                      value={formData.supportEmail}
                      onChange={handleChange}
                      placeholder="support@yourwebsite.com"
                      required
                      className="w-full bg-white/60 border border-white/80 text-gray-800 rounded-xl px-4 py-3 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Knowledge Base */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="knowledge" className="text-sm font-semibold text-gray-700 ml-1">
                    AI Knowledge Base (Rules & Info)
                  </label>
                  <textarea
                    id="knowledge"
                    name="knowledge"
                    value={formData.knowledge}
                    onChange={handleChange}
                    rows={14} /* Significantly increased height for more writing space */
                    placeholder="Paste your FAQs, return policies, shipping times, and general business information here. The AI will strictly use this data to answer queries. More detailed information yields better AI responses."
                    required
                    className="w-full bg-white/60 border border-white/80 text-gray-800 rounded-xl px-4 py-4 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all placeholder:text-gray-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Status Messages */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm px-4 py-3 rounded-xl border backdrop-blur-md ${status === 'success'
                      ? 'bg-green-50/50 border-green-200 text-green-700'
                      : 'bg-red-50/50 border-red-200 text-red-700'
                      }`}
                  >
                    {message}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'saving'}
                    className="flex-1 bg-gray-900/90 text-white border border-gray-700/50 px-8 py-4 rounded-xl font-medium hover:bg-gray-900 transition-all shadow-lg shadow-gray-900/20 backdrop-blur-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {status === 'saving' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Configuration'
                    )}
                  </button>

                  {/* Embed Chatbot Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => router.push("/embed")}
                    className="flex-1 bg-white/50 text-gray-800 border border-white/80 px-8 py-4 rounded-xl font-medium hover:bg-white/70 transition-all shadow-sm backdrop-blur-md flex justify-center items-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Embed Chatbot
                  </motion.button>

                </div>

              </form>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardClient;
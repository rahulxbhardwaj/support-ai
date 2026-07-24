'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";
import axios from 'axios';


const HomeClient = ({ name }: { name: string }) => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  } as const;

  const handleLogin = () => {
    window.location.href = '/api/auth/login'; // Redirect to the login API route
  }

  const firstLetter = name?.[0]?.toUpperCase() || "";
  const [open, setOpen] = React.useState(false);

  const popupRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);

  }, []);


  const handleLogout = async () => {
    try{
      const result = await axios.get('/api/auth/logout');
       window.location.href = '/';
    }
    catch(err){
      console.error("Error during logout: ", err);
    }
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#eef1f6] text-gray-900 font-sans overflow-hidden relative selection:bg-gray-300">

      {/* Abstract Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tight text-gray-800">
          Support<span className="text-gray-500 font-normal">AI</span>
        </div>


        {name ? (
          <>
            <div ref={popupRef}>
              <motion.button
                whileHover={{
                  scale: 1.08,
                  rotate: 5,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center font-bold border border-gray-700 shadow-lg"

                onClick={() => setOpen(!open)}
              >
                {firstLetter}
              </motion.button>


              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className="absolute right-0 top-18 w-64 overflow-hidden rounded-3xl border border-white/30 bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] z-50"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200/60">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center font-bold text-lg">
                        {firstLetter}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Signed in
                        </p>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="py-2">

                      <button
                        className="group w-full flex items-center gap-4 px-5 py-3 text-gray-700 transition-all duration-200 hover:bg-black/5 hover:pl-7"
                        onClick={() => router.push("/dashboard")}
                      >
                        <LayoutDashboard
                          size={19}
                          className="text-gray-500 transition-transform group-hover:scale-110"
                        />

                        <span className="font-medium">
                          Dashboard
                        </span>
                      </button>

                      <button
                        className="group w-full flex items-center gap-4 px-5 py-3 text-gray-700 transition-all duration-200 hover:bg-black/5 hover:pl-7"
                      >
                        <User
                          size={19}
                          className="text-gray-500 transition-transform group-hover:scale-110"
                        />

                        <span className="font-medium">
                          Profile
                        </span>
                      </button>

                      <div className="my-2 border-t border-gray-200/60" />

                      <button
                        className="group w-full flex items-center gap-4 px-5 py-3 text-red-500 transition-all duration-200 hover:bg-red-50 hover:pl-7"
                        onClick={handleLogout}
                      >
                        <LogOut
                          size={19}
                          className="transition-transform group-hover:scale-110"
                        />

                        <span className="font-medium">
                          Logout
                        </span>
                      </button>

                    </div>
                  </motion.div>
                )}


              </AnimatePresence>

            </div>
          </>) : (
          <button
            className="text-sm font-medium text-white bg-gray-900/80 hover:bg-gray-900 border border-gray-700/50 px-8 py-2.5 rounded-full backdrop-blur-md shadow-lg shadow-gray-900/10 transition-all"
            onClick={handleLogin}
          >
            Login
          </button>
        )}


      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-24">

        {/* Main Hero Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2.5rem] p-8 md:p-16 lg:flex lg:items-center lg:gap-16 relative overflow-hidden"
        >
          {/* Subtle inner highlight for the glass card */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[2.5rem]"></div>

          {/* Hero Content */}
          <motion.div
            className="lg:w-1/2 relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-semibold leading-[1.15] tracking-tight mb-6 text-gray-900"
            >
              AI-Powered <br /> Customer Care <br /> Designed for Modern <br /> Websites
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed"
            >
              Instantly deploy an intelligent AI assistant to your site. Give your
              visitors immediate, accurate answers powered by your custom business knowledge.
            </motion.p>


            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                className="bg-gray-900/90 text-white border border-gray-700/50 px-8 py-3.5 rounded-xl font-medium hover:bg-gray-900 transition-all shadow-lg shadow-gray-900/20 backdrop-blur-md"
                onClick={() => {
                  if (name) {
                    router.push("/dashboard"); // or your dashboard route
                  } else {
                    router.push("/login"); // or your auth page
                  }
                }}
              >
                {name ? "Go to Dashboard" : "Get Started"}
              </button>

              <button className="bg-white/50 text-gray-800 border border-white/80 px-8 py-3.5 rounded-xl font-medium hover:bg-white/70 transition-all shadow-sm backdrop-blur-md"
              onClick={() => router.push("/learnmore")}
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>


          {/* Hero Visual - Chat Preview */}
          <motion.div
            className="lg:w-1/2 mt-16 lg:mt-0 relative z-10"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
          >
            {/* Inner Glass Chat Card */}
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 p-8 relative max-w-md mx-auto shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">

              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
                Live Chat Preview
              </h3>

              <div className="flex flex-col gap-5">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/60 border border-white/80 text-gray-800 rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm self-start max-w-[85%] backdrop-blur-md shadow-sm"
                >
                  Do you offer international shipping?
                </motion.div>

                {/* Bot Message */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  className="bg-gray-900/90 border border-gray-700/50 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm self-end max-w-[85%] backdrop-blur-md shadow-lg"
                >
                  Yes! We ship worldwide with free delivery on orders over ₹2,000.
                </motion.div>
              </div>

              {/* Floating Chat Icon (Glassmorphic dark) */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {/* Robot/AI Face Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8 11C7.45 11 7 10.55 7 10C7 9.45 7.45 9 8 9C8.55 9 9 9.45 9 10C9 10.55 8.55 11 8 11ZM16 11C15.45 11 15 10.55 15 10C15 9.45 15.45 9 16 9C16.55 9 17 9.45 17 10C17 10.55 16.55 11 16 11ZM12 17C9.76 17 7.9 15.54 7.2 13.5H16.8C16.1 15.54 14.24 17 12 17Z" fill="white" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>


      {/* Features Section */}
      <section className="relative z-10 py-12 pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-center mb-16 text-gray-900"
          >
            Why Teams Choose SupportAI
          </motion.h2>



          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_4px_24px_0_rgba(31,38,135,0.05)] border border-white/60 hover:bg-white/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Instant Integration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Paste a single script tag into your site and go live immediately. Zero developer overhead required.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_4px_24px_0_rgba(31,38,135,0.05)] border border-white/60 hover:bg-white/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Total Knowledge Control</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Control every detail of what your AI agent knows. Train it directly on your custom documentation or site data.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_4px_24px_0_rgba(31,38,135,0.05)] border border-white/60 hover:bg-white/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Response Time</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Keep your business supported around the clock. Boost conversion rates with 0-second answer times.
              </p>
            </motion.div>
          </div>
          {/* Made in India Badge */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium py-2 px-4 rounded-full bg-white/30 backdrop-blur-md border border-white/50 w-fit mx-auto mt-8">
            Made in India with <span className="text-red-500">❤️</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeClient;